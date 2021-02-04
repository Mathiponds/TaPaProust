import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Picker, Image} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {inputs} from '../../Helpers/global.js'

import MyTextInput from '../MyCustomComponents/MyTextInput'
import MyDropdownPicker from '../MyCustomComponents/MyDropdownPicker'
import MyButton from '../MyCustomComponents/MyButton'
import PhotoRendering from '../MyCustomComponents/PhotoRendering'

class AddBook extends React.Component{
  constructor(props){
    super(props)
    //Sinon on vient de booksdetail
    this.addBook = this.props.route.name === "Ajouter un livre"
    //this.modify = !this.addBook

    this.id = this.addBook ? "" : this.props.route.params.id
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
      isStateEmpty : true,
      isPriceEmpty : true,
      photos : []
    }

    this._onChangedInput = this._onChangedInput.bind(this)
    this._verifyBook = this._verifyBook.bind(this)
    this._changePickerVisibility = this._changePickerVisibility.bind(this)
    this._deletePhoto = this._deletePhoto.bind(this)
  }

  componentDidMount() {
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
        this.state = text
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
        price : this.price, bookState : this.bookState, modify : !this.addBook,
        photos : this.state.photos, id : this.id})
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
        defaultValue = {this.addBook ? null : this.language}
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
        input = {inputs.BOOK_STATE} onChangedInput = {this._onChangedInput}/>
        </View>
    )
  }
  _deletePhoto(i) {
    this.state.photos.splice(i,1)
    this.setState({
      photos : this.state.photos
    })
  }
  /* For the rendering of the photos */
  _navigateToImageBrowser = () => {
    this.props.navigation.navigate('ImageBrowser', {photos : this.state.photos})
  }

  componentDidUpdate() {
      const {params} = this.props.route;
      if (params) {
        const {photos} = params;
        if (photos) this.setState({photos});
        delete params.photos;
      }
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
          <PhotoRendering
            photos = {this.state.photos}
            withButton = {true} navigation = {this._navigateToImageBrowser}
            withDelete = {true} deletePhoto = {(i) => this._deletePhoto(i)}/>
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
  }
})

export default AddBook
