class AddUserToLists < ActiveRecord::Migration[6.0]
  def change
    add_reference :lists, :user, foreign_key: true
    change_column_null :lists, :user_id, false
  end
end
