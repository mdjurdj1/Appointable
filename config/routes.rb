Rails.application.routes.draw do

  resources :locations do
    resources :appointments, only: [:index]
  end

  resources :contacts do
    resources :appointments, only: [:index]
  end

  resources :appointments
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  root 'welcome#home'
  get '/auth/facebook/callback' => 'sessions#create'
  get '/list', to: 'appointments#list'
  get '/contacts/:id/get', to: 'contacts#get'
  get '/locations/:id/getAppointmentData', to: 'locations#getAppointmentData'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
