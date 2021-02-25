import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Picker,
   Image, Keyboard, TouchableWithoutFeedback} from 'react-native'
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
    this.book = this.addBook ? {
      title : "",
      author : "",
      edition : "",
      language : "",
      state : "",
      price : ""
    } : this.props.route.params.book

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

    this.myTextInput = {}

    this.focusNextTextInput = this.focusNextTextInput.bind(this)
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
        this.book.title = text
        break;
      case inputs.AUTHOR :
        this.book.author = text
        break;
      case inputs.EDITION :
        this.book.edition = text
        break;
      case inputs.PRICE :
        this.book.price = text
        break;
      case inputs.LANGUAGE :
        this.book.language = text
        break;
      case inputs.BOOK_STATE :
        this.book.state= text
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
        isTitleEmpty : this.book.title === "",
        isAuthorEmpty : this.book.author === "",
        isEditionEmpty : this.book.edition === "",
        isLanguageEmpty : this.book.language === "",
        isBookStateEmpty : this.book.state === "",
        isPriceEmpty : this.book.price === ""
      })
      return this.book.title === "" || this.book.author === "" || this.book.edition === ""||
          this.book.language === "" || this.book.state === "" || this.book.price === ""
  }


  _verifyBook(){
    console.log(this.book)
    this.firstTime = false
    //if(!this._isOneInputEmpty()){
      this.props.navigation.navigate('Vérification', {book : {...this.book, photos : this.state.photos}, modify : !this.addBook})
     //}
  }

  focusNextTextInput(id) {
   this.myTextInput[id].focus();
  }

  _getMyTextInput(titre, placeholder, defaultValue, input, isEmpty, emptyMessage, returnKeyType, myId, onSubmitEditing){
    return(
    <MyTextInput  title = {titre}
      placeholder = {this.addBook ? placeholder : null}
      defaultValue = {this.addBook ? null : ""+defaultValue}
      input = {input} onChangedInput = {this._onChangedInput}
      emptyInput = {!this.firstTime && isEmpty} emptyInputMessage = {emptyMessage}
      modify = {!this.addBook} onFocus={()=>this._changePickerVisibility({})}
      returnKeyType = {returnKeyType}
      onSubmitEditing = {onSubmitEditing}
      blurOnSubmit={false}
      ref={input => {this.myTextInput[myId] = input;}}
      />)
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
        onClose={() => this._changePickerVisibility({
            isViP2: this.addBook
        })}
        defaultValue = {this.addBook ? null : this.book.language}
        emptyInput = { !this.firstTime && this.state.isLanguageEmpty} emptyInputMessage = {"Veuillez sélectionner une langue."}
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
        onClose={() => this._changePickerVisibility({})}
        defaultValue = {this.addBook ? null : this.book.state}
        emptyInput = { !this.firstTime && this.state.isBookStateEmpty} emptyInputMessage = {"Veuillez sélectionner un état."}
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
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();
        this._changePickerVisibility({})
      }}>
        <ScrollView style = {styles.main_container}>
          <View style = { styles.search_item_container}>
            {this._getMyTextInput('Titre', 'Titre', this.addBook ? null : ""+this.book.title,
              inputs.TITLE, this.state.isTitleEmpty, "Veuillez sélectionner un titre.", "next", "one", () => this.focusNextTextInput("two"))}
            {this._getMyTextInput('Auteur', 'Auteur', this.addBook ? null : ""+this.book.author,
              inputs.AUTHOR, this.state.isAuthorEmpty, "Veuillez sélectionner un auteur.","next", "two", () => this.focusNextTextInput("three"))}
            {this._getMyTextInput('Edition', 'Edition', this.addBook ? null : ""+this.book.edition,
              inputs.EDITION, this.state.isEditionEmpty, "Veuillez sélectionner une edition.","next", "three", () => this.focusNextTextInput("four"))}
              <MyTextInput  title = {'Prix (en frs)'}
                placeholder = {this.addBook ? 'Prix' : ""+this.book.price}
                defaultValue = {this.addBook ? null : ""+this.book.price}
                input = {inputs.PRICE} onChangedInput = {this._onChangedInput}
                emptyInput = { !this.firstTime && this.state.isPriceEmpty} emptyInputMessage = {"Veuillez sélectionner un prix."}
                modify = {!this.addBook} onFocus={()=>this._changePickerVisibility({})}
                keyboardType = 'numeric'
                returnKeyType = {"next"}
                onEndEditing = {this.props.onEndEditing}
                onSubmitEditing = {() => {Keyboard.dismiss();this._changePickerVisibility({
                    isViP1: true
                })}}
                blurOnSubmit={false}
                ref={input => {this.myTextInput["four"] = input;}}/>
            {this._getAllMyDropDownPickers()}

            <PhotoRendering
              photos = {this.state.photos}
              withButton = {true} navigation = {this._navigateToImageBrowser}
              withDelete = {true} deletePhoto = {(i) => this._deletePhoto(i)}/>
            <MyButton onPress = {()=>this._verifyBook()} title = {this.addBook ? 'Ajouter ce livre' : 'Modifier le livre'}/>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
