# frozen_string_literal: true

Rails.application.routes.draw do
  scope '/api' do
    resources :lists
    delete '/lists/:id/tasks/completed', to: 'lists#destroy_completed_tasks'
    resources :tasks
  end
end
