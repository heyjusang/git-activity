#!/usr/bin/python
import json
import numpy as np
from sklearn.gaussian_process import GaussianProcess

# Prepare training data for regression
data = json.load(open('html/js/data.js'))
y = np.array(data['activity'])
x = np.atleast_2d(xrange(len(y))).T

# Instanciate a Gaussian Process model
# Fit to data using Maximum Likelihood Estimation of the parameters
gp = GaussianProcess(theta0=1e-1, nugget=1e-6)
gp.fit(x, y)

# Generate the input space and make the prediction
xp = np.atleast_2d(xrange(len(y), len(y)+6)).T
yp = gp.predict(xp).clip(0.0, 100.0)

# Save the regression result
data['future'] = list(yp)
out = 'var data = %s;' % json.dumps(dict(data))
open('html/js/data.js','w').write(out)
