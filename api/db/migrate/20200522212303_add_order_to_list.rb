class AddOrderToList < ActiveRecord::Migration[6.0]
  def change
    add_column :lists, :order, :integer, default: 0, null: false
  end
end
