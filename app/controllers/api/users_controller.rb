class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        if @user.save
            log_in!(@user)
            email = ReminderMailer.with(user: @user).welcome_email # later, later
            if email.deliver_later
                render :show
            else  
                render json: { errors: email.errors.full_messages, status: 422 }
            end
        else  
            render json: @user.errors.full_messages, status: 422
        end
    end

    # def liked_index
    #     if logged_in?
    #         # @menu_items = @current_user.menu_items.includes(:serve_dates)
    #         @menu_items = @current_user.menu_items.includes(:serve_dates, :liked_by_users).joins(:liked_by_users)
    #         render 'api/menu_items/item_only_index'
    #     else  
    #         # render json: ["No current user"], status: 403
    #         render json: {}
    #     end
    # end

    # def add_liked
    #     if logged_in?
    #         @menu_item = MenuItem.includes(:serve_dates).find_by(id: params[:item_id])
    #         if @menu_item
    #             current_user.menu_items.push(@menu_item)
    #             render 'api/menu_items/show'
    #         else  
    #             render json: ["Did not find menu item by the id of #{params[:item_id]}"], status: 422
    #         end
    #     else  
    #         render json: ["Not logged in"], status: 403
    #     end
    # end

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
