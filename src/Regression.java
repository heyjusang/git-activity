import java.util.ArrayList;

public class Regression {
	private double noiseVariance;
	private double xnorm;
	private double ynorm;
	
	public Regression() {
		this(1.0, 1.0, 0.0);
	}

	public Regression(double xnorm, double ynorm, double noiseVariance) {
		this.xnorm = xnorm;
		this.ynorm = ynorm;
		this.noise = noiseVariance;
	}

	public static ArrayList<ArrayList<Double>> matrixInverse(ArrayList<ArrayList<Double>> matrix) {
		ArrayList<ArrayList<Double>> ret = new ArrayList<ArrayList<Double>>();
		// TODO
	}
}
