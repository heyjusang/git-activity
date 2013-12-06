import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class Trainer {
	private static final String BACKTEST_DIRECTORY = "backtest/";

	private static void writeFile(ArrayList<Double> activity, String filename) {
		try {
			FileWriter file = new FileWriter(filename);
			file.write(activity.toString());
			file.flush();
			file.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		File[] projects = new File("projects").listFiles();
		for (int i = 0; i < projects.length; ++i) {
			if (projects[i].isDirectory() == false) continue;
			String projectName = projects[i].getName();
			System.out.println("Processing " + projectName);
			Target target = new Target(projectName);
			ArrayList<Double> activity = (new RCF(target)).getLogs();
			writeFile(activity, BACKTEST_DIRECTORY + projectName + ".json");
		}
	}
}
