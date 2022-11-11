import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  Button
} from 'react-native';

export default function GoalStatus({ props }) {


  const dataa = {
    data: [
        {id:1,  name: "Completed",   image:"https://img.icons8.com/color/96/null/goal--v1.png", count:5},
        {id:2,  name: "In-Progress",    image:"https://img.icons8.com/color/96/null/in-progress--v1.png", count:2}
      ]
  }

    return (
      <View style={styles.container}>
        <FlatList 
        //   style={styles.contentList}
        //   columnWrapperStyle={styles.listContainer}
          data={dataa.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card}>
              <Image style={styles.image} source={{uri: item.image}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.count}>{item.count}</Text>
              </View>
            </TouchableOpacity>
          )}}/>
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#ebf0f7"
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 0,
    flexDirection:'row',
    borderRadius:50
  },

  name:{
    fontSize:28,
    flex:1,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold'
  },
  count:{
    fontSize:24,
    flex:1,
    alignSelf:'center',
    color:"#6666ff"
  }
}); 