#!/bin/bash
#
# this script should not be run directly,
# instead you need to source it from your .bashrc,
# by adding this line:
#   . ./run-production.sh
#

cd ./../
yarn run build
pm2 start yarn --name "website" -- start
