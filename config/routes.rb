Rails.application.routes.draw do
  namespace :api do
    get 'menu_items/index'
    get 'menu_items/show'
    get 'menu_items/liked'
    get 'menu_items/update'
    get 'menu_items/destroy'
  end

  root 'static_pages#root'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
