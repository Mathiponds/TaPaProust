import React from 'react'
import {View, Text, StyleSheet, TextInput, ActivityIndicator} from 'react-native'
import * as Font from 'expo-font'

import MyTextInput from './MyTextInput'
import MyButton from './MyButton'
import {inputs} from '../Helpers/global.js'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.userMail = ""
    this.password = ""

    this._login = this._login.bind(this)
    this._register = this._register.bind(this)
    this._onChangedInput = this._onChangedInput.bind(this)

    this.state = {
      assetsLoaded: false,
    };
  }

  async componentDidMount() {
        await Font.loadAsync({
            'lobster-regular': require('../assets/fonts/Lobster-Regular.ttf')
        });
        await Font.loadAsync({
            'dancing-bold' : require('../assets/fonts/DancingScript-Bold.ttf')
        });
        await Font.loadAsync({
            'dancing-medium' : require('../assets/fonts/DancingScript-Medium.ttf')
        });
        await Font.loadAsync({
            'dancing-regular' : require('../assets/fonts/DancingScript-Regular.ttf')
        });
        await Font.loadAsync({
            'dancing-semibold' : require('../assets/fonts/DancingScript-SemiBold.ttf')
        });
        this.props.navigation.setOptions({headerShown: true,headerTitleStyle : {
          fontFamily : 'lobster-regular', fontSize : 30}})
        this.setState({ assetsLoaded: true });
    }

  _onChangedInput(text, input){
    switch(input){
      case inputs.USER_MAIL :
        this.userMail = text
        break;
      case inputs.PASSWORD :
        this.password = text
        break;
    }
  }

  _login(){
    this.props.navigation.replace('Home')
  }

  _register(){
    this.props.navigation.navigate('Inscription')
  }

  _loginItemBox(){
    return (
      <View style = { styles.login_item_container}>
        <MyTextInput
          title = {'Mail'} placeholder = {'Mail'} input = {inputs.MAIL}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          />
        <MyTextInput
          title = {'Mot de passe '} placeholder = {'Mot de passe'} input = {inputs.PASSWORD}
          secureTextEntry = {true} onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          />
        <MyButton
          onPress = {this._login}
          title = {'Login'}/>
        <MyButton
          onPress = {this._register}
          title = {'Créer un compte'}
          reverse = {true}/>
      </View>
    )
  }
  _displayLoading() {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  render(){
    if(this.state.assetsLoaded) {
      return (
        <View style = {styles.main_container}>
          <View style = { styles.title_box}>
            <Text style = {styles.title}>
              TaPaProust
            </Text>
          </View>
          {this._loginItemBox()}
        </View>
      )
    }else {
      return this._displayLoading()
    }
  }
}

const styles = StyleSheet.create({
  login_item_container : {
    flex : 5,
    margin : 10
  },
  main_container : {
    margin : 20,
    flex : 1
  },
  title_box : {
    height : 70,
    alignItems : 'center',
    justifyContent : 'center',
    marginBottom :40
  },
  title : {
    fontSize : 55,
    fontFamily : 'lobster-regular',
  }
})

export default Login
