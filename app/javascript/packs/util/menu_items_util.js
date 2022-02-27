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

export const fetchServeDates = (date) => {
    return $.ajax({
        method: 'GET',
        url: `/api/serve_dates/${date}`
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

export const postLikedItem = (item_name) => {
    return $.ajax({
        method: "POST",
        url: '/api/liked_menu_items',
        data: { item_name }
    })
}

export const deleteLikedItem = item_id => {
    return $.ajax({
        method: "DELETE",
        url: `/api/liked_menu_items/${item_id}`,
    })
}
  
// export const fetchGame = id => {
//     return $.ajax({
//       method: 'GET',
//       url: `/api/games/${id}`,
//     })
//   }

// export const fetchGames = () => {
//     return $.ajax({
//       method: 'GET',
//       url: '/api/games',
//     })
//   }
  
//   export const fetchPagesOfGames = (page) => {
     
//     return $.ajax({
//       method: 'GET',
//       url: '/api/games',
//       data: { page },
//     })
//   }
  
//   export const fetchNGames = (page) => {
     
//     return $.ajax({
//       method: 'GET',
//       url: '/api/games',
//       data: { page }
//       // url: '/api/games/ngames/',
//     })
//   }
  
//   export const getCount = () => {
//     return $.ajax({
//       method: 'GET',
//       url: `/api/count`
//     })
//   }
  
//   export const addGame = id => {
//     return $.ajax({
//       method: 'POST',
//       url: `/api/game_racks`,
//       data: {id}
//     })
//   }
  
//   export const deleteGame = id => {
//     return $.ajax({
//       method: 'DELETE',
//       url: `/api/game_racks/${id}`,
//       data: { id }
//     })
//   }
  
//   export const updateGameRating = comment => {
//     return $.ajax({
//       method: 'PATCH',
//       url: `/api/games/${comment.game_id}`,
//       data: { comment },
//     })
//   }