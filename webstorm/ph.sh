#!/bin/sh
URL=file://$PWD/index.html
phantomjs --local-to-remote-url-access=yes ph.js $URL
