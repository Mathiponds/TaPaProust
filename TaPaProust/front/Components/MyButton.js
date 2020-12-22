import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

class MyButton extends React.Component{

  render(){
    return (
      <View style = {{alignItems : 'center'}}>
        <TouchableOpacity
          style = {[styles.button_box, this.props.longText ? styles.button_box_long_text : {}]}
          onPress = {() => {this.props.onPress()}}>
          <Text style = {[styles.button_text, this.props.longText? styles.button_long_text: {}]}>{this.props.title}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button_box : {
    backgroundColor : 'black',
    height : 50,
    width : 300,
    marginTop : 5,
    marginBottom : 10,
  },
  button_box_long_text : {
    height : 35,
    marginTop : 5,
    marginBottom : 5,
  },
  button_text: {
    fontSize : 35,
    textAlign : 'center',
    justifyContent : 'center',
    fontFamily : 'dancing-bold',
    color : '#ffffff'
  },
  button_long_text: {
    fontSize : 25
  }
})

export default MyButton
