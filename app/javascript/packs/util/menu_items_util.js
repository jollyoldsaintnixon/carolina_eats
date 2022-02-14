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