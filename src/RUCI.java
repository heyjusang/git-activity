
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map.Entry;


public class RUCI extends Metric {
    
    public RUCI(Target target) {
        super(target);
    }

    private double getUserCommitInterval(int timeStart, int timeEnd) {
        ArrayList<Double> interval = new ArrayList<Double>();
        for (Entry<String, ArrayList<Integer>> e : this.target.getMap().entrySet()) {
            int timeLast = -1;
            for (Integer time : e.getValue()) {
                if (timeStart <= time && time <= timeEnd) {
                    if (timeLast >= 0)
                        interval.add((double)Math.abs(timeLast - time));
                    timeLast = time;
                }
            }
        }
        return getMedian(interval);
    }

    public double getValue(int timeEnd) {
        double ucia = getUserCommitInterval(timeEnd - 120*MONTH, timeEnd);
        double uci6 = getUserCommitInterval(timeEnd - 6*MONTH, timeEnd);
        double ratio = uci6 / (ucia + 1E-9);
        double ruci = 100.0 * (1 / (1 + Math.pow(ratio, 2)));
        return ruci;
    }
}
