class ApplicationController < ActionController::Base

    helper_method :current_user, :logged_in?

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!current_user
    end

    def log_in!(user)
        session[:session_token] = user.reset_token!
    end

    def log_out!
        current_user.reset_token! # no longer matches the session[:session_token]
        @current_user = nil
        session[:session_token] = nil
    end

    def ensure_logged_in
        unless current_user # calls the current_user method
            render '/api/session' # render log in page if not logged in. figure out how to add errors
        end
    end
end
