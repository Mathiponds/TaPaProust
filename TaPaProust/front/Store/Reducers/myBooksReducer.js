const initialState = { myBooks : []}

import API from '../../API/BooksAPI'

function toggleMyBooks(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'INIT_MY_BOOKS' :
      nextState = {
        ...state,
        myBooks : action.value
      }
      return nextState || state
    break;
    case 'POST_BOOK' :
      nextState = {
        ...state,
        myBooks : [...state.myBooks, action.value.book]
      }
      return nextState || state
    break;
    case 'MODIFY_BOOK' :
      const myBookIndex = state.myBooks.findIndex(item => item.id === action.value.book.id)
      let nextMyBooks = [...state.myBooks]
      nextMyBooks[myBookIndex] = action.value.book
      nextState ={
        ...state,
        myBooks : nextMyBooks
      }
      return nextState || state
    break;
    default:
      return state
  }
}
export default toggleMyBooks
