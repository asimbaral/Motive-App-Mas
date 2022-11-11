import React, {useState} from 'react';
import {Alert, Text, StyleSheet, View, TextInput, Button, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { firebase, db } from '../firebase/config'
import { onValue, set, ref, remove } from "firebase/database";
import { uid } from 'uid';

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
    props.navigation.goBack();
    const uuid = uid();
    const st = `/1_user/goals/Personal/${props.route.params.title}/posts/${uuid}/${title}`;

    console.log(":::::::::::", props.route.params);

    set(ref(db, st), {"title": title,
        "description": desc,
        "time": postDate
    });
    const newJson = props.route.params.timelineData;
      newJson[props.route.params.title] = {"title": title,
      "description": desc,
      "time": postDate
      };
      props.route.params.setTimelineData((oldarray) => [...oldarray, {"title": title,
      "description": desc,
      "time": postDate
      }]);
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

export default AddNewUpdateForm