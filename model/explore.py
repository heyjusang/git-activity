#!/usr/bin/env python
import json
import pylab

data = json.load(open('train.json'))
x = [e['rcf'] for e in data]
y = [e['scf'] for e in data]
z = [e['ccr'] for e in data]
w = [e['target'] for e in data]

pylab.subplot(131)
pylab.title('RCF')
pylab.plot(x, w, '.')

pylab.subplot(132)
pylab.title('SCF')
pylab.plot(y, w, '.')

pylab.subplot(133)
pylab.title('CCR')
pylab.plot(z, w, '.')

pylab.savefig('figure.png')
