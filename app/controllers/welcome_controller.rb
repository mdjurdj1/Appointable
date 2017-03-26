class WelcomeController < ApplicationController
  before_action :authenticate_user!

  def home
    unless current_user
      redirect_to new_user_session_path
    end
  end

end
