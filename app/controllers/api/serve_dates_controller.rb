class Api::ServeDatesController < ApplicationController
    def date_index
        
        utc_now = Time.current
        est_now = utc_now - (5*60*60) # five hours times 60 secs * 60 mins
        @today = est_now.to_date
        tomorrow = @today+1
        @serve_dates = ServeDate.includes(:menu_item).where(["start_time >= ? AND start_time < ?", @today, tomorrow])
    end
end
