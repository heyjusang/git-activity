#!/usr/bin/env python
import os
os.chdir('..')
libs = ':'.join(['bin'] + ['libs/'+path for path in os.listdir('libs')])
srcs = ' '.join('src/'+path for path in os.listdir('src'))
os.system('javac -cp %s -d bin %s' % (libs, srcs))
