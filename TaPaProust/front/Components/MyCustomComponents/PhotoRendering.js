import React from 'react'
import {ScrollView, Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native'

import MyButton from './MyButton'
import Icon from 'react-native-vector-icons/FontAwesome';

import {maxPhotos} from '../../Helpers/global'

class PhotoRendering extends React.Component {
  _ifDeletion(i){
    if(this.props.withDelete){
      return(<TouchableOpacity style = {styles.remove_image_button}
      onPress={() => {this.props.deletePhoto(i)}}>
        <Icon
          name="close"
          backgroundColor="#ff0000"
          color = '#ffffff'
          size ={25}
        ></Icon>
      </TouchableOpacity>)
    }
  }

  _renderImage (item, i) {
    return (
      <View
      key = {i}>
        <Image
          style={styles.image}
          source={{ uri: item.uri }}
        />
        {this._ifDeletion(i)}

      </View>
    )
  }

  _ifReturnButton(){
    if(this.props.withButton){
      return (
        <View flexDirection = {'row'} style = {{flex: 1, marginRight: 15}}>
          <Text style = {styles.search_item_text}>Photos <Text style = {{fontSize :25}}>(max {maxPhotos})</Text></Text>
          <View style = {{flex :1, justifyContent : 'center', alignItems : 'flex-end'}}>
            <Icon.Button
              name="plus"
              backgroundColor="#000000"
              size ={25}
              onPress={()=>this.props.navigation()}
            ></Icon.Button>
          </View>
        </View>
      )
    }
  }

  render(){
    return(
      <View style = {{marginBottom : 10}}>
        {this._ifReturnButton()}
        <ScrollView horizontal = {true}>
          {this.props.photos.map((item, i) => this._renderImage(item, i))}
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  image : {
    marginLeft : 2,
    marginRight : 2,
    height: 120,
    width: 90
  },
  search_item_text : {
    fontFamily : 'LobsterTwo-Italic',
    fontSize : 35,
    paddingLeft : 10,
    marginBottom : 5
  },
  remove_image_button : {
    position : 'absolute',
    justifyContent: 'center',
    alignItems : 'center',
    right : 2,
    top : 0,
    height : 30,
    width : 30,
    backgroundColor: '#FF0000'
  }
})
export default PhotoRendering
