
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;


public abstract class Metric {
    
    private final int DEFAULT_SAMPLES = 50;
    private final int DEFAULT_INTERVAL = 6;
    protected final int MONTH = 4*7*24*60*60;
    protected Target target;

    public Metric(Target target) {
        this.target = target;
    }

    private int today() {
        return (int)((new Date()).getTime() / 1000);
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
