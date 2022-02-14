require "test_helper"

class Api::MenuItemsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_menu_items_index_url
    assert_response :success
  end

  test "should get show" do
    get api_menu_items_show_url
    assert_response :success
  end

  test "should get liked" do
    get api_menu_items_liked_url
    assert_response :success
  end

  test "should get update" do
    get api_menu_items_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_menu_items_destroy_url
    assert_response :success
  end
end
