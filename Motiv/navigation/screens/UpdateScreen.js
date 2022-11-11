import React, {useState} from 'react'
import { View, Text, Button, StyleSheet,
  Image,
  TouchableOpacity,
  FlatList, Pressable } from 'react-native'
import UpdateList from '../../components/UpdateList';
import TimeLine from '../../components/TimeLine';
import GoalStatus from '../../components/GoalStatus'
import CurrentGoal from '../../components/CurrentGoal';

function UpdateScreen(props) {
  const root = props.route.params;
  const [timelineData, setTimelineData] = useState(props.route.params.post.posts);
  return (
    <>
    {/* <Text>{JSON.stringify(props, null, 2)}</Text> */}
      <CurrentGoal title={root.title} deadline={root.post.deadline} description={root.post.description} updateStatus={root.post.UpdateStatus}/>
      <View style={styles2.app}>
        <TouchableOpacity style={styles2.button} onPress={()=> props.navigation.navigate("New Update", {title: root.title, "setTimelineData": setTimelineData, "timelineData": timelineData})}>
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
  },
  // button: {
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     paddingVertical: 22,
  //     paddingHorizontal: 10,
  //     borderRadius: 40,
  //     elevation: 3,
  //     backgroundColor: 'black',
  //     marginTop: 20,
  //     marginBottom: 20,
  //     width: "60%",
  //     alignSelf: 'center'
  //   },
  //   text: {
  //     fontSize: 26,
  //     fontWeight: 'bold',
  //     letterSpacing: 0.25,
  //     color: 'white',
  //   },
});

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

    marginTop:20,
    backgroundColor:"black",
    padding: 0,
    flexDirection:'row'
    },

  name:{
    fontSize:25,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold'
  },
  count:{
    fontSize:12,
    alignSelf:'center',
    color:"#6666ff"
  }
}); 
