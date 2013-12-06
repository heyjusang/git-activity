
public class CCR extends Metric {
	
	public CCR(Target target) {
		super(target);
	}

	private double getCrossCommitRatio(int timeStart, int timeEnd) {
		int totalCommitCount = 0;
		int crossCommitCount = 0;
		for (Integer time : this.target.getListCommitTime())
			if (timeStart <= time && time <= timeEnd)
				totalCommitCount++;
		for (Integer time : this.target.getListCrossCommitTime())
			if (timeStart <= time && time <= timeEnd)
				crossCommitCount++;
		return (double)crossCommitCount / (totalCommitCount + 1E-9);
	}

	public double getValue(int timeEnd) {
		double ccr = getCrossCommitRatio(timeEnd - DEFAULT_INTERVAL, timeEnd);
		return 100. * ccr;
	}
}
