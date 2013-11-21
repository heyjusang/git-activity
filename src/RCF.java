
public class RCF extends Metric {
    
    public RCF(Target target) {
        super(target);
    }

    private double getMeanCommitFrequency(int timeStart, int timeEnd) {
        int commitCount = 0;
        int timeFirst = -1;
        for (Integer time : this.target.getListCommitTime()) {
            if (timeStart <= time && time <= timeEnd) {
                if (timeFirst < 0) timeFirst = time;
                commitCount++;
            }
        }
        return (double)commitCount / (double)(timeEnd - timeFirst);
    }

    public double getValue(int timeEnd, int interval) {
        double mcfa = getMeanCommitFrequency(timeEnd - 120*MONTH, timeEnd);
        double mcf6 = getMeanCommitFrequency(timeEnd - interval*MONTH, timeEnd);
        double ratio = mcf6 / (mcfa + 1E-9);
        double rcf = 100. * (1 - 1 / (1 + Math.pow(ratio, 2)));
        return rcf;
    }
}
