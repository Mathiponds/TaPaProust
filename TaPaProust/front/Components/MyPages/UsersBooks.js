import React from 'react'
import {View, StyleSheet} from 'react-native'

import BookList from '../MyCustomComponents/BookList'
import MyActivityIndicator from '../MyCustomComponents/MyActivityIndicator'
import books from '../../Helpers/books'
import {screens} from '../../Helpers/global'
import {connect} from 'react-redux'

class UsersBooks extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      isLoading : false,
      data : {}
    }
  }
  componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }


  _displayDetailForBook = (book) => {
    this.props.navigation.navigate('Détails du livre', { book : book, lastScreen : screens.USERS_BOOK})
  }

  render(){
    return(
      <View style={styles.main_container}>
        <BookList
          books = {this.props.myBooks}
          displayDetailForBook = {this._displayDetailForBook}/>
          <MyActivityIndicator condition = {this.state.isLoading}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
})

const mapStateToProps = (state) => {
  return {
    myBooks: state.toggleMyBooks.myBooks
  }
}
export default connect(mapStateToProps)(UsersBooks)
