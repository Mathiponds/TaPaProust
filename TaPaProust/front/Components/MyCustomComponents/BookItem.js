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
  _getOpacity(){
    if(this.props.book.sold){
      return (
        <View style = {styles.book_sold}>
          <Image style = {styles.vendu}
          source={require('../../Images/vendu.png')}/>
        </View>
      )
    }
  }
  _getImage(){
    if(this.props.book.photos.length !== 0){
      return(
        <Image style = {styles.image} source = {API.getImageJpg(this.props.book.photos[0])}></Image>
      )
    }else{
      return (
        <Image style = {styles.image}></Image>
      )
    }
  }
  render(){
    const book = this.props.book
    return (
      <TouchableOpacity
       style={styles.main_container}
       onPress={() => this.props.displayDetailForBook(book)}>
       {this._getOpacity()}
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
    flex :1,
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
  },
  book_sold : {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : 'white',
    zIndex : 1000,
    opacity : 0.7
  },
  vendu : {
    height : 150,
    resizeMode : 'center',
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesBook: state.toggleFavorite.favoritesBook
  }
}
export default connect(mapStateToProps)(BookItem)
