class WelcomeController < ApplicationController

  def home
    unless current_user
      redirect_to new_user_session_path
    end
  end

end
