import React from 'react'
import {View, Text, Image, StyleSheet, Button, TouchableOpacity, Linking} from 'react-native'

import MyButton from './MyButton'
import screens from '../Helpers/global'

class BookDetails extends React.Component{
  constructor(props){
    super(props)
    this.lastScreen = this.props.route.params.screen
    this.book = this.props.route.params.book

    this._contactSeller = this._contactSeller.bind(this)
    this._modify = this._modify.bind(this)
  }
  async componentDidMount() {
    if(this.lastScreen != screens.USERS_BOOKS){
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

  _modify(){
    this.props.navigation.navigate('Modifier un livre',
      {title :this.book.title, author : this.book.author, edition : this.book.edition,
        language : this.book.language, price : this.book.price, state : this.book.state,
        modify : false})

  }
  _getButton(){
    if(this.lastScreen != screens.USERS_BOOKS){
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
        <View style = {styles.text_box}>
          <View style = {styles.price_box}>
            <Text style = {styles.price}>{this.book.price} Frs</Text>
          </View>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Title: </Text>{this.book.title}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Author: </Text>{this.book.author}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Edition: </Text>{this.book.edition}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Etat: </Text>{this.book.state}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Vendu par: </Text>{this.book.sold_by}</Text>
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
    fontSize : 20,
    alignItems : 'center',
    fontFamily : 'lobster-regular'
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
    fontFamily : 'lobster-regular'
  },
  text : {
    fontSize : 20,
    fontFamily : 'dancing-regular'
  }
})
export default BookDetails
