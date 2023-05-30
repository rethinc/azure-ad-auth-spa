#!/bin/sh

/write-env-to.sh /usr/share/nginx/html/env
nginx -g 'daemon off;'
