class CreateWorkEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :work_events do |t|
      t.date :event_at, null: false
      t.integer :user_id, null: false
      t.datetime :start_at, null: false
      t.datetime :end_at

      t.timestamps

      t.index [:user_id, :event_at], unique: true
    end
  end
end
