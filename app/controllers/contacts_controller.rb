class ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :edit, :update, :destroy]

  def index
    @contacts = current_user.contacts
  end

  def new
    @contact = current_user.contacts.build
  end

  def create
    @contact = Contact.new(contact_params.merge(user_id: current_user.id)) #instantiate a contact associated with current_user, but unsaved
    if @contact.save
      redirect_to contact_path(@contact)
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

  def update
    if @contact.update(contact_params)
      redirect_to contact_path(@contact)
    else
      render :edit #add field with errors here
    end
  end

  def destroy
    @contact.delete
    flash[:notice] = "Successfully deleted contact."
    redirect_to contacts_path
  end


  private
  def set_contact
    @contact = Contact.find_by(id: params[:id])
  end

  def contact_params
    params.require(:contact).permit(:name, :email, :phone_number)
  end
end
