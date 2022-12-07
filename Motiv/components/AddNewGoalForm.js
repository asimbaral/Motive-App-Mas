// import React, {useState} from 'react';
import {Alert, Text, StyleSheet, View, TextInput, Button, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CalendarScreen from '../navigation/screens/CalendarScreenTmp';
import { firebase, db, auth } from '../firebase/config'
import { onValue, set, ref, remove } from "firebase/database";
import { uid } from 'uid';
import ExpoMixpanelAnalytics from '@benawad/expo-mixpanel-analytics';

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
const analytics = new ExpoMixpanelAnalytics("8eee91fa259f94afdedfdba55da7d918");

analytics.identify("13793");
analytics.register({ email: "bob@bob.com" });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '/' + mm + '/' + dd;
const INITIAL_DATE = today;
var monthDate = mm + "/" + dd
const AddNewGoalForm = ({navigation, setGoals, setGoalsJson, goalsJson}) => {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);
  const [frequency, setFrequency] = useState('Weekly');
  const [title, setTitle] = useState('')
  const [description, setDesc] = useState('')

  const Submit = () => {
    const uuid = uid();
    const st = `/${auth.currentUser.uid}/goals/Personal/${title}`;

    set(ref(db, st), {
        "UpdateStatus": frequency,
        "description": description,
        "deadline": selected,
        "posts": [{"title": title,
        "description": description,
        "time": monthDate,
        "likes": 0,
        }],
        "comments": ["Great job - Motive Team"]
      });
      // setGoals((oldArray) => [...oldArray,  title])
      // const newJson = goalsJson
      // newJson[title] = {
      //   "UpdateStatus": frequency,
      //   "description": description,
      //   "deadline": selected,
      //   "posts": [{"title": title,
      //   "description": description,
      //   "time": monthDate}],
      //   "comments": ["Great job - Motive Team"]
      // };
      // setGoalsJson(newJson);
      Notifications.scheduleNotificationAsync({
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

      
    analytics.track("AddedNewGoal", {
      "UpdateStatus": frequency,
      "description": description,
      "deadline": selected,
      "posts": [{"title": title,
      "description": description,
      "time": monthDate,
      "likes": 0,
      }],
      "comments": ["Great job - Motive Team"]
    });
    navigation.goBack();
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
      {/* <Text style={styles.formLabel}> New Goal </Text> */}
      <View >
        <TextInput style={styles.inputStyle} name = 'title' onChangeText={(currentTitle) => setTitle(currentTitle)}
          placeholder="Title" />
        <TextInput multiline blurOnSubmit style={styles.descStyle} name='description' onChangeText={(currentDesc) => setDesc(currentDesc)}
          placeholder="Description"
        />
        <View>
          <Text style={styles.formLabel}>Goal Deadline</Text>
        </View>
        <CalendarScreen selected={selected} setSelected={setSelected} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}/>
        
        {/* <Text style={styles.formText}>Update Frequency</Text> */}
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerText}
          selectedValue={frequency}
          onValueChange={(currentFrequency) => setFrequency(currentFrequency)}>
          <Picker.Item label="Daily" value="Daily" />
          <Picker.Item label="Weekly" value="Weekly" />
          <Picker.Item label="Monthly" value="Monthly" />
        </Picker>
        <View style={styles.buttonContainer}>
        <Button
        onPress={() => {
          console.log(title.length + " " + description.length );
          if (title.length>2 && description.length > 5) {
          Submit()}}}
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
    backgroundColor: '#b6b6b6',
    // flexWrap: 'wrap',
    // flex:1,
    // flexDirection: 'row'
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

export default AddNewGoalForm