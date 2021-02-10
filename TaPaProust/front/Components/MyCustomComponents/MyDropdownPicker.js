import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

class MyDropdownPicker extends React.Component{
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
      <View style = {styles.picker_container}>
        <Text style = {styles.search_item_text}>
          {this.props.title}
        </Text>
        <DropDownPicker
          items={this.props.items}
          isVisible = {this.props.isVisible}
          onOpen = {()=>this.props.onOpen()}
          onClose = {()=>this.props.onClose()}
          placeholder ={this.props.placeholder}
          defaultValue = {this.props.defaultValue}
          zIndex = {4000}
          labelStyle={styles.text_input}
          style = {[styles.dropdownStyle, this.props.emptyInput ? styles.dropdownStyle_error : {}]}
          dropDownMaxHeight = {125}
          containerStyle={styles.dropdownPicker}
          onChangeItem={item => this.props.onChangedInput(item.label,this.props.input)}
        />
        {this._getEmptyMessage()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  search_item_text : {
    fontFamily : 'LobsterTwo-Italic',
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
      borderRadius: 5
  },
  dropdownStyle_error : {
      borderColor: '#FF0000',
      borderWidth: 2
  },
  text_input : {
    fontSize : 20,
    fontFamily : 'dancing-regular',
  },
  empty_input_text : {
    color : '#ff0000',
    paddingLeft : 5
  }
})

export default MyDropdownPicker
