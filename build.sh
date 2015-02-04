#!/bin/sh
ENV=production grunt build
cd dist
s3cmd sync . s3://bluelytics.com.ar
cd ..

