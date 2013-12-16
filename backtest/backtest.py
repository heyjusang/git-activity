#!/usr/bin/env python
import json
import numpy as np
import os
import pylab
from sklearn.cross_validation import cross_val_score
from sklearn.metrics import mean_squared_error
from sklearn.linear_model import LinearRegression
from sklearn.svm import SVR
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.gaussian_process import GaussianProcess


def prepare(jsondir='./json/', testsize=1):
    dataset = []
    for filename in os.listdir(jsondir):
        rows = json.load(open(jsondir + filename))
        n = len(rows['A'])
        if n <= 10: continue
        rows['A'] = np.array(rows['A']) / 100.0 - 0.5
        rows['B'] = np.array(rows['B']) / 100.0 - 0.5
        rows['C'] = np.array(rows['C']) / 100.0 - 0.5
        for dt in xrange(1, 7):
            data = []
            for t in xrange(n-dt):
                # data.append([t+dt, rows['A'][t+dt]])
                data.append([t+dt, rows['B'][t], rows['C'][t], rows['A'][t+dt]])
            data = np.array(data)
            X = data[:,:-1]
            y = data[:,-1]
            X_train, X_test = X[:-testsize], X[-testsize:]
            y_train, y_true = y[:-testsize], y[-testsize:]
            dataset.append({'name': filename,
                            'dt': dt,
                            'X_train': X_train,
                            'y_train': y_train,
                            'X_test': X_test,
                            'y_true': y_true})
    return dataset


def test(model, X_train, y_train, X_test, y_true):
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test).clip(-0.5, 0.5)
    error = mean_squared_error(y_true, y_pred)
    return error


def main():
    dataset = prepare()
    models = [
        LinearRegression(),
        SVR(),
        GaussianProcess(theta0=1e-1, nugget=1e-1),
        # RandomForestRegressor(),
        # GradientBoostingRegressor(),
    ]
    for (i, model) in enumerate(models):
        error = 0.
        for data in dataset:
            error += test(model, data['X_train'], data['y_train'], data['X_test'], data['y_true'])
        print '%30s: %15.10f' % (model.__class__.__name__, error)
        color = str(float(i) / len(models))
        error /= len(dataset)
        pylab.bar(i, error, label=model.__class__.__name__, alpha=0.5, color=color)
    pylab.legend(loc='upper right')
    pylab.ylabel('MSE')
    pylab.ylim(0.0, 0.08)
    pylab.savefig('images/backtest.png')
    pylab.show()


if __name__ == '__main__':
    main()

