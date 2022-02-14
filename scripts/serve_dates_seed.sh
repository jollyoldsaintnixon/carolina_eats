#!/bin/sh

cd /home/josn/apps/carolina_eats/carolina_eats/
if /home/josn/.rbenv/shims/rails create_menu_items_and_serve_dates:seed ; then
    echo "Seed succeeded" >> /home/josn/apps/carolina_eats/carolina_eats/log/seed_menu_items_and_serve_dates.log
else
    echo "Seed failed" >> /home/josn/apps/carolina_eats/carolina_eats/log/seed_menu_items_and_serve_dates.log
fi