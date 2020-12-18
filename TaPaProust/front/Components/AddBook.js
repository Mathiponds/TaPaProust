import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Picker} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {inputs} from '../Helpers/global.js'

import MyTextInput from './MyTextInput'
import MyButton from './MyButton'

class AddBook extends React.Component{
  constructor(props){
    super(props)
    this.title = ""
    this.author = ""
    this.edition = ""
    this.price = 0
    this.bookState = ""
    this.language = ""


    this._onChangedInput = this._onChangedInput.bind(this)
    this._verifyBook = this._verifyBook.bind(this)
  }

  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  _onChangedInput(text, input){
    switch(input){
      case inputs.TITLE :
        this.title = text
        break;
      case inputs.AUTHOR :
        this.author = text
        break;
      case inputs.EDITION :
        this.edition = text
        break;
      case inputs.PRICE :
        this.price = text
        break;
      default :
        console.log("error addbook")
    }
  }

  _verifyBook(){
    this.props.navigation.navigate('Vérification', {title :this.title,
      author : this.author, edition : this.edition, language : this.language,
      price : this.price, state : this.bookState, modify : false})
  }

  render(){
      return (
        <ScrollView style = {styles.main_container}>
          <View style = { styles.search_item_container}>
            <MyTextInput  title = {'Titre'} placeholder = {'Titre'}
              input = {inputs.TITLE} onChangedInput = {this._onChangedInput}
              modify = {false}/>
            <MyTextInput  title = {'Auteur'} placeholder = {'Auteur'}
              input = {inputs.AUTHOR} onChangedInput = {this._onChangedInput}
              modify = {false}/>
            <MyTextInput  title = {'Edition'} placeholder = {'Edition'}
              input = {inputs.EDITION} onChangedInput = {this._onChangedInput}
              modify = {false}/>
            <View style = {styles.picker_container}>
              <Text style = {styles.search_item_text}>
                {'Langue'}
              </Text>
              <DropDownPicker
                items={[
                    {label: 'Français', value: 'item1'},
                    {label: 'Anglais', value: 'Anglais'},
                    {label: 'Allemand', value: 'Allemand'},
                    {label: 'Italien', value: 'Italien'},
                    {label: 'Espagnol', value: 'Espagnol'},
                    {label: 'Latin', value: 'Latin'},
                    {label: 'Grec', value: 'Grec'}
                ]}
                placeholder ={"Choisir une langue"}
                defaultIndex={0}
                labelStyle={styles.text_input}
                style = {styles.dropdownStyle}
                containerStyle={styles.dropdownPicker}
                onChangeItem={item => {this.language = item.label}}
              />
            </View>
            <View style = {styles.picker_container}>
              <Text style = {styles.search_item_text}>
                {'Etat'}
              </Text>
              <DropDownPicker
                items={[
                    {label: 'Neuf', value: 'Neuf'},
                    {label: 'En bon état', value: 'En bon état'},
                    {label: 'Bien utilisé', value: 'Bien utilisé'}
                ]}
                placeholder ={"Choisir l'état du livre"}
                defaultIndex={0}
                labelStyle={styles.text_input}
                style = {styles.dropdownStyle}
                containerStyle={styles.dropdownPicker}
                onChangeItem={item => {this.bookState = item.label}}
              />
            </View>
            <MyTextInput  title = {'Prix'} placeholder = {'Prix'}
              input = {inputs.PRICE} onChangedInput = {this._onChangedInput}
              modify = {false}/>
            <MyButton onPress = {this._verifyBook} title = {'Ajouter ce livre'}/>
          </View>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    flex : 1,
    paddingBottom : 100
  },
  search_item_container : {
    margin : 10
  },
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

export default AddBook
