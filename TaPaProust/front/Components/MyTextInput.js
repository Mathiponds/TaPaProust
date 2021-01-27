import React from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'

import inputs from '../Helpers/global.js'
class MyTextInput extends React.Component{
  _getTextInput(){
    return (
      <TextInput
        secureTextEntry = {this.props.secureTextEntry}
        style = {[styles.text_input, this.props.emptyInput?styles.empty_input:{}]}
        defaultValue = {this.props.defaultValue}
        placeholder = {!this.props.secureTextEntry ? this.props.placeholder : ''}
        keyboardType = {this.props.keyboardType}
        onFocus = {()=> this.props.onFocus()}
        onChangeText = {(text) => this.props.onChangedInput(text, this.props.input)}
        >
      </TextInput>
    )
  }



  _getEmptyMessage(){
    if(this.props.emptyInput){
      return(
        <Text style = {styles.empty_input_text}>
          Sélectionner {this.props.emptyInputMessage} !
        </Text>
      )
    }
  }
  render(){
      return(
        <View style = { styles.search_item_box}>
          <Text style = {styles.search_item_text}>
            {this.props.title}
          </Text>
          {this._getTextInput()}
          {this._getEmptyMessage()}
        </View>
      )
  }
}

const styles = StyleSheet.create({
  search_item_box : {
    height : 110
  },
  search_item_text : {
    fontFamily : 'dancing-regular',
    fontSize : 35,
    paddingLeft : 10,
    marginBottom : 5
  },
  text_input : {
    height : 40,
    paddingLeft: 15,
    fontSize : 20,
    fontFamily : 'dancing-regular',
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor : '#ffffff'
  },
  empty_input : {
    borderColor : '#ff0000',
    borderWidth: 2
  },
  empty_input_text : {
    color : '#ff0000',
    paddingLeft : 5
  }
})

export default MyTextInput
