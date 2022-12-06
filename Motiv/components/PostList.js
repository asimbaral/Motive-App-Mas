import { jsonEval } from '@firebase/util';
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, Pressable } from 'react-native';
import Post from './Post';
import { auth, db } from '../firebase/config';
import { onValue, set, ref, remove } from "firebase/database";

export default function PostList({props, navigation}) {
    const [goalsJson, setGoalsJson] = useState(props);
    const [goals, setGoals] = useState([""]);
    // const [goals, setGoals] = useState(Object.keys(goalsJson));

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          var st = `/${auth.currentUser.uid}`;
          
          // read
          onValue(ref(db, st), (snapshot) => {
            setGoals([]);
            const data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((item) => {
                const keys = Object.keys(item["Personal"]);

                for (let i = 0; i < keys.length; i++) {
                  const key = keys[i];
                  setGoals((oldArray) => [...oldArray, key]);
                }
                setGoalsJson(item["Personal"]);

                // setGoals((oldArray) => [...oldArray, {"id":uuid, "text":name}]);
              });
            }
          });
        }
      });
    }, []);

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={()=> navigation.navigate("New Goal", {"setGoals": setGoals, "setGoalsJson": setGoalsJson, "goalsJson": goalsJson})}>
                <Text style={styles.text}>New Goal</Text>
            </Pressable>
            <FlatList
            style={{flex:1}}
            data={goals}
            renderItem={({ item }) => <Post post={goalsJson[item]} name={item} navigation={navigation}/>}
            keyExtractor={item => item}
            />
      </View>
    );
}

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
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 20,
        borderRadius: 40,
        elevation: 3,
        backgroundColor: 'black',
        marginTop: 20,
        marginBottom: 20,
        width: "80%",
        alignSelf: 'center'
      },
      text: {
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
  });