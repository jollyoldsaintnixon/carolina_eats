export const fetchMenuItems = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/menu_items'
    })
}

export const fetchMenuItem = id => {
    return $.ajax({
        method: 'GET',
        url: `/api/menu_items/${id}`
    })
}

export const fetchMenuItemNames = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/menu_item_names'
    })
}

export const fetchLikedMenuItems = () => {
    return $.ajax({
        method: "GET",
        url: '/api/liked_menu_items'
    })
}

export const postLikedItem = (item_id) => {
    return $.ajax({
        method: "POST",
        url: '/api/liked_menu_items',
        data: { item_id }
    })
}

export const deleteLikedItem = item_id => {
    return $.ajax({
        method: "DELETE",
        url: `/api/liked_menu_items/${item_id}`,
    })
}