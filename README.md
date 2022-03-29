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
* jobs: 
    BONUS: make custom sql query that is more efficient
    * finish setting up sidekiq-status gem
    * set up a carolinaeats@gmail.com account to send emails
    * test whether foods being served at exact same time both send out a reminder
    * learn how to "enqueue" jobs
    * checkout heroku scheduler
* tasks: 
    * rails create_menu_items_and_serve_dates:seed only goes one week out and completely drops the db. need to think of a way to keep serve dates that are further out and probably not drop the enitre menu
    * `rake default_reminder_email:default_send` will now send an email to every user and inform them when an item they are subscribed to will be served if it is within the default time window. it also generates a model between the serve date and user memoize that an email for that serve date was already sent.
    * make an "update email" that notifies the user when a liked item is suddenly scheduled within their reminder range or when a liked item is removed.
* session:
    * figure out Link/Router/HashRouter, and when to render signup/login/logout
* user:
    oauth
* controllers:
    make strong params
    make some before actions to summon @records
* menu_items:
    * BONUS: include dietary preference category. consider adding a boolean field for each dietary restriction and the same number of headers to the csv file. then you can just put true or false in each respective column based on whether or not BSoup finds the element with a class search. the class names are like "prop-vegan" and are within the anchor tag of the li that is iterated over to get the menu item name.
    * liked menu_item:
        * search for added liked menu item by id. will require significant refactoring
serve_dates:
    * load serve dates in a paginating way
    * figure out query that can select associated serve dates based on start_time
    * right now, the user_index in lbu controller is rendered within the controller. this is fast and easy, but consider breaking it into a view for separation of concerns.
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
* scrapers and db:
    * drop items that don't have any serve dates
    * make functionality that dynamically drops items that no longer have serve dates once their last serve date is passed. or at least let's make it render the item in gray on front end and at the end of lists
    * go through and comment on scrapers
NOTES:
    CSS:
        body has a margin of 50px for development; take it out later

BUGS:
* couldn't figure out why two chosenItems were having display set to "none" when the delete button for one was clicked. I tried various mouse events (onMouseDown, onMouseUp, onMouseDownCapture (for parent element)). Also sent the parent element into a function to have display changed to none. What was happening was that the action being set off to remove the association from the database was causing the updated state to also remove an item, and it seems that the next sibling was targeted. The solution for now was to not change the display to none, however this could increase lag time in production.
* again with the crontab. couldn't get a job to send email. i made sure to `cd` into the working directory and use the full rake path, but it still wasn't recognizing the command. then I added `bundle exec`; this got further. I was sending the output to a log and with `puts` statements I was able to see that the email does indeed generate, but it doesn't send. I figured this was down to the environment variables not loading properly. I tried to load the right bash profile at the beginning of the command, but to no avail. eventually I passed in the plain gmail username and password. This is working, but is not terribly secure. The whenever gem may be able to secure this properly.