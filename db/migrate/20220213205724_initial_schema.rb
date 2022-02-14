class InitialSchema < ActiveRecord::Migration[6.1]
    def change
      enable_extension "plpgsql"
      
      drop_table "liked_by_users"
      drop_table :serve_dates
      drop_table :menu_items 
      drop_table :users 
  
      create_table "liked_by_users", force: :cascade do |t|
        t.integer "user_id", null: false
        t.integer "menu_item_id", null: false
        t.index ["user_id", "menu_item_id"], name: "index_liked_by_users_on_user_id_and_menu_item_id", unique: true
      end
  
      create_table "menu_items", force: :cascade do |t|
        t.string "name", null: false
        t.string "category", null: false
        t.datetime "created_at", precision: 6, null: false
        t.datetime "updated_at", precision: 6, null: false
        t.index ["name", "category"], name: "index_menu_items_on_name_and_category", unique: true
      end
  
      create_table "serve_dates", force: :cascade do |t|
        t.datetime "start_time", null: false
        t.string "location", null: false
        t.integer "menu_item_id"
        t.datetime "created_at", precision: 6, null: false
        t.datetime "updated_at", precision: 6, null: false
        t.datetime "end_time", null: false
      end
  
      create_table "users", force: :cascade do |t|
        t.string "username", null: false
        t.string "email", null: false
        t.string "password_digest", null: false
        t.datetime "created_at", precision: 6, null: false
        t.datetime "updated_at", precision: 6, null: false
        t.string "session_token", null: false
        t.index ["email"], name: "index_users_on_email", unique: true
        t.index ["session_token"], name: "index_users_on_session_token", unique: true
      end
  
      add_foreign_key "serve_dates", "menu_items"
  end
end