import React from 'react'
import {View, Text, Image, StyleSheet, Button, TouchableOpacity, Linking} from 'react-native'

import MyButton from '../MyCustomComponents/MyButton'
import PhotoRendering from '../MyCustomComponents/PhotoRendering'

import {screens} from '../../Helpers/global'
import {connect} from 'react-redux'

class BookDetails extends React.Component{
  constructor(props){
    super(props)
    this.lastScreen = this.props.route.params.lastScreen
    this.book = this.props.route.params.book

    this._contactSeller = this._contactSeller.bind(this)
    this._modify = this._modify.bind(this)
  }
  async componentDidMount() {
    if(this.lastScreen === screens.RESULT_OF_SEARCH ||
        this.lastScreen === screens.FAVORITES){
      this.props.navigation.setOptions({headerTitleStyle : {
        fontFamily : 'lobster-regular', fontSize : 30}})
    }else{
      this.props.navigation.setOptions({title : 'Mon Livre', headerTitleStyle : {
        fontFamily : 'lobster-regular', fontSize : 30}})
    }
  }

  _contactSeller(){
    const whatsAppMsg = 'Message envoyé depuis *TaPaProust* \n' +
                    'Bonjour! \n Je serais intéressé par le livre _' +this.book.title+ '_ de _' +this.book.author+ '_.\n'+
                    'Est-il toujours disponible? Si oui, pourrions nous nous rencontrez pour l\'échange?'

    const mobileNumber = '41794351907'
    let url =
      'whatsapp://send?text=' +
       whatsAppMsg +
      '&phone=' + mobileNumber;
    Linking.openURL(url)
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });

  }
  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.book }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    var sourceImage = require('../../Images/coeur_vide.png')
    if (this.props.favoritesBook.findIndex(item => item.id === this.book.id) !== -1) {
      // book dans nos favoris
      sourceImage = require('../../Images/coeur_plein.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }

  _modify(){
    this.props.navigation.navigate('Modifier un livre',// Link à addBook
      {title :this.book.title, author : this.book.author, edition : this.book.edition,
        language : this.book.language, price : this.book.price, bookState : this.book.state,
        id : this.book.id})

  }


  _getButton(){
    if(this.lastScreen === screens.RESULT_OF_SEARCH ||
        this.lastScreen === screens.FAVORITES){
      return(
        <MyButton title = {'Contacter le vendeur'}
        onPress = {() => {this._contactSeller()}}/>)
    }else{
      return(
        <MyButton title = {'Modifier'}
        onPress = {() => {this._modify()}}/>)
    }
  }
  render(){
    return (
      <View style = {styles.main_container}>
        <View style = {styles.image_box}>
          <Image style = {styles.image}></Image>
        </View>
        <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
        </TouchableOpacity>
        <View style = {styles.text_box}>
          <View style = {styles.price_box}>
            <Text style = {styles.price}>{this.book.price} Frs</Text>
          </View>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Title: </Text>{this.book.title}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Author: </Text>{this.book.author}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Edition: </Text>{this.book.edition}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Etat: </Text>{this.book.state}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Langue: </Text>{this.book.language}</Text>
          {this._getButton()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    margin : 5,
    padding : 5,
  },
  image_box : {
    height : 180,
    marginBottom :10
  },
  image : {
    flex :1,
    backgroundColor : 'grey',
  },
  price_box:{
    alignItems : 'center',
    marginBottom :10
  },
  price : {
    fontSize : 24,
    alignItems : 'center',
    fontFamily : 'LobsterTwo-Italic'
  },
  button_box : {
    backgroundColor : 'black',
    height : 50,
    marginTop : 30,
    marginBottom : 10,
    marginLeft : 20,
    marginRight :20
  },
  button_text: {
    fontSize :35,
    textAlign : 'center',
    fontFamily : 'dancing-bold',
    color : '#ffffff'
  },
  text_box :{
    flexDirection : 'column'
  },
  entry_text : {
    fontFamily : 'LobsterTwo-Italic',
    fontSize : 24
  },
  text : {
    fontSize : 20,
    fontFamily : 'dancing-regular'
  },
  favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
  },
  favorite_image: {
    width: 40,
    height: 40
  }
})

//state ici est le state global
const mapStateToProps = (state) => {
  return {
    favoritesBook: state.favoritesBook
  }
}

export default connect(mapStateToProps)(BookDetails)
