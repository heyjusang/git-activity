
public class SCF extends Metric {
	
	public SCF(Target target) {
		super(target);
	}

	private int getCommitCount(int timeStart, int timeEnd) {
		int commitCount = 0;
		for (Integer time : this.target.getListCommitTime()) {
			if (timeStart <= time && time <= timeEnd) {
				commitCount++;
			}
		}
		return commitCount;
	}

	public double getValue(int timeEnd) {
		int commitCount = getCommitCount(timeEnd - DEFAULT_INTERVAL, timeEnd);
		double scf = Math.log(commitCount + 1) / Math.log(2) * (100. / 12);
		return Math.min(scf, 100.0);
	}
}
