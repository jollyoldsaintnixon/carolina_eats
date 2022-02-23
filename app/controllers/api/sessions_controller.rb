class Api::SessionsController < ApplicationController
    def create # log in
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        debugger
        if @user
            log_in!(@user)
            render 'api/users/show'
        else  
            render json: {
                errors: ["Invalid username or password"], 
                status: 422
            }
        end
    end

    def destroy # log out
        if current_user
            log_out!
            render json: {}
        else  
            render json: {
                errors: ["No user to log out"],
                status: 404
            }
        end
    end
end
