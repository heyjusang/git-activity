import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Trainer {

    private static final String JSON_PATH = "model/train.json"; 

    private static void writeFile(JSONArray ary) {
        try {
            FileWriter file = new FileWriter(JSON_PATH);
            file.write(ary.toJSONString());
            file.flush();
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    private static JSONArray computeTrainData(Target target) {
        int nMaxSample = 50;
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
        String[] projectNames = {"node", "yobi"};
        JSONArray bigAry = new JSONArray();
        for (String projectName : projectNames) {
            Target target = new Target(projectName);
            JSONArray ary = computeTrainData(target);
            bigAry.addAll(ary);
        }
        writeFile(bigAry);
    }
}
