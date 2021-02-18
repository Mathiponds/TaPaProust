// Store/Reducers/favoriteReducer.js

const initialState = { favoritesBook: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteBookIndex = state.favoritesBook.findIndex(item => item.id === action.value.id)
      if (favoriteBookIndex !== -1) {
        // Le book est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesBook: state.favoritesBook.filter( (item, index) => index !== favoriteBookIndex)
        }
      }
      else {
        // Le book n'est pas dans les books favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesBook: [...state.favoritesBook, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite
