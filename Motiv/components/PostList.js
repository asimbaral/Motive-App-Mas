/*import { jsonEval } from '@firebase/util';
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, Pressable } from 'react-native';
import Post from './Post';
import { auth, db } from '../firebase/config';
import { onValue, set, ref, remove } from "firebase/database";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  });*/











import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, Pressable, Image } from 'react-native';
import Post from './Post';
import { auth, db } from '../firebase/config';
import { onValue, set, ref, remove, connectDatabaseEmulator } from "firebase/database";
import { Asset } from 'expo-asset';
import CanvasImage from './Canvas';
import * as FileSystem from 'expo-file-system';
// import fetch_blob from 'react-native-fetch-blob';
// const imageUri = Image.resolveAssetSource(imagePng).uri 
const uriImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABLKADAAQAAAABAAAAlgAAAABJS0H3AAAEiklEQVR4Ae3UsQ2AAAwDQWByNgcWcP9ClzaNdZZ83sf9HC4j8PVxZsIIQiAmcMXyiEOAAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBKaAwZo0HgQI1AQMVq0ReQgQmAIGa9J4ECBQEzBYtUbkIUBgChisSeNBgEBNwGDVGpGHAIEpYLAmjQcBAjUBg1VrRB4CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBH4s8AJy5gPIcvcZSAAAAABJRU5ErkJggg=="
// const uriImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABLKADAAQAAAABAAAAlgAAAABJS0H3AAAEiElEQVR4Ae3UsQnAQBADwX/337PdgeLFzKWXiBHonvO+x4UE7g2FEYVASuBJpRGGAAECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgMAYM1cLwIEGgJGKxWH9IQIDAEDNbA8SJAoCVgsFp9SEOAwBAwWAPHiwCBloDBavUhDQECQ8BgDRwvAgRaAgar1Yc0BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAj8WuADIzQCyFX9X0kAAAAASUVORK5CYII=";
// import mountain from require("../assets/mountain.jpg");
import mm from '../assets/MotivLogo.png';
// const { createCanvas } = require("canvas");

// var RNFS = require('react-native-fs');

// const width = 1200;
// const height = 627;

// // Add post object with the content to render
// const post = {
//   title: "Help"
// }
// createCanvas(width, height)
// const canvas = createCanvas(width, height);
// const context = canvas.getContext("2d");

// context.fillStyle = "#764abc";
// context.fillRect(0, 0, width, height);

// // Set the style of the test and render it to the canvas
// context.font = "bold 70pt 'PT Sans'";
// context.textAlign = "center";
// context.fillStyle = "#fff";
// // 600 is the x value (the center of the image)
// // 170 is the y (the top of the line of text)
// context.fillText(post.title, 600, 170);

// const buffer = canvas.toBuffer("image/png");
// console.log(canvas.toDataURL("image/png"))
import MixPanel from './MixPanel';
import ExpoMixpanelAnalytics from '@benawad/expo-mixpanel-analytics';

const analytics = new ExpoMixpanelAnalytics("8eee91fa259f94afdedfdba55da7d918");

analytics.identify("13793");
analytics.register({ email: "bob@bob.com" });
export default function PostList({props, navigation}) {
    const [goalsJson, setGoalsJson] = useState(props);
    const [goals, setGoals] = useState([""]);
    const [imageUri, setUri] = useState(Asset.fromModule(require('../assets/MotivLogo.png')).uri);
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
            <Pressable style={styles.button} onPress={()=> {
              navigation.navigate("New Goal", {"setGoals": setGoals, "setGoalsJson": setGoalsJson, "goalsJson": goalsJson});
              analytics.track("AddingNewGoal", {"type": "Personal"});
              
              }}>
                <Text style={styles.text}>New Goal</Text>
            </Pressable>
            {/* <Image source={uriImage}></Image> */}
            {/* <MixPanel /> */}
            {/* <Pressable style={styles.button} onPress={()=>saveImage(uriImage)}>
                <Text style={styles.text}>New Goal</Text>
            </Pressable> */}
            <FlatList
            style={{flex:1}}
            data={goals}
            renderItem={({ item }) => <Post post={goalsJson[item]} name={item} navigation={navigation}/>}
            keyExtractor={item => item}
            />
      </View>
    );
}
import * as MediaLibrary from "expo-media-library";
const saveImage = async (uri) => {
  // const mountainImage = require('../assets/MotivLogo.png');
  // console.log(typeof(mm));
  // console.log(mm);
  // console.log(uri);
  // var Base64Code = uri.split("data:image/png;base64,")[1];
  // console.log("*************************", FileSystem.documentDirectory)
  // const base64Code = uriImage.split("data:image/png;base64,")[1];
  // console.log(base64Code);
  // const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
  // await FileSystem.writeAsStringAsync(filename, base64Code, {
  //   encoding: FileSystem.EncodingType.Base64,
  // });
  // console.log("^^^^^^^^^^^^^^^^^^^^^^", filename);
  // const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
  
  try {
    // Request device storage access permission
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
    // Save image to media library

  const base64Code = uriImage.split("data:image/png;base64,")[1];
  const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
  await FileSystem.writeAsStringAsync(filename, base64Code, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
    }
  } catch (error) {
    console.log(error);
  }
};


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