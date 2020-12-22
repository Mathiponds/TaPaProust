import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Picker, Image} from 'react-native'
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
    this.price = this.addBook ? "" : this.props.route.params.price
    this.bookState = this.addBook ? "" : this.props.route.params.bookState
    this.language = this.addBook ? "" : this.props.route.params.language

    this.firstTime = true

    this.state = {
      isViP1 : false,
      isViP2 : false,
      isTitleEmpty : true,
      isAuthorEmpty : true,
      isEditionEmpty : true,
      isLanguageEmpty : true,
      isBookStateEmpty : true,
      isPriceEmpty : true,
      photos : []
    }

    this._onChangedInput = this._onChangedInput.bind(this)
    this._verifyBook = this._verifyBook.bind(this)
    this._changePickerVisibility = this._changePickerVisibility.bind(this)
  }

  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  componentDidUpdate() {
      const {params} = this.props.route;
      if (params) {
        const {photos} = params;
        if (photos) this.setState({photos});
        delete params.photos;
      }
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

  _changePickerVisibility(state){
    this.setState({
      isViP1 : false,
      isViP2 : false,
      ...state
    })
  }

  _isOneInputEmpty(){
    this.setState({
        isTitleEmpty : this.title === "",
        isAuthorEmpty : this.author === "",
        isEditionEmpty : this.edition === "",
        isLanguageEmpty : this.language === "",
        isBookStateEmpty : this.bookState === "",
        isPriceEmpty : this.price === ""
      })
      return this.title === "" || this.author === "" || this.edition === ""||
          this.language === "" || this.bookState === "" || this.price === ""
  }

  _verifyBook(){
    this.firstTime = false
    if(!this._isOneInputEmpty()){
      this.props.navigation.navigate('Vérification', {title :this.title,
        author : this.author, edition : this.edition, language : this.language,
        price : this.price, bookState : this.bookState, modify : this.addBook})
      }
  }

  _getMyTextInput(titre, placeholder, defaultValue, input, isEmpty, emptyMessage){
    return(
    <MyTextInput  title = {titre}
      placeholder = {this.addBook ? placeholder : null}
      defaultValue = {this.addBook ? null : ""+defaultValue}
      input = {input} onChangedInput = {this._onChangedInput}
      emptyInput = {!this.firstTime && isEmpty} emptyInputMessage = {emptyMessage}
      modify = {!this.addBook} onFocus={()=>this._changePickerVisibility({})}/>)
  }

  _getAllMyDropDownPickers(){
    return(
      <View>
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
        isVisible = {this.state.isViP1}
        onOpen={() => this._changePickerVisibility({
            isViP1: true
        })}
        onClose={() => this._changePickerVisibility({})}
        emptyInput = { !this.firstTime && this.state.isLanguageEmpty} emptyInputMessage = {"une langue"}
        defaultNull placeholder = {this.addBook ? "Choisir une langue" : null}
        input = {inputs.LANGUAGE} onChangedInput = {this._onChangedInput}/>
      <MyDropdownPicker
        title = {'Etat'} items={[
              {label: 'Neuf', value: 'Neuf'},
              {label: 'En bon état', value: 'En bon état'},
              {label: 'Bien utilisé', value: 'Bien utilisé'}
          ]}
        isVisible = {this.state.isViP2}
        onOpen={() => this._changePickerVisibility({
            isViP2: true
        })}
        onClose={() => this._changePickerVisibility({
            isViP2: false
        })}
        defaultValue = {this.addBook ? null : this.bookState}
        emptyInput = { !this.firstTime && this.state.isBookStateEmpty} emptyInputMessage = {"un état"}
        defaultNull placeholder = {this.addBook ? "Choisir l'état du livre" : null}
        input = {inputs.STATE} onChangedInput = {this._onChangedInput}/>
        </View>
    )
  }

  _renderImage (item, i) {
    return (
      <Image
        style={styles.image}
        source={{ uri: item.uri }}
        key={i}
      />
    )
  }

  render(){
    return (
      <ScrollView style = {styles.main_container}>
        <View style = { styles.search_item_container}>
          {this._getMyTextInput('Titre', 'Titre', this.addBook ? null : ""+this.props.route.params.title,
            inputs.TITLE, this.state.isTitleEmpty, "un titre")}
          {this._getMyTextInput('Auteur', 'Auteur', this.addBook ? null : ""+this.props.route.params.author,
            inputs.AUTHOR, this.state.isAuthorEmpty, "un auteur")}
          {this._getMyTextInput('Edition', 'Edition', this.addBook ? null : ""+this.props.route.params.edition,
            inputs.EDITION, this.state.isEditionEmpty, "une edition")}
          {this._getAllMyDropDownPickers()}
          <MyTextInput  title = {'Prix (en frs)'}
            placeholder = {this.addBook ? 'Prix' : ""+this.props.route.params.price}
            defaultValue = {this.addBook ? null : ""+this.props.route.params.price}
            input = {inputs.PRICE} onChangedInput = {this._onChangedInput}
            emptyInput = { !this.firstTime && this.state.isPriceEmpty} emptyInputMessage = {"un prix"}
            modify = {!this.addBook} onFocus={()=>this._changePickerVisibility({})}
            keyboardType = 'numeric'/>

          <MyButton onPress = {()=>this.props.navigation.navigate('ImageBrowser')} title = {this.addBook ? 'Ajouter photo' : 'Modifier photo'}/>
          <ScrollView horizontal = {true}>
            {this.state.photos.map((item, i) => this._renderImage(item, i))}
          </ScrollView>
          <MyButton onPress = {()=>this._verifyBook()} title = {this.addBook ? 'Ajouter ce livre' : 'Modifier le livre'}/>
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
  },
  image : {
    marginLeft : 2,
    marginRight : 2,
    height: 120,
    width: 90
  }
})

export default AddBook
