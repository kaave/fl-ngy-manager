class CreateRadios < ActiveRecord::Migration[5.0]
  def change
    create_table :radios do |t|
      t.string :name
      t.string :url
      t.text :memo

      t.timestamps
    end

    add_index :radios, :url, unique: true
  end
end
