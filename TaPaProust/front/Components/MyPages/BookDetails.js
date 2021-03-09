import React from 'react'
import {View, Text, Image, StyleSheet, Button, TouchableOpacity, Linking,ScrollView} from 'react-native'

import MyButton from '../MyCustomComponents/MyButton'
import PhotoRendering from '../MyCustomComponents/PhotoRendering'
import API from '../../API/BooksAPI'

import {screens} from '../../Helpers/global'
import {connect} from 'react-redux'

class BookDetails extends React.Component{
  constructor(props){
    super(props)
    this.lastScreen = this.props.route.params.lastScreen
    this.book = this.props.route.params.book

    this._contactSeller = this._contactSeller.bind(this)
    this._modify = this._modify.bind(this)
    this._sold = this._sold.bind(this)

    this.state = {
      sold : this.book.sold
    }
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
    API.getUserPhone(this.book.id).then(response => {
      const whatsAppMsg = 'Message envoyé depuis *TaPaProust* \n' +
                      'Bonjour! \n Je serais intéressé par le livre _' +this.book.title+ '_ de _' +this.book.author+ '_.\n'+
                      'Est-il toujours disponible? Si oui, pourrions nous nous rencontrez pour l\'échange?'

      const mobileNumber = response.data.substring(1)
      let url =
        'whatsapp://send?text=' +
         whatsAppMsg +
        '&phone=' + mobileNumber;
      Linking.openURL(url)
        .catch(() => {
          alert("Vous avez besoin d'avoir installé whatsapp");
        });
    }).catch(err => console.log(err))
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
      {book : this.book})

  }
  _getOpacity(){
    if(this.state.sold){
      return (
        <View style = {styles.book_sold}>
          <Image style = {styles.vendu}
          source={require('../../Images/vendu.png')}/>
        </View>
      )
    }
  }

  _sold() {
    if(this.book.sold){
      API.bookUnsold(this.book.id, this.book.token).then(response => {
          action = {
            type : 'MODIFY_BOOK',
            value : {
              book : response.data
            }
          }
          this.props.dispatch(action)
          this.setState({
            sold : false
          })
          this.book = response.data
      }).catch(err => console.log(err))
    }else{
      API.bookSold(this.book.id, this.book.token).then(response => {
          action = {
            type : 'MODIFY_BOOK',
            value : {
              book : response.data
            }
          }
          this.props.dispatch(action)
          this.setState({
            sold : true
          })
          this.book = response.data
      }).catch(err => console.log(err))
    }
  }


  _getButton(){
    if(this.lastScreen === screens.RESULT_OF_SEARCH ||
        this.lastScreen === screens.FAVORITES){
      return(
        <MyButton title = {'Contacter le vendeur'}
        onPress = {() => {this._contactSeller()}}/>)
    }else{
      return(
        <View>
          <MyButton title = {'Modifier'}
          onPress = {() => {this._modify()}}/>
          <MyButton longText = {true}
          title = {this.state.sold ? 'Marquez ce livre comme invendu':'Marquer ce livre comme vendu'}
          onPress = {() => {this._sold()}}/>
        </View>
      )
    }
  }

  _getImages(){
    if(this.book.photos.length !== 0){
      return (
        <View style = {styles.image_box}>
          {this._getOpacity()}
          <Image style = {styles.image2}
              source = {{uri :API.getImage('resources/Images/322_169726.jpg')}}/>
        </View>)
    }else{
      return (
      <View style = {styles.image_box}>
        {this._getOpacity()}
        <Image style = {styles.image}></Image>
      </View>)
    }
  }

  render(){
    return (
      <ScrollView style = {styles.main_container}>
        <View style = {styles.image_box}>
            {this._getOpacity()}
            {this._getImages()}
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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    margin : 5,
    padding : 5,
  },
  image_box : {
    alignItems : "center",
    height : 300,
    marginBottom :10
  },
  image : {
    flex :1,
    backgroundColor : 'grey'
  },
  image2 : {
    resizeMode : 'contain',
    height : 270,
    width : 200,
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

//state ici est le state global
const mapStateToProps = (state) => {
  return {
    favoritesBook: state.toggleFavorite.favoritesBook
  }
}

export default connect(mapStateToProps)(BookDetails)
