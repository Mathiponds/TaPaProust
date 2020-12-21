import React from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'

import inputs from '../Helpers/global.js'
class MyTextInput extends React.Component{
  _getTextInput(){
    if(this.props.modify){
      return (
        <TextInput
          style = {styles.text_input}
          defaultValue = {""+this.props.placeholder}
          onFocus = {()=> this.props.onFocus()}
          onChangeText = {(text) => this.props.onChangedInput(text, this.props.input)}>
        </TextInput>
      )
    }else{
      return(
        <TextInput
          style = {styles.text_input}
          placeholder = {this.props.placeholder}
          onFocus = {()=> this.props.onFocus()}
          onChangeText = {(text) => this.props.onChangedInput(text, this.props.input)}>
        </TextInput>
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
})

export default MyTextInput
