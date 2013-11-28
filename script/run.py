#!/usr/bin/env python
import os
import sys
if len(sys.argv) != 2:
    print 'Usage: %s class_name' % sys.argv[0]
else:
    os.chdir('..')
    libs = ':'.join(['bin'] + ['libs/'+path for path in os.listdir('libs')])
    os.system('java -cp %s %s' % (libs, sys.argv[1]))
