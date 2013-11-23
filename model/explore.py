#!/usr/bin/env python
import json
import os
import pylab

for filename in os.listdir('.'):
    if not filename.endswith('.json'): continue
    print 'Processing %s' % filename
    
    data = json.load(open(filename))
    y = [e['target'] for e in data]
       
    for (i, c) in enumerate(['rcf', 'rcff', 'ccr', 'ccrf']):
        x = [e[c] for e in data]
        pylab.subplot(221 + i)
        pylab.title(c)
        pylab.plot(x, y, '.')
    '''
    x = [e['rcf'] for e in data]
    y = [e['ccr'] for e in data]
    pylab.plot(x, y, '.')
    '''

pylab.savefig('all.png')
