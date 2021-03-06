class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        if @user.save
            log_in!(@user)
            ReminderMailer.with(user: @user).welcome_email.deliver_now # should be deliver_later in production
            render :show
        else  
            render json: @user.errors.full_messages, status: 422
        end
    end

    def delete_liked  
        if logged_in?
            menu_item = MenuItem.find_by(id: params[:item_id])
            if menu_item
                if @current_user.menu_items.delete(menu_item)
                    render json: menu_item.id
                else   
                    render json: ["could not delete menu item with id #{params[:item_id]}"], status: 422
                end
            else
                render json: menu_item.errors.full_messages, status: 422
            end
        else
            render json: @current_user.errors.full_messages, status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :password)
    end
end
