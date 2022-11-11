import React, {useState} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Update from './Update';

export default function UpdateList({posts}) {
    return (
        <View style={styles.container}>
          {/* <Text>{JSON.stringify(posts, null, 2)}</Text> */}
          <FlatList style={styles.list}
            data={posts}
            keyExtractor= {(item) => {
              return item.postID;
            }}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator}/>
              )
            }}
            renderItem={(post) => {
              const item = post.item;
              return <Update item={item} num={(Math.floor(Math.random()*5) % 5)}/>
            }}/>
        </View>
      )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:40,
    },
    list: {
      paddingHorizontal: 17,
      backgroundColor:"#E6E6E6",
    },
    separator: {
      marginTop: 10,
    }
  }); 