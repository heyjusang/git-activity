import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
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
            file.write("var data = " + obj.toJSONString() + ";");
            file.flush();
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static JSONObject computeMetrics(Target target) {
        JSONObject obj = new JSONObject();
        obj.put("name", target.getProjectName());
        obj.put("today", Metric.today());
        obj.put("unit", Metric.DEFAULT_UNIT);
        obj.put("size", target.getListCommitTime().size());
        obj.put("activity", (new RCF(target)).getLogs());
        obj.put("scale", (new SCF(target)).getValue());
        obj.put("cooperation", (new CCR(target)).getValue());
        return obj;
    }

    public static void main(String[] args) {
        String projectName = getProjectName();
        Target target = new Target(projectName);
        JSONObject obj = computeMetrics(target);
        writeFile(obj);
    }
}
