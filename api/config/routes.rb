# frozen_string_literal: true

Rails.application.routes.draw do
  scope 'api' do
    
    devise_scope :user do
      post '/users' => 'users#create'
      patch '/users' => 'users#update'
      put '/users' => 'users#update'
      get '/user' => 'users#show'
    end
    as :user do
      post '/users/login' => 'sessions#create', :as => :user_session
    end
    
    resources :lists
    delete '/lists/:id/tasks/completed', to: 'lists#destroy_completed_tasks'
    delete '/lists/:id/tasks', to: 'lists#destroy_tasks'
    resources :tasks
  end
end
