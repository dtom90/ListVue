# frozen_string_literal: true

class ListsController < ApplicationController
  before_action :set_list, only: %i[show update rearrange_tasks destroy_completed_tasks destroy_tasks destroy]
  
  # GET /lists
  def index
    @lists = current_user.lists
    
    render json: @lists
  end
  
  # GET /lists/1
  def show
    render json: @list.to_json(include: :tasks)
  end
  
  # POST /lists
  def create
    @list = current_user.lists.new(list_params)
    
    if @list.save
      render json: @list, status: :created, location: @list
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  # PATCH /lists
  def rearrange_lists
    @lists = current_user.lists
    lists  = list_order_params[:list_fields]
    puts list_order_params[:list_fields]
    if @lists.update(lists.keys, lists.values)
      render json: @lists
    else
      render json: @lists.errors, status: :unprocessable_entity
    end
  end
  
  # PATCH/PUT /lists/1
  def update
    if @list.update(list_params)
      render json: @list
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  # PATCH/PUT /lists/1/tasks
  def rearrange_tasks
    tasks = list_params[:tasks]
    if @list.tasks.update(tasks.keys, tasks.values)
      render json: @list.tasks
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  # DELETE /lists/1/tasks/completed
  def destroy_completed_tasks
    @list.tasks.where.not(completed_at: nil).delete_all
  end
  
  # DELETE /lists/1/tasks
  def destroy_tasks
    @list.tasks.delete_all
  end
  
  # DELETE /lists/1
  def destroy
    @list.destroy
  end
  
  private
  
  # Use callbacks to share common setup or constraints between actions.
  def set_list
    @list = current_user.lists.find(params[:id])
  end
  
  # Only allow a trusted parameter "white list" through.
  def list_params
    params.require(:list).permit(:name, tasks: [:order])
  end
  
  def list_order_params
    params.require(:lists).permit(list_fields: [:order])
  end
end
