#!/usr/bin/env python
import config
import json
import math
import os
import pickle
import pylab
import requests
import subprocess
from requests.auth import HTTPBasicAuth

os.chdir('..')
libs = ':'.join(['bin'] + ['libs/'+path for path in os.listdir('libs')])
auth = HTTPBasicAuth(config.username, config.password)
keys = ["forks_count", "stargazers_count", "subscribers_count", "size", "open_issues_count"]

def load():
    return pickle.load(open(config.database, 'rb'))

def save(obj):
    pickle.dump(obj, open(config.database, 'wb'))

def meta(owner, repo):
    resp = requests.get('https://api.github.com/repos/%s/%s' % (owner, repo), auth=auth)
    data = json.loads(resp.text)
    return dict((key, data[key]) for key in keys)

def metric(repo):
    cmd = 'echo "%s" | java -cp %s FastMain' % (repo, libs)
    result = subprocess.check_output(cmd, shell=True).splitlines()
    return dict([("rcf", float(result[0].split(':')[-1])),
                 ("scf", float(result[1].split(':')[-1])),
                 ("ccr", float(result[2].split(':')[-1]))])

def process():
    db = load()
    for (owner, repo, url) in config.targets:
        if repo not in db:
            print 'Processing %s' % repo
            db[repo] = (metric(repo), meta(owner, repo))
            save(db)
    return db

def main():
    db = process()
    for m in ["rcf","scf","ccr"]:
        for k in keys:
            print 'Plotting %s-%s.png' % (m, k)
            X, Y = [], []
            for repo in db:
                X.append(db[repo][0][m])
                Y.append(math.log(1.+db[repo][1][k]))
            pylab.figure()
            pylab.plot(X, Y, 'o')
            pylab.xlabel(m)
            pylab.ylabel('log(%s)' % k)
            pylab.savefig('backtest/images/%s-%s.png' % (m, k))
            pylab.close()

if __name__ == '__main__':
    if not os.path.exists(config.database):
        save({})
    main()

