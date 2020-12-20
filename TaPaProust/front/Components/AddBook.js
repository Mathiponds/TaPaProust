import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Picker} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {inputs} from '../Helpers/global.js'

import MyTextInput from './MyTextInput'
import MyDropdownPicker from './MyDropdownPicker'
import MyButton from './MyButton'

class AddBook extends React.Component{
  constructor(props){
    super(props)
    this.addBook = this.props.route.name === "Ajouter un livre"

    this.title = this.addBook ? "" : this.props.route.params.title
    this.author = this.addBook ? "" : this.props.route.params.author
    this.edition = this.addBook ? "" : this.props.route.params.edition
    this.price = this.addBook ? 0 : this.props.route.params.price
    this.bookState = this.addBook ? "" : this.props.route.params.bookState
    this.language = this.addBook ? "" : this.props.route.params.language



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
      case inputs.LANGUAGE :
        this.language = text
        break;
      case inputs.STATE :
        this.bookState = text
        break;
      default :
        console.log("error addbook")
    }
  }

  _verifyBook(){
    this.props.navigation.navigate('Vérification', {title :this.title,
      author : this.author, edition : this.edition, language : this.language,
      price : this.price, state : this.bookState, modify : this.addBook})
  }

  render(){
      return (
        <ScrollView style = {styles.main_container}>
          <View style = { styles.search_item_container}>
            <MyTextInput  title = {'Titre'}
              placeholder = {this.addBook ? 'Titre' : this.props.route.params.title}
              input = {inputs.TITLE} onChangedInput = {this._onChangedInput}
              modify = {!this.addBook}/>
            <MyTextInput  title = {'Auteur'}
              placeholder = {this.addBook ? 'Auteur' : this.props.route.params.author}
              input = {inputs.AUTHOR} onChangedInput = {this._onChangedInput}
              modify = {!this.addBook}/>
            <MyTextInput  title = {'Edition'}
              placeholder = {this.addBook ? 'Edition' : this.props.route.params.edition}
              input = {inputs.EDITION} onChangedInput = {this._onChangedInput}
              modify = {!this.addBook}/>
            <MyDropdownPicker
              title = {'Langue'} items = {[
                  {label: 'Français', value: 'Français'},
                  {label: 'Anglais', value: 'Anglais'},
                  {label: 'Allemand', value: 'Allemand'},
                  {label: 'Italien', value: 'Italien'},
                  {label: 'Espagnol', value: 'Espagnol'},
                  {label: 'Latin', value: 'Latin'},
                  {label: 'Grec', value: 'Grec'}
              ]}
              placeholder = {"Choisir une langue"}
              input = {inputs.LANGUAGE} onChangedInput = {this._onChangedInput}
              modify = {!this.addBook}/>
            <MyDropdownPicker
              title = {'Etat'} items={[
                    {label: 'Neuf', value: 'Neuf'},
                    {label: 'En bon état', value: 'En bon état'},
                    {label: 'Bien utilisé', value: 'Bien utilisé'}
                ]}
                defaultValue = {this.props.defaultValue}
              placeholder ={"Choisir l'état du livre"}
              input = {inputs.STATE} onChangedInput = {this._onChangedInput}
              modify = {!this.addBook}/>
            <MyTextInput  title = {'Prix'}
              placeholder = {this.addBook ? 'Prix' : this.props.route.params.price}
              input = {inputs.PRICE} onChangedInput = {this._onChangedInput}
              modify = {!this.addBook}/>
            <MyButton onPress = {this._verifyBook} title = {this.addBook ? 'Ajouter ce livre' : 'Modifier le livre'}/>
          </View>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    flex : 1
  },
  search_item_container : {
    margin : 10
  }
})

export default AddBook
