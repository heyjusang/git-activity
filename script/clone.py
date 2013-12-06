#!/usr/bin/env python
import os
os.chdir('../projects')

projects = [
    {'name': 'node', 'url': 'https://github.com/joyent/node.git'},
    {'name': 'yobi', 'url': 'https://github.com/nforge/yobi.git'},
    # {'name': 'linux', 'url': 'https://github.com/torvalds/linux.git'},
    {'name': 'bootstrap', 'url': 'https://github.com/twbs/bootstrap.git'},
    {'name': 'jquery', 'url': 'https://github.com/jquery/jquery.git'},
    {'name': 'rails', 'url': 'https://github.com/rails/rails.git'},
    {'name': 'd3', 'url': 'https://github.com/mbostock/d3.git'},
    {'name': 'angular.js', 'url': 'https://github.com/angular/angular.js.git'},
    # {'name': 'backbone', 'url': 'https://github.com/jashkenas/backbone.git'},
    {'name': 'three.js', 'url': 'https://github.com/mrdoob/three.js.git'},
    {'name': 'reveal.js', 'url': 'https://github.com/hakimel/reveal.js.git'},
    {'name': 'django', 'url': 'https://github.com/django/django.git'},
    {'name': 'flask', 'url': 'https://github.com/mitsuhiko/flask.git'},
    {'name': 'tornado', 'url': 'https://github.com/facebook/tornado.git'},
    {'name': 'reddit', 'url': 'https://github.com/reddit/reddit.git'},
    # {'name': 'sentry', 'url': 'https://github.com/getsentry/sentry.git'},
    {'name': 'ipython', 'url': 'https://github.com/ipython/ipython.git'},
    {'name': 'webpy', 'url': 'https://github.com/webpy/webpy.git'},
    {'name': 'pandas', 'url': 'https://github.com/pydata/pandas.git'},
    # {'name': 'redis', 'url': 'https://github.com/antirez/redis.git'},
    # {'name': 'git', 'url': 'https://github.com/git/git.git'},
    # {'name': 'macvim', 'url': 'https://github.com/b4winckler/macvim.git'},
    # {'name': 'memcached', 'url': 'https://github.com/memcached/memcached.git'},
    # {'name': 'cocos2d-x', 'url': 'https://github.com/cocos2d/cocos2d-x.git'},
    {'name': 'scikit-learn', 'url': 'https://github.com/scikit-learn/scikit-learn.git'},
    {'name': 'numpy', 'url': 'https://github.com/numpy/numpy.git'},
    # {'name': 'nvm', 'url': 'https://github.com/creationix/nvm.git'},
    # {'name': 'normalize.css', 'url': 'https://github.com/necolas/normalize.css.git'},
    {'name': 'elasticsearch', 'url': 'https://github.com/elasticsearch/elasticsearch.git'},
    # {'name': 'storm', 'url': 'https://github.com/nathanmarz/storm.git'},
    # {'name': 'clojure', 'url': 'https://github.com/clojure/clojure.git'},
    # {'name': 'Android-PullToRefresh', 'url': 'https://github.com/chrisbanes/Android-PullToRefresh.git'},
    {'name': 'facebook-android-sdk', 'url': 'https://github.com/facebook/facebook-android-sdk.git'},
    {'name': 'spring-framework', 'url': 'https://github.com/spring-projects/spring-framework.git'},
    {'name': 'netty', 'url': 'https://github.com/netty/netty.git'},
    {'name': 'mongo', 'url': 'https://github.com/mongodb/mongo.git'},
    {'name': 'rethinkdb', 'url': 'https://github.com/rethinkdb/rethinkdb.git'},
]

for e in projects:
    if e['name'] not in os.listdir('.'):
        os.system('git clone %s' % e['url'])
