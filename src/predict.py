#!/usr/bin/python
import json
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor

data = json.load(open('html/js/data.js'))

if len(data['activity']) > 0:
    # Prepare training data for regression
    y = np.array(data['activity'])
    x = np.atleast_2d(xrange(len(y))).T

    # Instanciate a prediction model
    model = GradientBoostingRegressor()
    model.fit(x, y)

    # Generate the input space and make the prediction
    xp = np.atleast_2d(xrange(len(y), len(y)+6)).T
    yp = gp.predict(xp).clip(0.0, 100.0)

    # Save the regression result
    data['future'] = list(yp)
else:
    data['future'] = []

out = 'var data = %s;' % json.dumps(dict(data))
open('html/js/data.js','w').write(out)
