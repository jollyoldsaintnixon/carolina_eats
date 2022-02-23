class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        if @user.save
            log_in!(@user)
            # email = UserMailer.welcome_email(@user) # later, later
            # if email.deliver_later
                render :show
            # else  
                # render json: { errors: email.errors.full_messages, status: 422 }
            # end
        else  
            render json: @user.errors.full_messages, status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :password)
    end
end
