import React from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'

import {getBooks} from '../API/BooksAPI'


class Test extends React.Component{
  constructor(props){
    super(props)
    this.nombre = 2
  }
  _getBooks() {
    const url = 'localhost:8080'
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.nombre = data.nombre
      })
      .catch((error) => console.error(error))
  }

  render(){
    console.log(this._getBooks())
    return(
      <View>{this._getBooks()}</View>
    )
  }

}
export default Test
