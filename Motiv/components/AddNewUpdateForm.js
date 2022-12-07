// import React, {useState} from 'react';
import {Alert, Text, StyleSheet, View, TextInput, Button, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { firebase, db, auth } from '../firebase/config'
import { onValue, set, ref, remove } from "firebase/database";
import { uid } from 'uid';
import * as Device from 'expo-device';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import storage from "@react-native-async-storage/async-storage";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '/' + mm + '/' + dd;
var postDate = mm + '/' + dd;

const AddNewUpdateForm = (props) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const Submit = () => {
    const uuid = uid();
    const authUid = auth.currentUser.uid;
    const st = `/${authUid}/goals/Personal/${props.route.params.title}/posts`;
    const newJsonArray = props.route.params.timelineData;
    newJsonArray.push({"title": title,
    "description": desc,
    "time": postDate
  });
//   set(ref(db, st), {"title": title,
//   "description": desc,
//   "time": postDate
// });
set(ref(db, st), newJsonArray);
  // const newJson = props.route.params.timelineData;
  //   newJson[props.route.params.title] = {"title": title,
  //   "description": desc,
  //   "time": postDate
  //   };
    // props.route.params.setTimelineData((oldarray) => [...oldarray, {"title": title,
    // "description": desc,
    // "time": postDate
    // }]);

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Updated Goal!",
        body: "Your updater has just been added!",
        data: { data: "data goes here" }
      },
      trigger: {
        seconds: 1
      }
      // trigger: {
      //   hour: 3,
      //   minute: 21,
      //   repeats: true
      // }
    });

    
  props.navigation.goBack();
};

const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();

useEffect(() => {
  const getPermission = async () => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Enable push notifications to use the app!');
          await storage.setItem('expopushtoken', "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem('expopushtoken', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
  }

  getPermission();

  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);

const onClick = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Goal!",
      body: "Your goal has just been added!",
      data: { data: "data goes here" }
    },
    trigger: {
      seconds: 1
    }
    // trigger: {
    //   hour: 3,
    //   minute: 21,
    //   repeats: true
    // }
  });
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View >
        <TextInput style={styles.inputStyle}
          placeholder="Title"
          onChangeText={(currentTitle) => setTitle(currentTitle)}
          />
        <TextInput multiline blurOnSubmit style={styles.descStyle}
          placeholder="Description"
          onChangeText={(currentDesc) => setDesc(currentDesc)}
        />

        <View>
          <Text style={styles.formLabel}></Text>
        </View>

        <View style={styles.buttonContainer}>
        <Button
        onPress={Submit}
        title="Submit"
        style={styles.submit}
        />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  formLabel: {
    fontSize: 30,
    color: '#0099db',
    alignSelf: 'center',
    marginTop: 30,
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: '#b6b6b6'
  },
  descStyle: {
    marginTop: 20,
    width: 300,
    height: 200,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#b6b6b6'
  },
  formText: {
    color: '#00affe',
    fontSize: 20,
    paddingHorizontal: 70,
    paddingTop: 20,
    alignSelf: 'center'
  },
  pickerText: {
    color: '#00affe',
    fontSize: 25,
    paddingHorizontal: 0,
    paddingTop: 0
  },
  picker: {
    color: '#00affe',
    fontSize: 20,
    marginTop: -40
  },
  submit: {
    color: 'white',
    fontSize: 20
  },
  buttonContainer: {
    marginLeft: 75,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 150,
    marginBottom: 40

  }
});

export default AddNewUpdateForm