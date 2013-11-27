
import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.diff.DiffFormatter;
import org.eclipse.jgit.diff.RawTextComparator;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevSort;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.util.io.DisabledOutputStream;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


public class Target {
    private static final String PROJECTS_DIRECTORY = "projects/";
    private String projectName;
    private ArrayList<Integer> listCommitTime;
    private ArrayList<Integer> listCrossCommitTime;
    private HashMap<String, ArrayList<Integer>> map;

    public Target(String projectName) {
        this(projectName, "");
    }

    public Target(String projectName, String remoteUri) {
        this.projectName = projectName;
        this.listCommitTime = new ArrayList<Integer>();
        this.listCrossCommitTime = new ArrayList<Integer>();
        this.map = new HashMap<String, ArrayList<Integer>>();
        if (!remoteUri.equals(""))
            cloneRepository(projectName, remoteUri);
        String path = PROJECTS_DIRECTORY + projectName + "/.git/";
        parseCommitLogs(path);
    }
    
    private void cloneRepository(String projectName, String remoteUri) {
        try {
            File file = new File(PROJECTS_DIRECTORY + projectName);
            Git.cloneRepository()
                .setURI(remoteUri)
                .setDirectory(file)
                .call();
        } catch (Exception e) {
            e.printStackTrace();
        };
    }

    private void parseCommitLogs(String path) { 
        try {
            FileRepositoryBuilder builder = new FileRepositoryBuilder();
            Repository repository = builder.setGitDir(new File(path))
                .readEnvironment().findGitDir().build();
            Git git = new Git(repository); 
            Iterable<RevCommit> commits = git.log().all().call();
            for (RevCommit commit : commits) {
                int time = commit.getCommitTime();
                this.listCommitTime.add(time);
                String name = commit.getCommitterIdent().getName();
                if(!this.map.containsKey(name))
                    this.map.put(name, new ArrayList<Integer>());
                (this.map.get(name)).add(time);
            }
            Collections.sort(listCommitTime);
            buildCrossCommitTime(repository);
            repository.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void buildCrossCommitTime(Repository repository) {
        HashMap<String, String> lastCommitter = new HashMap<String, String>();
        try {
            RevWalk rw = new RevWalk(repository);
                rw.sort(RevSort.REVERSE);
                ObjectId headId = repository.resolve(Constants.HEAD);
                RevCommit root = rw.parseCommit(headId);
                rw.markStart(root);
            DiffFormatter df = new DiffFormatter(DisabledOutputStream.INSTANCE);
                df.setRepository(repository);
                df.setDiffComparator(RawTextComparator.DEFAULT);
                df.setDetectRenames(true);
            for (RevCommit commit : rw) {
                if (commit.getParentCount() == 0) continue;
                RevCommit parent = rw.parseCommit(commit.getParent(0).getId());
                List<DiffEntry> diffs = df.scan(parent.getTree(), commit.getTree());
                boolean cross = false;
                for (DiffEntry diff : diffs) {
                    String path = diff.getNewPath();
                    String name = commit.getCommitterIdent().getName();
                    if (lastCommitter.containsKey(path) && !lastCommitter.get(path).equals(name))
                        cross = true;
                    lastCommitter.put(path, name);
                }
                if (cross)
                    this.listCrossCommitTime.add(commit.getCommitTime());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getProjectName() {
        return this.projectName;
    }

    public ArrayList<Integer> getListCommitTime() {
        return this.listCommitTime;
    }

    public ArrayList<Integer> getListCrossCommitTime() {
        return this.listCrossCommitTime;
    }

    public HashMap<String, ArrayList<Integer>> getMap() {
        return this.map;
    }
    
    
    public ArrayList<JSONObject> getTopContributors() {
    	ArrayList<Entry<String, ArrayList<Integer>>> entries = new ArrayList<Entry<String, ArrayList<Integer>>>(this.map.entrySet());
    	Collections.sort(entries, new Comparator<Entry<String, ArrayList<Integer>>>() {
    		
    		@Override
    		public int compare(Map.Entry<String,java.util.ArrayList<Integer>> arg0, Map.Entry<String,java.util.ArrayList<Integer>> arg1) {
    			return arg1.getValue().size() - arg0.getValue().size();
    		};
    	});
    	
    	ArrayList<JSONObject> sorted = new ArrayList<JSONObject>();
    	
    	for (int i=0;i<10;i++) {
    		Entry<String, ArrayList<Integer>> entry = entries.get(i);
    		JSONObject json = new JSONObject();
    		json.put("name", entry.getKey());
    		json.put("count", entry.getValue().size());
    		sorted.add(json);
    	}
    		
    	
    	
    		
    	return sorted;
    }
    
}
