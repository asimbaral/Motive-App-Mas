import React, {useState, useEffect} from 'react'
import { View, Text, Button, StyleSheet,
  Image,
  TouchableOpacity,
  FlatList, Pressable } from 'react-native'
import { auth, db } from '../../firebase/config'

import TimeLine from '../../components/TimeLine';
// import GoalStatus from '../../components/GoalStatus';
import CurrentGoal from '../../components/CurrentGoal';
import { onValue, set, ref, remove } from "firebase/database";

import ExpoMixpanelAnalytics from '@benawad/expo-mixpanel-analytics';

const analytics = new ExpoMixpanelAnalytics("8eee91fa259f94afdedfdba55da7d918");

analytics.identify("13793");
analytics.register({ email: "bob@bob.com" });

function UpdateScreen(props) {
  const root = props.route.params;
  // const [timelineData, setTimelineData] = useState(props.route.params.post.posts);
  const [timelineData, setTimelineData] = useState(props.route.params.post.posts);
  const [count, setCount] = useState(0);
  useEffect(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      var st = `/${auth.currentUser.uid}/goals/Personal/${root.title}/posts`;
      // read
      onValue(ref(db, st), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setTimelineData(data);
        }
      });
    }
  });
}, []);


  return (
    <>
      <CurrentGoal title={root.title} deadline={root.post.deadline} description={root.post.description} updateStatus={root.post.UpdateStatus}/>
      
      <View style={styles2.app}>
      <TouchableOpacity style={styles2.button} onPress={()=> {
          props.navigation.navigate("Share", {
            "currentGoal": root.title, 
            "deadline": root.post.deadline, 
            "timeline": timelineData
          })
        }}>
        <Text style={styles2.buttonText}>Share Goal</Text>
        
      </TouchableOpacity>
        <TouchableOpacity style={styles2.button} onPress={()=> {
          props.navigation.navigate("New Update", {title: root.title, "setTimelineData": setTimelineData, "timelineData": timelineData, "count": count, "setCount": setCount})
          analytics.track("AddingUpdate", { "post": root.title, "description": root.post.description});
          }}>
          <Text style={styles2.buttonText}>Add Update</Text>
        </TouchableOpacity>
      </View>
      <TimeLine props={timelineData}></TimeLine>
    </>
)
}

export default UpdateScreen;

const styles2 = StyleSheet.create({
  app: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
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
    backgroundColor: "#26B1FF",
    justifyContent: 'center',
    height: 64,
    width: 360,
    padding: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    alignItems: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
    color: '#fff',
  }
});