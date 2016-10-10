class CreateDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :devices do |t|
      t.string :name
      t.integer :type_code
      t.string :key
      t.string :source

      t.timestamps
    end

    add_index :devices, :key, unique: true
    add_index :devices, :source, unique: true
  end
end
