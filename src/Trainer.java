
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


public class Trainer {
    private static void writeFile(JSONArray ary, String filename) {
        try {
            FileWriter file = new FileWriter(filename);
            file.write(ary.toJSONString());
            file.flush();
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static JSONArray computeTrainData(Target target) {
        int nMaxSample = (1 << 20);
        int timeEnd = Metric.today();
        JSONArray ary = new JSONArray();
        ArrayList<Double> rcf = (new RCF(target)).getLogs(nMaxSample);
        ArrayList<Double> scf = (new SCF(target)).getLogs(nMaxSample);
        ArrayList<Double> ccr = (new CCR(target)).getLogs(nMaxSample);
        for (int i = 0; i < rcf.size() - 6; i++) {
            JSONObject obj = new JSONObject();
            obj.put("name", target.getProjectName());
            obj.put("rcf", rcf.get(i));
            obj.put("scf", scf.get(i));
            obj.put("ccr", ccr.get(i));
            obj.put("target", rcf.get(i+6));
            ary.add(obj);
        }
        return ary;
    }

    public static void main(String[] args) {
        File[] projects = new File("projects").listFiles();
        for (int i = 0; i < projects.length; ++i) {
            String projectName = projects[i].getName();
            System.out.println("Processing " + projectName);
            Target target = new Target(projectName);
            JSONArray ary = computeTrainData(target);
            writeFile(ary, "model/" + projectNames + ".json");
        }
    }
}
