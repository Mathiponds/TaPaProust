import React from 'react'
import {View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native'

class BookDetails extends React.Component{
  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  _contactSeller(book){

  }
  render(){
    const book = this.props.route.params.book
    return (
      <View style = {styles.main_container}>
        <View style = {styles.image_box}>
          <Image style = {styles.image}></Image>
        </View>
        <View style = {styles.text_box}>
          <View style = {styles.price_box}>
            <Text style = {styles.price}>{book.price} Frs</Text>
          </View>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Title: </Text>{book.title}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Author: </Text>{book.author}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Edition: </Text>{book.edition}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Etat: </Text>{book.state}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Vendu par: </Text>{book.sold_by}</Text>
          <TouchableOpacity
              style = {styles.button_box}
              onPress = {() =>{_contactSeller(book)}}>
            <Text style = {styles.button_text}>Contacter le vendeur</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    margin : 5,
    padding : 5,
  },
  image_box : {
    height : 180,
    marginBottom :10
  },
  image : {
    flex :1,
    backgroundColor : 'grey',
  },
  price_box:{
    alignItems : 'center',
    marginBottom :10
  },
  price : {
    fontSize : 20,
    alignItems : 'center',
    fontFamily : 'lobster-regular'
  },
  button_box : {
    backgroundColor : 'black',
    height : 50,
    marginTop : 30,
    marginBottom : 10,
    marginLeft : 20,
    marginRight :20
  },
  button_text: {
    fontSize :35,
    textAlign : 'center',
    fontFamily : 'dancing-bold',
    color : '#ffffff'
  },
  text_box :{
    flexDirection : 'column'
  },
  entry_text : {
    fontFamily : 'lobster-regular'
  },
  text : {
    fontSize : 20,
    fontFamily : 'dancing-regular'
  }
})
export default BookDetails
