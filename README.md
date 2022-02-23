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

TODO:
    session:
        figure out Link/Router/HashRouter, and when to render signup/login/logout
    user:
        oauth
    controllers:
        make strong params
    menu_items:
        BONUS: include dietary preference category
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
        -search function can be improved by have filter start at largest -prefix in dictionary
        -have the dictionary be a copy of what is in the state and then setState to save it
        BONUS: build a suffix tree
        BONUS: highlight matching parts
        BONUS: search by dietary preference
NOTES:
    CSS:
        body has a margin of 50px for development; take it out later

BUGS:
