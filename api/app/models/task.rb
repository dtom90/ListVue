class Task < ApplicationRecord
  belongs_to :list
  before_create :set_order
  attr_accessor :add_to_bottom
  
  private
  
  def set_order
    if add_to_bottom == true
      max_order = self.list.tasks.maximum('order')
      if max_order
        self.order = max_order + 1
      else
        self.order = 0
      end
    else
      self.order = 0
      list.tasks.update_all(' "order" = "order" + 1')
    end
  end
end
