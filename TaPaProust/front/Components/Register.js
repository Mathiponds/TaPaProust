import React from 'react'
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native'

import MyTextInput from './MyTextInput'
import MyButton from './MyButton'
import {inputs} from '../Helpers/global.js'

class Register extends React.Component{
  constructor(props){
    super(props)
    this.userMail = "@edu.ge.ch"
    this.password = ""
    this.passwordBis = ""
    this.phone = ""

    this.firstTime = true
    this.state = {
      isMailEmpty : true,
      isMailNotEdu : true,
      isPWEmpty : true,
      isPW2Empty : true,
      arePWNotSame : false,
      isPhoneEmpty : true,
      isPhoneNotNumeric :true
    }
    this._register = this._register.bind(this)
    this._onChangedInput = this._onChangedInput.bind(this)
  }

  componentDidMount(){
    this.props.navigation.setOptions({headerShown: true,headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  _onChangedInput(text, input){
    switch(input){
      case inputs.USER_MAIL :
        this.userMail = text
        break;
      case inputs.PASSWORD :
        this.password = text
        this.setState({arePWNotSame : this.password !== this.passwordBis})
        break;
      case inputs.PASSWORD_BIS :
        this.passwordBis = text
        this.setState({arePWNotSame : this.password !== this.passwordBis})
        break;
      case inputs.PHONE :
        this.phone = text
        break;
    }
  }
  _isInputValid(){
      this.setState({
        isMailEmpty : this.userMail.startsWith('@'),
        isMailNotEdu : !this.userMail.endsWith("@edu.ge.ch"),
        isPWEmpty : this.password === "",
        isPW2Empty : this.passwordBis === "",
        arePWNotSame : this.password !== this.passwordBis,
        isPhoneEmpty : this.phone === "",
        isPhoneNotNumeric : ! /^-?\d+$/.test(this.phone)
      })
      return this.userMail === "" || this.password === "" || this.passwordBis === "" ||
      this.password !== this.passwordBis||
        this.phone === "" || !this.userMail.endsWith("@edu.ge.ch") || !/^-?\d+$/.test(this.phone)
  }
  _register(){
      this.firstTime = false
      if(!this._isInputValid()){
        this.props.navigation.navigate('Login')
      }
  }

  _registerItemBox(){
    return (
      <ScrollView style = { styles.login_item_container}>
        <MyTextInput
          title = {'Mail'} defaultValue = {'@edu.ge.ch'} input = {inputs.USER_MAIL}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          precision ={'Votre mail doit être le mail edu finissant par @edu.ge.ch'}
          emptyInput = {!this.firstTime && (this.state.isMailEmpty || this.state.isMailNotEdu)}
          emptyInputMessage = {"Votre mail ne peut pas être vide et doit finir par @edu.ge.ch"}
          />
        <MyTextInput
          title = {'Mot de passe '} placeholder = {'Mot de passe'} input = {inputs.PASSWORD}
          secureTextEntry = {true} onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          emptyInput = {!this.firstTime && this.state.isPWEmpty}
          emptyInputMessage = {"Votre mot de passe ne peut pas être vide"}
          />
        <MyTextInput
          title = {'Mot de passe'} placeholder = {'Mot de passe'} input = {inputs.PASSWORD_BIS}
          secureTextEntry = {true} onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          emptyInput = {this.state.arePWNotSame}
          emptyInputMessage = {"Votre mot de passe doit être identique au premier"}
          precision ={'Confirmation de votre mot de passe'}
          />
        <MyTextInput
          title = {'Téléphone'} placeholder = {'Téléphone'} input = {inputs.PHONE}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          precision ={'Le numéro de téléphone avec lequel vos potentiels acheteur pourront vous contacter'}
          emptyInput = {!this.firstTime && (this.state.isPhoneEmpty || this.state.isPhoneNotNumeric)}
          emptyInputMessage = {"Votre numéro de téléphone ne peut pas être vide et doit être numeric"}
          />
        <MyButton
          onPress = {() => this._register()}
          title = {'Créer votre compte'}/>
      </ScrollView>
    )
  }

  render(){
    return (
      <View style = {styles.main_container}>
        <View style = { styles.title_box}>
          <Text style = {styles.title}>
            TaPaProust
          </Text>
        </View>
        {this._registerItemBox()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    flex : 1,
    marginTop :20,
    marginBottom :20,
  },
  login_item_container : {
    flex : 5,
    padding : 10
  },
  title_box : {
    height : 70,
    alignItems : 'center',
    justifyContent : 'center',
  },
  title : {
    fontSize : 55,
    fontFamily : 'lobster-regular',
  }
})

export default Register
