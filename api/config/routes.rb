# frozen_string_literal: true

Rails.application.routes.draw do
  scope 'api' do
    
    devise_for :users, skip: [:passwords, :registrations, :confirmations],
               controllers:  { sessions: :sessions },
               path_names:   { sign_in: :login }
    as :user do
      post '/users', to: 'users#create'
      resource :user, only: [:show, :update]
    end
    
    resources :lists
    patch '/lists', to: 'lists#rearrange_lists'
    patch '/lists/:id/tasks', to: 'lists#rearrange_tasks'
    delete '/lists/:id/tasks/completed', to: 'lists#destroy_completed_tasks'
    delete '/lists/:id/tasks', to: 'lists#destroy_tasks'
    
    resources :tasks
  end
end
