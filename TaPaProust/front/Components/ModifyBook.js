import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity,  ScrollView} from 'react-native'
import {inputs} from '../Helpers/global.js'

import MyTextInput from './MyTextInput'
import MyDropdownPicker from './MyDropdownPicker'
import MyButton from './MyButton'

class ModifyBook extends React.Component{
  constructor(props){
    super(props)
    this.title = this.props.route.params.title
    this.author = this.props.route.params.author
    this.edition = this.props.route.params.edition
    this.price = this.props.route.params.price
    this.bookState = this.props.route.params.bookState
    this.language = this.props.route.params.language

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
    console.log(this.language)
    this.props.navigation.navigate('Vérification', {title :this.title,
      author : this.author, edition : this.edition, language : this.language,
      price : this.price, state : this.bookState, modify : true})
  }

  render(){
      return (
        <ScrollView style = {styles.main_container}>
          <View style = { styles.search_item_container}>
            <MyTextInput  title = {'Titre'} placeholder = {this.props.route.params.title}
              input = {inputs.TITLE} onChangedInput = {this._onChangedInput}
              modify = {true}/>
            <MyTextInput  title = {'Auteur'} placeholder = {this.props.route.params.author}
              input = {inputs.AUTHOR} onChangedInput = {this._onChangedInput}
              modify = {true}/>
            <MyTextInput  title = {'Edition'} placeholder = {this.props.route.params.edition}
              input = {inputs.EDITION} onChangedInput = {this._onChangedInput}
              modify = {true}/>
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
              placeholder = {this.props.route.params.language}
              input = {inputs.LANGUAGE} onChangedInput = {this._onChangedInput}/>
            <MyDropdownPicker
              title = {'Etat'} items={[
                    {label: 'Neuf', value: 'Neuf'},
                    {label: 'En bon état', value: 'En bon état'},
                    {label: 'Bien utilisé', value: 'Bien utilisé'}
                ]}
              placeholder ={this.props.route.params.state}
              input = {inputs.STATE} onChangedInput = {this._onChangedInput}
              />
            <MyTextInput  title = {'Prix'} placeholder = {this.props.route.params.price}
              input = {inputs.PRICE} onChangedInput = {this._onChangedInput}
              modify = {true}/>
            <MyButton onPress = {this._verifyBook} title = {'Modifier le livre'}/>
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

export default ModifyBook
