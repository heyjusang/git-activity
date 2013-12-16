import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class FastMain {
    private static String getProjectName() {
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
			return br.readLine();
		} catch (IOException e) {
			e.printStackTrace();
			return "node";
		}
	}

	public static void main(String[] args) {
		String projectName = getProjectName();
		Target target = new Target(projectName);
		System.out.println("activity:" + (new RCF(target)).getValue());
		System.out.println("scale:" + (new SCF(target)).getValue());
		System.out.println("cooperation:" + (new CCR(target)).getValue());
    }
}
