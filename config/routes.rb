Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :menu_items, only: [:index, :show]
    get 'menu_item_names', to: 'menu_items#name_index'
    get 'serve_dates/:date', to: 'serve_dates#date_index'
  end

  root 'static_pages#root'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
