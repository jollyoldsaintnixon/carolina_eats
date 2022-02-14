Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :menu_items, only: [:index, :show]
  end

  root 'static_pages#root'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
