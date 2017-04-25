class LocationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_location, only: [:show, :edit, :update, :destroy]

  def index
    @locations = current_user.locations
    if !params[:location].blank?
      @locations = current_user.locations.search(params[:location])
    end
  end

  def new
    @location = current_user.locations.build
  end

  def create
    @location = Location.new(location_params.merge(user_id: current_user.id)) #instantiate a location associated with current_user, but unsaved
    if @location.save
      redirect_to location_path(@location)
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

  def update
    if @location.update(location_params)
      redirect_to location_path(@location)
    else
      render :edit #add field with errors here
    end
  end

  def destroy
    @location.delete
    flash[:notice] = "Successfully deleted location."
    redirect_to locations_path
  end

  def getAppointmentData
    respond_to do |f|
      f.json { render json: current_user.locations.find_by_id(params[:id]).appointments }
    end
  end


  private
  def set_location
    @location = current_user.locations.find_by(id: params[:id])
  end

  def location_params
    params.require(:location).permit(:name, :state, :city, :zip_code, :street_address)
  end

end
