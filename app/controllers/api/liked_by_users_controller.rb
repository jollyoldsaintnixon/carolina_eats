class Api::LikedByUsersController < ApplicationController
    def user_index
        if logged_in?
            
            @liked_by_users = @current_user.liked_by_users.includes(menu_item: :serve_dates)
            to_render = {}
            @liked_by_users.each do |lbu|
                item = lbu.menu_item
                serve_dates = item.serve_dates
                to_render[item.id] = {
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    updated_at: lbu.updated_at,
                    serve_dates: serve_dates
                }
            end 
            render json: to_render
        else  
            # render json: ["No current user"], status: 403
            render json: {}
        end
    end

    def add_liked
        if logged_in?
            @menu_item = MenuItem.includes(:serve_dates).find_by(id: params[:item_id])
            if @menu_item
                current_user.menu_items.push(@menu_item)
                @liked_by_user = @menu_item.liked_by_users.where(user_id: @current_user.id).includes(menu_item: :serve_dates).first
                render "api/liked_by_users/show"
            else  
                render json: ["Did not find menu item by the id of #{params[:item_id]}"], status: 422
            end
        else  
            render json: ["Not logged in"], status: 403
        end
    end
end
