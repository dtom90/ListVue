class UsersController < Devise::RegistrationsController
  skip_before_action :authenticate_user!, only: :create

  def create
    super
    resource.lists.create(name: 'To Do')
  end
  
  def show; end
  
  def update
    if current_user.update(user_params)
      render :show
    else
      render json: { errors: current_user.errors }, status: :unprocessable_entity
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :email)
  end
end
