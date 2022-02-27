Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :menu_items, only: [:index, :show]
    get 'menu_item_names', to: 'menu_items#name_index'
    get 'serve_dates/:date', to: 'serve_dates#date_index'
    get 'liked_menu_items', to: 'users#liked_index'
    post 'liked_menu_items', to: 'users#add_liked'
    delete 'liked_menu_items/:item_id', to: 'users#delete_liked'
  end

  root 'static_pages#root'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
