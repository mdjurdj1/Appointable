module ApplicationHelper

  def body_class
    "welcome" if current_page?(root_path)
  end

end
