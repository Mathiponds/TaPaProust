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
        placeholder = {this.props.placeholder}
        keyboardType = {this.props.keyboardType}
        onFocus = {()=> this.props.onFocus()}
        onChangeText = {(text) => this.props.onChangedInput(text, this.props.input)}
        >
      </TextInput>
    )
  }

  _getPrecision(){
    if(this.props.precision){
      return (
        <Text style = {styles.precision_text}>
          {this.props.precision}
        </Text>
      )
    }
  }

  _getEmptyMessage(){
    if(this.props.emptyInput){
      return(
        <Text style = {styles.empty_input_text}>
          {this.props.emptyInputMessage}
        </Text>
      )
    }
  }

  render(){
      return(
        <View style = {styles.search_item_box}>
          <Text style = {styles.search_item_text}>
            {this.props.title}
          </Text>
          {this._getPrecision()}
          {this._getTextInput()}
          {this._getEmptyMessage()}
        </View>
      )
  }
}

const styles = StyleSheet.create({
  search_item_box : {
    marginBottom :10
  },
  search_item_text : {
    fontFamily : 'dancing-regular',
    fontSize : 35,
    paddingLeft : 10
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
  },
  precision_text :{
    fontSize : 15,
    marginBottom : 5,
    paddingLeft : 5
  }
})

export default MyTextInput
