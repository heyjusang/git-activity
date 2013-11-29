#!/usr/bin/python
import json
import numpy as np
from sklearn.gaussian_process import GaussianProcess

def normalize(e):
    return 100.*(1-1./(1+e**2))

def denormalize(e):
    return np.sqrt(-1+1/(1-e/100.))

# Prepare training data for regression
data = json.load(open('html/js/data.js'))
y = np.array(data['activity'])
x = np.atleast_2d(xrange(len(y))).T

# Instanciate a Gaussian Process model
# Fit to data using Maximum Likelihood Estimation of the parameters
gp = GaussianProcess(theta0=1e-2, thetaL=1e-4, thetaU=1e-1)
gp.fit(x, y)

# Generate the input space and make the prediction
xp = np.atleast_2d(xrange(len(y), len(y)+6)).T
yp = gp.predict(xp)

# ...
data['future'] = list(yp)
out = 'var data = [%s];' % json.dumps(dict(data), ensure_ascii=False)
open('html/js/data.js','w').write(out)
