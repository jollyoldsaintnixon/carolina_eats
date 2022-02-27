#!/bin/sh

# set -e
# [ -n "$PYENV_DEBUG" ] && set -x

# # program="${0##*/}"

# export PYENV_ROOT="/home/josn/.pyenv"
# exec "/home/josn/.pyenv/libexec/pyenv" exec "scrapers/daily_run.py"
day=$(date +'%m/%d/%Y')
cd /home/josn/apps/secondChance/carolina_eats/scripts
if /home/josn/.pyenv/shims/python scrapers/daily_run.py ; then
    echo "Scrape succeeded: ${day}" >> /home/josn/apps/secondChance/carolina_eats/log/daily.log
else
    echo "Scrape failed: ${day}" >> /home/josn/apps/secondChance/carolina_eats/log/daily.log
fi