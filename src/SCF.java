
public class SCF extends Metric {
    
    public SCF(Target target) {
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

    public double getValue(int timeEnd) {
        double mcf = getMeanCommitFrequency(timeEnd - 6*MONTH, timeEnd);
        double scf = Math.log(mcf*6*MONTH + 1) / Math.log(2);
        return scf;
    }
}
