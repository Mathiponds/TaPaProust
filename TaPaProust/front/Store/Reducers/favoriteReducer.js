// Store/Reducers/favoriteReducer.js
const initialState = {favoritesBook : []}

import API from '../../API/BooksAPI'

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'INIT_FAVORITE' :
      nextState = {
        ...state,
        favoritesBook : action.value
      }
      return nextState || state
    break;
    case 'TOGGLE_FAVORITE':
      const favoriteBookIndex = state.favoritesBook.findIndex(item => item.id === action.value.id)
      if (favoriteBookIndex !== -1) {
        // Le book est déjà dans les favoris, on le supprime de la liste
        API.removeFromFav(action.value.id).catch(error => console.error(error))
        nextState = {
          ...state,
          favoritesBook: state.favoritesBook.filter( (item, index) => index !== favoriteBookIndex)
        }
      }
      else {
        // Le book n'est pas dans les books favoris, on l'ajoute à la liste
        API.addToFav(action.value.id).catch(error => console.error(error))
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
