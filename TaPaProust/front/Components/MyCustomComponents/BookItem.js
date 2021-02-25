import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import * as Font from 'expo-font'
import {connect} from 'react-redux'

class BookItem extends React.Component{
  _displayFavorite(){
    if(this.props.favoritesBook.findIndex(item => item.id === this.props.book.id) !== -1){
      return <Image
        style={styles.favorite_image}
        source={require('../../Images/coeur_plein.png')}
      />
    }
  }
  render(){
    const book = this.props.book
    return (
      <TouchableOpacity
       style={styles.main_container}
       onPress={() => this.props.displayDetailForBook(book)}>
        <View style = {styles.image_box}>
          <Image style = {styles.image}></Image>
          <Text style = {styles.price}>{book.price} frs</Text>
        </View>
        <View style = {styles.text_box}>
          {this._displayFavorite()}
          <Text style = {styles.text}><Text style = {styles.entry_text}>Title: </Text>{book.title}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Author: </Text>{book.author}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Édition: </Text>{book.edition}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>État: </Text>{book.state}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Langue: </Text>{book.language}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    borderWidth : 1,
    borderColor : 'black',
    flexDirection : 'row',
    margin : 5,
    padding : 5,
    height : 170
  },
  image_box : {
    flex :1,
  },
  image : {
    backgroundColor : 'grey',
    flex :1
  },
  price : {
    borderWidth : 1,
    borderColor : 'black',
    position : 'absolute',
    textAlign : 'right',
    paddingRight :3,
    right : 0,
    bottom : 0,
    width : 50,
    backgroundColor : 'white',
    fontFamily : 'LobsterTwo-Italic'
  },
  text_box :{
    flexDirection : 'column',
    marginLeft : 10,
    flex : 2
  },
  entry_text : {
    fontFamily : 'dancing-regular',
    fontSize : 15
  },
  text : {
    fontFamily : 'LobsterTwo-Italic',
    fontSize : 18,
  },
  favorite_image : {
    position : 'absolute',
    bottom : 0,
    right :0,
    height : 35,
    width : 35,
    marginRight: 5
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesBook: state.toggleFavorite.favoritesBook
  }
}
export default connect(mapStateToProps)(BookItem)
