import React from 'react'
import {ScrollView, StyleSheet, View, Text} from 'react-native'

import MyButton from '../MyCustomComponents/MyButton'
import MyTextInput from '../MyCustomComponents/MyTextInput'

import {inputs} from '../../Helpers/global.js'
import API from '../../API/BooksAPI'

class Profil extends React.Component{
  constructor(props){
    super(props)
    this.name = ''
    this.phone = ''
    this.mail = ''

    this._onChangedInput = this._onChangedInput.bind(this)
    this._modifyPW = this._modifyPW.bind(this)
    this._modifyNumber = this._modifyNumber.bind(this)
    this._logout = this._logout.bind(this)
  }

  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  _onChangedInput(text, input){
    switch(input){
      case inputs.NAME :
        this.name = text
        break;
      case inputs.MAIL :
        this.mail = text
        break;
      case inputs.PHONE :
        this.phone = text
        break;
    }
  }

  _getUser(){
      return {
        mail : "mathdesponds@gmail.com",
        name : "Mathieu",
        phone : '0774834486'
      }
  }

  _modifyNumber(){

  }

  _modifyPW(){
  }

  _logout(){
    API.logout()
    .then(response => this.props.navigation.replace("Login"))
    .catch((error) => console.log(error))
  }

  _sendPW(){
    //// TODO:
    const text = "Votre nouveau mot de passe à été envoyé à : "+this._getUser().mail
    Alert.alert(
      "Envoi de mail",
      text,
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );
  }

  render(){
    const user = this._getUser()
    return(
      <ScrollView style = {styles.main_container}>
        <View style = { styles.search_item_container}>
          <Text style = {styles.text}>
            <Text style = {styles.entry_text}>Mon nom:   </Text>
          {user.name}</Text>
          <Text style = {styles.text}>
            <Text style = {styles.entry_text}>Mon mail:   </Text>
          {user.mail}</Text>
          <Text style = {styles.text}>
            <Text style = {styles.entry_text}>Mon téléphone:   </Text>
          {user.phone}</Text>
          <MyButton longText = {true} onPress = {this._modifyNumber} title = {'Modifier mon numéro'}/>
          <MyButton longText = {true} onPress = {this._modifyPW} title = {'Modifier mon mot de passe'}/>
          <MyButton longText = {true} onPress = {this._sendPW} title = {'J\'ai oublié mon mot de passe'}/>
          <MyButton longText = {true} onPress = {this._logout} title = {'Log out'}/>

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    flex : 1
  },
  search_item_container : {
    margin : 10
  },
  entry_text : {
    fontFamily : 'LobsterTwo-Italic'
  },
  text : {
    fontFamily : 'dancing-regular',
    fontSize : 25
  }
})

export default Profil
