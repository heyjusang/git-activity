#!/usr/bin/env python
import config
import os

os.chdir('../projects')
for (owner, repo, url) in config.targets:
    if repo not in os.listdir('.'):
        os.system('git clone %s' % url)

