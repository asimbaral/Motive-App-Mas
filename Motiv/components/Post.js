import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Post = ({post, name, navigation}) => {

  return(
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Update', {
              title: name,
              post: post
            })}>
          <View style={{alignItems:"center",flex:1}}>
          <Text style={{ fontSize: 36} }>{name}</Text>
          
          </View>
        </TouchableOpacity>
  )
}

export default Post;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:60
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  }
});