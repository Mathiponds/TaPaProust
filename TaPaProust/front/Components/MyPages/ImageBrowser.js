import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import {ImageBrowser} from 'expo-image-picker-multiple';
import  Icon from 'react-native-vector-icons/FontAwesome';

import {maxPhotos} from '../../Helpers/global'

export default class ImageBrowserScreen extends React.Component {
  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  _getHeaderLoader = () => (
    <ActivityIndicator style = {styles.loading} size='large' color={'#000000'}/>
  );

  imagesCallback = (callback) => {
    const { navigation } = this.props;
    this.props.navigation.setOptions({
      headerRight: () => this._getHeaderLoader()
    });

    callback.then(async (photos) => {
      const cPhotos = this.props.route.params.photos;
      for(let photo of photos) {
        const pPhoto = await this._processImageAsync(photo.uri);
        cPhotos.push({
          uri: pPhoto.uri,
          name: photo.filename,
          type: 'image/jpg',
          base64 : pPhoto.base64
        })
      }
      navigation.navigate(this.props.addBook? 'Ajouter un livre' : 'Modifier un livre', {photos: cPhotos});
    })
    .catch((e) => console.log(e));
  };

  async _processImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{resize: { width: 1000 }}],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG, base64 : true}
    );
    return file;
  };

  _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return(
      <View style = {{flex :1, justifyContent : 'center', alignItems : 'flex-end', marginRight : 10}}>
        <Icon.Button
          name="check"
          backgroundColor="#000000"
          size ={25}
          onPress={onSubmit}
        >
        </Icon.Button>
      </View>
    )
  }

  updateHandler = (count, onSubmit) => {
    this.props.navigation.setOptions({
      title: `${count} photo`+(count > 1 ? 's' : '')+' choisie'+(count > 1? 's' : ''),
      headerRight: () => this._renderDoneButton(count, onSubmit)
    });
  };

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  render() {
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

    return (
      <View style={[styles.flex, styles.container]}>
        <ImageBrowser
          max={maxPhotos-this.props.route.params.photos.length}
          onChange={this.updateHandler}
          callback={this.imagesCallback}
          renderSelectedComponent={this.renderSelectedComponent}
          emptyStayComponent={emptyStayComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    marginLeft : 5, marginRight : 5,
    marginBottom : 5,
    position: 'relative'
  },
  emptyStay:{
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  },
  done : {
    fontWeight: 'bold',
    marginRight : 20,
    fontSize : 20
  },
  loading : {
    marginRight : 20,
    width : 40,
    height : 40
  }
});
