class List < ApplicationRecord
  belongs_to :user
  before_create :set_order
  has_many :tasks, dependent: :destroy
  
  private
  
  def set_order
    max_order = self.user.lists.maximum('order')
    if max_order
      self.order = max_order + 1
    else
      self.order = 0
    end
  end
end
