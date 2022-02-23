require "/home/josn/apps/carolina_eats/carolina_eats/app/workers/serve_dates_seed_worker.rb"
require "sidekiq"

ServeDatesSeedWorker.perform_async()
MenuItemNames.perform_async