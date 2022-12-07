import React, {useState, useEffect} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import ExplorePost from './ExplorePost';
import { auth, db } from '../firebase/config'
import { onValue, set, ref, remove } from "firebase/database";
import mountain from "../assets/mountain.jpg";
export default function ExploreList({posts}) {

  let [explorePosts, setExplorePosts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        var st = `/`;        
        // read
        onValue(ref(db, st), (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            setExplorePosts([]);
            const keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              const keys2 = Object.keys(data[key].goals.Personal);
              let goals = data[key].goals.Personal;
              for (let j = 0; j < keys2.length; j++) {
                let postName = keys2[j];
                goals[postName].posts.forEach((update) => {
                  setExplorePosts((oldArray) => [...oldArray, update]);
                });
              }
            }
          }
        });
      }
    });
  }, [0]);

    return (
        <View style={styles.container}>
          <FlatList style={styles.list}
            data={explorePosts}
            keyExtractor= {(item) => {
              return item;
            }}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator}/>
              )
            }}
            renderItem={(post) => {
              const item = post.item;
              return <ExplorePost item={item} num={mountain}/>
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