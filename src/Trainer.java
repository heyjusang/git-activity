import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Trainer {
    private static final String BACKTEST_DIRECTORY = "backtest/";

    private static void writeFile(JSONArray trainData, String filename) {
        try {
            FileWriter file = new FileWriter(filename);
            file.write(trainData.toJSONString());
            file.flush();
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static JSONArray getTrainData(Target target) {
        JSONArray trainData = new JSONArray();
        ArrayList<Double> rcf = (new RCF(target)).getLogs();
        trainData.add("name", target.getProjectName());
        trainData.add("rcf", rcf);
        return trainData;
    }

    public static void main(String[] args) {
        File[] projects = new File("projects").listFiles();
        for (int i = 0; i < projects.length; ++i) {
            if (projects[i].isDirectory() == false) continue;
            String projectName = projects[i].getName();
            System.out.println("Processing " + projectName);
            Target target = new Target(projectName);
            JSONArray trainData = getTrainData(target);
            writeFile(trainData, BACKTEST_DIRECTORY + projectName + ".json");
        }
    }
}
