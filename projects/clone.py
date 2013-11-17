#!/usr/bin/env python
import os

projects = [
    {'name': 'node', 'url': 'https://github.com/joyent/node.git'},
    {'name': 'yobi', 'url': 'https://github.com/nforge/yobi.git'},
]

for e in projects:
    if e['name'] not in os.listdir('.'):
        os.system('git clone %s' % e['url'])

