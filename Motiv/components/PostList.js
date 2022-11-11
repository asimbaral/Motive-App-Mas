import { jsonEval } from '@firebase/util';
import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, Button, Pressable } from 'react-native';
import Post from './Post';

export default function PostList({props, navigation}) {
    const [goalsJson, setGoalsJson] = useState(props);
    const [goals, setGoals] = useState(Object.keys(goalsJson));
    return (
        // Object.keys(props).map((item) => {
        //     return <Post post={props[item]} name={item} navigation={navigation} />
        // })
  

        <View style={styles.container}>
            {/* <Text>{JSON.stringify(goalsJson, null, 2)}</Text> */}
            <Pressable style={styles.button} onPress={()=> navigation.navigate("New Goal", {"setGoals": setGoals, "setGoalsJson": setGoalsJson, "goalsJson": goalsJson})}>
                <Text style={styles.text}>New Goal</Text>
            </Pressable>
            {/* <Text>{JSON.stringify(props, null, 2)}</Text> */}
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