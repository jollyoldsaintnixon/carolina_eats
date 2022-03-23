#!/bin/sh
day=$(date +'%m/%d/%Y')
cd /home/josn/apps/secondChance/carolina_eats/
if bundle exec /home/josn/.rbenv/shims/rake default_reminder_email:default_send ; then
    echo "sent reminder emails: ${day}" >> /home/josn/apps/secondChance/carolina_eats/log/reminder_email.log
else
    echo "reminder email failed: ${day}" >> /home/josn/apps/secondChance/carolina_eats/log/reminder_email.log
fi