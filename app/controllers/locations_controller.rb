class LocationsController < ApplicationController

  def index 
    @locations = current_user.locations.all
  end 

  def new 
    @location = current_user.locations.build
  end 
  
end
