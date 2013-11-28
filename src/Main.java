
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
        int nMaxSample = 50;
        JSONObject obj = new JSONObject();
        obj.put("name", target.getProjectName());
        obj.put("scf", (new SCF(target)).getLogs(nMaxSample, 6));
        obj.put("rcf", (new RCF(target)).getLogs(nMaxSample, 6));
        obj.put("ccr", (new CCR(target)).getLogs(nMaxSample, 6));
        obj.put("scf3", (new SCF(target)).getLogs(nMaxSample, 3));
        obj.put("rcf3", (new RCF(target)).getLogs(nMaxSample, 3));
        obj.put("ccr3", (new CCR(target)).getLogs(nMaxSample, 3));
        obj.put("scf12", (new SCF(target)).getLogs(nMaxSample, 12));
        obj.put("rcf12", (new RCF(target)).getLogs(nMaxSample, 12));
        obj.put("ccr12", (new CCR(target)).getLogs(nMaxSample, 12));
        return obj;
    }

    public static void main(String[] args) {
        String projectName = getProjectName();
        Target target = new Target(projectName);
        JSONObject obj = computeMetrics(target);
        writeFile(obj);
    }
}
