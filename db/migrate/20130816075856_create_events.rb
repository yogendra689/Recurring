class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :description
      t.datetime :startdate
      t.datetime :enddate
      t.text :schedule

      t.timestamps
    end
  end
end
