import React from 'react'
import {View,StyleSheet, ActivityIndicator} from 'react-native'

class MyActivityIndicator extends React.Component {
  render(){
    if(this.props.condition){
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
    }else{
      return <View></View>
    }
  }
}

const styles = StyleSheet.create({
  loading_container: {
    position: 'absolute',
    left: -20,
    right: -20,
    top: -20,
    bottom: -20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : 'white',
    opacity : 0.5
  },
})

export default MyActivityIndicator
