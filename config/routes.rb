Rails.application.routes.draw do

  resources :locations do
    resources :appointments, only: [:index, :show, :new]
  end 

  resources :contacts
  resources :appointments
  devise_for :users
  root 'welcome#home'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
