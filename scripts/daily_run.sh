#!/bin/sh

# set -e
# [ -n "$PYENV_DEBUG" ] && set -x

# # program="${0##*/}"

# export PYENV_ROOT="/home/josn/.pyenv"
# exec "/home/josn/.pyenv/libexec/pyenv" exec "scrapers/daily_run.py"
cd /home/josn/apps/carolina_eats/carolina_eats/scripts
if /home/josn/.pyenv/shims/python scrapers/daily_run.py ; then
    echo "Scrape succeeded" >> /home/josn/apps/carolina_eats/carolina_eats/log/daily.log
else
    echo "Scrape failed" >> /home/josn/apps/carolina_eats/carolina_eats/log/daily.log
fi