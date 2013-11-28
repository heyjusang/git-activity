
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;


public abstract class Metric {
    private final int DEFAULT_SAMPLES = 50;
    private final int DEFAULT_INTERVAL = 6;
    protected final int MONTH = 4*7*24*60*60;
    protected static final int MONTH = 4*7*24*60*60;
    protected static final int WEEK = 7*24*60*60;
    protected Target target;

    public Metric(Target target) {
        this.target = target;
    }

    public static int today() {
        return (int)((new Date()).getTime() / 1000);
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
        return getValue(today(), DEFAULT_INTERVAL);
    }

    public ArrayList<Double> getLogs() {
        return getLogs(DEFAULT_SAMPLES, DEFAULT_INTERVAL);
    }

    public ArrayList<Double> getLogs(int nMaxSample, int interval) {
        ArrayList<Double> result = new ArrayList<Double>();
        int timeEnd = today();
        for (int i = 0; i < nMaxSample; i++) {
            if (timeEnd < this.target.getListCommitTime().get(0)) break;
            result.add(getValue(timeEnd, interval));
            timeEnd -= MONTH;
        }
        Collections.reverse(result);
        return result;
    }

    public abstract double getValue(int timeEnd, int interval);
}
