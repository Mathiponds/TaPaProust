import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

class MyDropdownPicker extends React.Component{
  render(){
    return(
      <View style = {styles.picker_container}>
        <Text style = {styles.search_item_text}>
          {this.props.title}
        </Text>
        <DropDownPicker
          items={this.props.items}
          isVisible = {this.props.isVisible}
          onOpen = {()=>this.props.onOpen()}
          onClose = {()=>this.props.onClose()}
          defaultNull placeholder ={this.props.placeholder}
          labelStyle={styles.text_input}
          style = {styles.dropdownStyle}
          containerStyle={styles.dropdownPicker}
          onChangeItem={item => this.props.onChangedInput(item.label,this.props.input)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  search_item_text : {
    fontFamily : 'dancing-regular',
    fontSize : 35,
    paddingLeft : 10,
    marginBottom : 5
  },
  picker_container : {
    height : 110
  },
  dropdownPicker :{
    height : 40
  },
  dropdownStyle : {
      borderColor: '#000000',
      borderWidth: 1,
  },
  text_input : {
    fontSize : 20,
    fontFamily : 'dancing-regular',
  }
})

export default MyDropdownPicker
