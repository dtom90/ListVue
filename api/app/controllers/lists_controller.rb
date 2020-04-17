# frozen_string_literal: true

class ListsController < ApplicationController
  before_action :set_list, only: %i[show update destroy_completed_tasks destroy_tasks destroy]

  # GET /lists
  def index
    @lists = List.all

    render json: @lists
  end

  # GET /lists/1
  def show
    render json: @list.to_json(include: :tasks)
  end

  # POST /lists
  def create
    @list = List.new(list_params)

    if @list.save
      render json: @list, status: :created, location: @list
    else
      render json: @list.errors, status: :unprocessable_entity
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
    @list = List.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def list_params
    params.require(:list).permit(:name)
  end
end
