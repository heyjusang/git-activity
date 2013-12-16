#!/usr/bin/python
import json
import numpy as np
# from sklearn.ensemble import GradientBoostingRegressor
from sklearn.gaussian_process import GaussianProcess

data = json.load(open('html/js/data.js'))

if len(data['activity']) > 0:
    # Prepare training data for regression
    y = np.array(data['activity'])
    x = np.atleast_2d(xrange(len(y))).T
    m = y.mean()
    y = y - m

    # Instanciate a prediction model
    # model = GradientBoostingRegressor()
    model = GaussianProcess(theta0=1e-1, nugget=1e-3)
    model.fit(x, y)

    # Generate the input space and make the prediction
    xp = np.atleast_2d(xrange(len(y), len(y)+6)).T
    yp = model.predict(xp)
    yp = (yp + m).clip(0.0, 100.0)

    # Save the regression result
    data['future'] = list(yp)
else:
    data['future'] = []

out = 'var data = %s;' % json.dumps(dict(data))
open('html/js/data.js','w').write(out)
