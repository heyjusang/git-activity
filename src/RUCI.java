
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map.Entry;


public class RUCI extends Metric {
    
    public RUCI(Target target) {
        super(target);
    }

    private double getMedian(ArrayList<Double> list) {
        Collections.sort(list);
        int size = list.size();
        if (size == 0)
            return 1E+9;
        else if(size % 2 == 1)
            return list.get(size / 2);
        else
            return (list.get(size / 2 - 1) + list.get(size / 2)) / 2.0;
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

    public double getValue(int timeEnd, int interval) {
        double ucia = getUserCommitInterval(timeEnd - 120*MONTH, timeEnd);
        double uci6 = getUserCommitInterval(timeEnd - interval*MONTH, timeEnd);
        double ratio = uci6 / (ucia + 1E-9);
        double ruci = 100.0 * (1 / (1 + Math.pow(ratio, 2)));
        return ruci;
    }
}
