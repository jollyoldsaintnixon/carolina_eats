#!/bin/sh
day=$(date +'%m/%d/%Y')
cd /home/josn/apps/secondChance/carolina_eats/
if /home/josn/.rbenv/shims/rake create_menu_items_and_serve_dates:seed ; then
    echo "Seed succeeded: ${day}" >> /home/josn/apps/secondChance/carolina_eats/log/seed_menu_items_and_serve_dates.log
else
    echo "Seed failed: ${day}" >> /home/josn/apps/secondChance/carolina_eats/log/seed_menu_items_and_serve_dates.log
fi