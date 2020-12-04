import React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'

class MyButton extends React.Component{

  render(){
    return (
      <TouchableOpacity
        style = { styles.button_box}
        onPress = {() => {this.props.onPress()}}>
        <Text style = {styles.button_text}>{this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button_box : {
    backgroundColor : 'black',
    height : 50,
    marginTop : 10,
    marginBottom : 10,
    marginLeft : 20,
    marginRight :20
  },
  button_text: {
    fontSize :35,
    textAlign : 'center',
    fontFamily : 'dancing-bold',
    color : '#ffffff'
  }
})

export default MyButton
