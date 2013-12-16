import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

public abstract class Metric {
	public static final int WEEK = 7*24*60*60;
	public static final int MONTH = 4*WEEK;
	public static final int DEFAULT_UNIT = 2*WEEK;
	public static final int DEFAULT_INTERVAL = 6*MONTH;
	protected Target target;

	public Metric(Target target) {
		this.target = target;
	}

	public static int today() {
		return (int)((new Date()).getTime() / 1000);
	}

	protected double getMean(ArrayList<Double> list) {
		double sum = 0.0;
		for (Double e : list)
			sum += e;
		return sum / (list.size() + 1E-9);
	}

	protected double getMedian(ArrayList<Double> list) {
		Collections.sort(list);
		int size = list.size();
		if (size == 0)
			return 1E+9;
		else if(size % 2 == 1)
			return list.get(size / 2);
		else
			return (list.get(size / 2 - 1) + list.get(size / 2)) / 2.0;
	}

	public double getValue() {
		return getValue(today());
	}

	public ArrayList<Double> getLogs() {
		ArrayList<Double> logs = new ArrayList<Double>();
		int timeEnd = today();
		for (;;) {
			if (timeEnd - DEFAULT_INTERVAL < this.target.getListCommitTime().get(0)) break;
			logs.add(getValue(timeEnd));
			timeEnd -= DEFAULT_UNIT;
		}
		Collections.reverse(logs);
		return logs;
	}

	public abstract double getValue(int timeEnd);
}
