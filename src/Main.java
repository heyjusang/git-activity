import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.Process;
import java.lang.Runtime;
import java.util.ArrayList;
import java.util.Map;
import java.util.Map.Entry;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Main {
	private static final String JSON_PATH = "html/js/data.js";

	private static String getProjectName() {
		try {
			System.out.print("Enter project name: ");
			BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
			return br.readLine();
		} catch (IOException e) {
			e.printStackTrace();
			return "node";
		}
	}

	private static void writeFile(JSONObject obj) {
		try {
			FileWriter file = new FileWriter(JSON_PATH);
			file.write(obj.toJSONString());
			file.flush();
			file.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static void computeMetrics(JSONObject obj, Target target) {
		obj.put("today", ((long)Metric.today()) * 1000);
		obj.put("name", target.getProjectName());
		obj.put("unit", Metric.DEFAULT_UNIT);
		obj.put("size", target.getListCommitTime().size());
		obj.put("activity", (new RCF(target)).getLogs());
		obj.put("scale", (new SCF(target)).getValue());
		obj.put("cooperation", (new CCR(target)).getValue());
		obj.put("contributorCount", target.getTotalContributorCount());
		ArrayList<Entry<String,Integer>> ranking = target.getTopContributors();
		JSONArray topContributor = new JSONArray();
		int n = Math.min(ranking.size(), 10);
		for (int i = 0; i < n; i++) {
			JSONObject row = new JSONObject();
			row.put("name", ranking.get(i).getKey());
			row.put("count", ranking.get(i).getValue());
			topContributor.add(row);
		}
		obj.put("topContributor", topContributor);
	}

	public static void main(String[] args) {
		String projectName = getProjectName();
		Target target = new Target(projectName);
		JSONObject obj = new JSONObject();
		computeMetrics(obj, target);
		writeFile(obj);
		try {
			Process python = Runtime.getRuntime().exec("python src/predict.py");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
