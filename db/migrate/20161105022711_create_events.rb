class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.datetime :event_at
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :events, :event_at, unique: true
  end
end
