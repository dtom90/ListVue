# frozen_string_literal: true

Rails.application.routes.draw do
  scope 'api' do
    
    devise_for :users,
               controllers: { sessions: :sessions },
               path_names:  { sign_in: :login }

    resource :user, only: [:show, :update]
    
    resources :lists
    delete '/lists/:id/tasks/completed', to: 'lists#destroy_completed_tasks'
    delete '/lists/:id/tasks', to: 'lists#destroy_tasks'
    resources :tasks
  end
end
