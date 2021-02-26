import React from 'react'
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native'

import MyTextInput from '../MyCustomComponents/MyTextInput'
import MyButton from '../MyCustomComponents/MyButton'

import API from '../../API/BooksAPI'

import {inputs} from '../../Helpers/global.js'

class Register extends React.Component{
  constructor(props){
    super(props)
    this.userMail = ""
    this.password = ""
    this.passwordBis = ""

    this.firstTime = true
    this.state = {
      mailMess : "",
      pwMess : "",
      pwMess : "",
      phoneMess : "",
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

  _register(){
      this.firstTime = false
      API.register(this.userMail, this.password, this.passwordBis, this.phone)
      .then(response => {
        console.log(response.data)
        if(response.status === 200){
          this.props.navigation.navigate('Login')
        }else{
          this.setState({
            ...this.state,
            mailMess : response.data[0],
            pwMess : response.data[1],
            pwBisMess : response.data[2],
            phoneMess : response.data[3],
          })
        }
      })
      .catch(error => console.log(error))
  }

  _registerItemBox(){
    console.log(this.state)
    return (
      <ScrollView style = { styles.login_item_container}>
        <MyTextInput
          title = {'Mail'} placeholder = {'prenom.nom@edu.ge.ch'} input = {inputs.USER_MAIL}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          precision ={'Votre mail doit être le mail edu finissant par @edu.ge.ch'}
          errorMessage = {!this.firstTime && this.state.mailMess}
          />
        <MyTextInput
          title = {'Mot de passe '} placeholder = {'Mot de passe'} input = {inputs.PASSWORD}
          secureTextEntry = {true} onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          errorMessage = {!this.firstTime && this.state.pwMess}
          />
        <MyTextInput
          title = {'Mot de passe'} placeholder = {'Mot de passe'} input = {inputs.PASSWORD_BIS}
          secureTextEntry = {true} onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          precision ={'Confirmation de votre mot de passe'}
          errorMessage = {!this.firstTime && this.state.pwBisMess}
          />
        <MyTextInput
          title = {'Téléphone'} placeholder = {'+41770001122'} input = {inputs.PHONE}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          precision ={'Le numéro de téléphone avec lequel vos potentiels acheteur pourront vous contacter'}
          errorMessage = {!this.firstTime && this.state.phoneMess}
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
