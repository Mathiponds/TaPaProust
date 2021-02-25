import React from 'react'
import {View, Text, StyleSheet, ScrollView, Alert, Image} from 'react-native'

import MyButton from '../MyCustomComponents/MyButton'
import PhotoRendering from '../MyCustomComponents/PhotoRendering'

import API from '../../API/BooksAPI'
import {connect} from 'react-redux'

class VerifyBook extends React.Component{
  constructor(props){
    super(props)
    this._confirmBook = this._confirmBook.bind(this)
    this.book = this.props.route.params.book
    this.modify = this.props.route.params.modify
  }
  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
    this.setState({ assetsLoaded: true });
  }

  _confirmBook(){
    // TODO: Send the book to the backend
    if(!this.modify){
      action = {
        type : 'POST_BOOK',
        value : {
          book : this.book
        }
      }
      this.props.dispatch(action)
    }else{
      action = {
        type : 'MODIFY_BOOK',
        value : {
          book : this.book
        }
      }
      this.props.dispatch(action)
    }

    const text = this.modify ?  "Votre livre a bien été modifié" :"Votre livre a bien été ajouté"
    Alert.alert(
      "Confirmation",
      text,
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );
    if(this.modify){
      this.props.navigation.replace('Mes livres')
    }else{
      this.props.navigation.replace('Ajouter un livre')
    }
  }

  render(){
      return (
        <ScrollView style = {styles.main_container}>
          <View style = {styles.header_box}>
            <Text style = {styles.header_text}>Veuillez vérifier les informations que vous venez de rentrer:</Text>
          </View>
          <View style = {styles.text_box}>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Title: </Text>{this.book.title}</Text>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Author: </Text>{this.book.author}</Text>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Edition: </Text>{this.book.edition}</Text>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Langue: </Text>{this.book.language}</Text>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Prix: </Text>{this.book.price}</Text>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Etat: </Text>{this.book.state}</Text>
            <Text style = {styles.entry_text}>Photos: </Text>
            <PhotoRendering withButton = {false} withDelete = {false}
              photos = {this.book.photos}/>
          </View>
          <MyButton onPress = {this._confirmBook} title = {'Confirmer'}/>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    flex : 1
  },
  header_box : {
    margin : 10,
  },
  header_text : {
    fontFamily : 'dancing-regular',
    fontSize : 30
  },
  text_box :{
    borderWidth : 4,
    borderColor : 'black',
    justifyContent : 'center',
    flexDirection : 'column',
    margin : 10,
    padding : 10
  },
  entry_text : {
    fontFamily : 'lobster-regular',
    fontSize : 25
  },
  text : {
    fontFamily : 'dancing-regular',
    fontSize : 25,
  },
  image : {
    marginLeft : 2,
    marginRight : 2,
    height: 120,
    width: 90
  }
})
const mapStateToProps = (state) => {
  return {
    myBooks: state.toggleMyBooks.myBooks
  }
}
export default connect(mapStateToProps)(VerifyBook)
