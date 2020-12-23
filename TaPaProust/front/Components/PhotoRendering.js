import React from 'react'
import {ScrollView, Image, View, StyleSheet, Text} from 'react-native'

import MyButton from './MyButton'
import  Icon from 'react-native-vector-icons/FontAwesome';

class PhotoRendering extends React.Component {
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
    return(
      <View style = {{marginBottom : 10}}>
        <View flexDirection = {'row'} style = {{flex: 1, marginRight: 15}}>
          <Text style = {styles.search_item_text}>Photos</Text>
          <View style = {{flex :1, justifyContent : 'center', alignItems : 'flex-end'}}>
            <Icon.Button
              name="plus"
              backgroundColor="#000000"
              size ={25}
              onPress={()=>this.props.navigation()}
            >
            </Icon.Button>
          </View>
        </View>
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
    fontFamily : 'dancing-regular',
    fontSize : 35,
    paddingLeft : 10,
    marginBottom : 5
  }
})
export default PhotoRendering
