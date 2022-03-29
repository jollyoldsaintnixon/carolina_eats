# README

## Scraper
### Shape of Master 
- set
- stored in pickle
- written to csv
    1. category name
    2. item name

## Custom Tasks
### create_menu_items_and_serve_dates
- SHOULD run via crontab
- SHOULD reseed the database

## TODO:
### jobs: 
* finish setting up sidekiq-status gem
* set up a carolinaeats@gmail.com account to send emails instead of personal email
* enqueue jobs at user specified times instead of sending messages at midnight
* checkout heroku scheduler
* BONUS: make custom sql query that is more efficient than default rails
### tests:
* create all levels of tests
    * unit tests
    * controller tests
    * front end tests
### tasks: 
* refactor rails create_menu_items_and_serve_dates:seed
* `rake default_reminder_email:default_send` will now send an email to every user and inform them when an item they are subscribed to will be served if it is within the default time window. it also generates a model between the serve date and user memoize that an email for that serve date was already sent.
* make an "update email" that notifies the user when a liked item is suddenly scheduled within their reminder range or when a liked item is removed.
### session:
* Use Link/Router/HashRouter to easily render signup/login/logout
### user:
* oauth
### controllers:
### menu_items:
* liked menu_item:
    * search for added liked menu item by id. will require significant refactoring
* BONUS: include dietary preference category. consider adding a boolean field for each dietary restriction and the same number of headers to the csv file. then you can just put true or false in each respective column based on whether or not BSoup finds the element with a class search. the class names are like "prop-vegan" and are within the anchor tag of the li that is iterated over to get the menu item name.
### serve_dates:
* load serve dates in a paginating way
* right now, the user_index in lbu controller is rendered within the controller. this is much, much faster than jbuilder and is easy, but consider breaking it into a view for separation of concerns.
    * check out alternatives to jbuilder
### display:
* consider attaching menu item names to window since it is static
    * see the lag once it is hosted on heroku
* make it so the serve dates controller when trying to query today's serve dates
### search:
* search function can be improved by have filter start at largest prefix in dictionary
* have the dictionary be a copy of what is in the state and then setState to save it
* BONUS: build a suffix tree
* BONUS: highlight matching parts (this turned out to be really slow, but maybe there is a better way to implement it. I guess I could do so when first iterating over each word; this will make the methods complicated however.)
* BONUS: search by dietary preference
* consider simplifying the search method to only match contiguous substrings. that's probably what users are accostumed to anyway.
### scrapers and db:
* make functionality that dynamically drops items that no longer have serve dates once their last serve date is passed. or at least let's make it render the item in gray on the front end and always at the end of lists

## NOTES:
### CSS:
* body has a margin of 50px for development; take it out later
* switch deliver_now to deliver_later for emails

## BUGS:
* couldn't figure out why two chosenItems were having display set to "none" when the delete button for one was clicked. I tried various mouse events (onMouseDown, onMouseUp, onMouseDownCapture (for parent element)). Also sent the parent element into a function to have display changed to none. What was happening was that the action being set off to remove the association from the database was causing the updated state to also remove an item, and it seems that the next sibling was targeted. The solution for now was to not change the display to none, however this could increase lag time in production.
* again with the crontab. couldn't get a job to send email. i made sure to `cd` into the working directory and use the full rake path, but it still wasn't recognizing the command. then I added `bundle exec`; this got further. I was sending the output to a log and with `puts` statements I was able to see that the email does indeed generate, but it doesn't send. I figured this was down to the environment variables not loading properly. I tried to load the right bash profile at the beginning of the command, but to no avail. eventually I passed in the plain gmail username and password. This is working, but is not terribly secure. The whenever gem may be able to secure this properly.

## Setup

#### Ruby version
2.7.0
#### Database creation
`bundle exec rails db:create`
#### Database initialization
`bundle exec rails db:seed`