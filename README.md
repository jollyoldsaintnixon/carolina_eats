# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# Scraper
## Shape of Master 
- set
    - 
- stored in pickle
- written to csv
    1. category name
    2. item name

# Custom Tasks
## create_menu_items_and_serve_dates
- SHOULD run via crontab
- SHOULD reseed the database

TODO:
jobs: 
    BONUS: make custom sql query that is more efficient
    -finish setting up sidekiq-status gem
    -continue testing the firstaddjob. see if you can get the carolinaeatsapp@gmail.com to send emails. might need to enable access to "less secure apps" on google
tasks: 
    -rails create_menu_items_and_serve_dates:seed only goes one week out and completely drops the db. need to think of a way to keep serve dates that are further out and probably not drop the enitre menu
session:
    -figure out Link/Router/HashRouter, and when to render signup/login/logout
user:
    oauth
controllers:
    make strong params
    make some before actions to summon @records
* menu_items:
    BONUS: include dietary preference category. consider adding a boolean field for each dietary restriction and the same number of headers to the csv file. then you can just put true or false in each respective column based on whether or not BSoup finds the element with a class search. the class names are like "prop-vegan" and are within the anchor tag of the li that is iterated over to get the menu item name.
    * liked menu_item:
        * search for added liked menu item by id. will require significant refactoring
serve_dates:
    load serve dates in a paginating way
display:
    attach menu item names to window
    make it to the serve dates controller when trying to query today's serve dates
    render display
        figure out best way to feed in today's menu items
            ? another backend query for specified date
            ? initial query already distinguishes each needed day (should be 7 total)
            ? parse the menu_items already returned from initial mass query on front end
search:
    -search function can be improved by have filter start at largest prefix in dictionary
    -have the dictionary be a copy of what is in the state and then setState to save it
    BONUS: build a suffix tree
    BONUS: highlight matching parts
    BONUS: search by dietary preference
NOTES:
    CSS:
        body has a margin of 50px for development; take it out later

BUGS:
* couldn't figure out why two chosenItems were having display set to "none" when the delete button for one was clicked. I tried various mouse events (onMouseDown, onMouseUp, onMouseDownCapture (for parent element)). Also sent the parent element into a function to have display changed to none. What was happening was that the action being set off to remove the association from the database was causing the updated state to also remove an item, and it seems that the next sibling was targeted. The solution for now was to not change the display to none, however this could increase lag time in production.