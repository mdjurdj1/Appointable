class ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :edit, :update, :destroy]

  def index
    @contacts = current_user.contacts
  end

  def show
  end

  def edit
  end

  def update
  end 


  private
  def set_contact
    @contact = Contact.find_by(id: params[:id])
  end
end
