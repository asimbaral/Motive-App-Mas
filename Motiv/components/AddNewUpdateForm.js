import React, {useState} from 'react';
import {Alert, Text, StyleSheet, View, TextInput, Button, ScrollView, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { firebase, db, auth } from '../firebase/config'
import { onValue, set, ref, remove } from "firebase/database";
import { uid } from 'uid';
import profileImage from '../assets/rsz_2ad.png';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '/' + mm + '/' + dd;
var postDate = mm + '/' + dd;
import ExpoMixpanelAnalytics from '@benawad/expo-mixpanel-analytics';

const analytics = new ExpoMixpanelAnalytics("8eee91fa259f94afdedfdba55da7d918");

analytics.identify("13793");
analytics.register({ email: "bob@bob.com" });
const AddNewUpdateForm = (props) => {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const Submit = () => {
    const authUid = auth.currentUser.uid;
    const st = `/${authUid}/goals/Personal/${props.route.params.title}/posts`;
    const newJsonArray = props.route.params.timelineData;
    newJsonArray.push({"title": title,
    "description": desc,
    "time": postDate,
    likes: 0
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
    analytics.track("SubmitingUpdate", {"title": title,
    "description": desc,
    "time": postDate,
    likes: 0
  });
  props.navigation.goBack();
  // props.navigation.navigate("Share");
};

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
        onPress={() => {
          if (title.length>2) {
          Submit();}}}
        title="Submit"
        style={styles.submit}
        />

        </View>
        <View>
        <Image style= {styles.formLabel}source={profileImage}/>
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