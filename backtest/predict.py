#!/usr/bin/env python
import json
import numpy as np
import pylab as pl
from sklearn.gaussian_process import GaussianProcess

def normalize(e):
    return 100.*(1-1./(1+e**2))

def denormalize(e):
    return np.sqrt(-1+1/(1-e/100.))

# Prepare training data for regression
y = np.array(json.load(open('node.json')))
x = np.atleast_2d(xrange(len(y))).T

# Instanciate a Gaussian Process model
# Fit to data using Maximum Likelihood Estimation of the parameters
gp = GaussianProcess(theta0=1e-2, thetaL=1e-4, thetaU=1e-1)
gp.fit(x, y)

# Generate the input space and make the prediction
xp = np.atleast_2d(xrange(len(y), len(y)+6)).T
yp = gp.predict(xp)

# Plot the observations and the prediction
pl.plot(x, y, 'r.-', markersize=5, label=u'Observations')
pl.plot(xp, yp, 'b.--', markersize=5, label=u'Prediction')
pl.xlabel('t')
pl.ylabel('f(t)')
pl.legend()
pl.show()
