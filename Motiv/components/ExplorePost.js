import React, {useState} from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import mountainImage from '../assets/mountain.jpg';
// const mountainImages = {
//   0: require("../assets/Mountain_Range_Background.svg"),
//   1: require("../assets/mountain1.png"),
//   2: require("../assets/mountain2.png"),
//   3: require("../assets/mountain3.png"),
//   4: require("../assets/mountain4.png"),
// };
import ExpoMixpanelAnalytics from '@benawad/expo-mixpanel-analytics';

const analytics = new ExpoMixpanelAnalytics("8eee91fa259f94afdedfdba55da7d918");

analytics.identify("13793");
analytics.register({ email: "bob@bob.com" }); // super props sent on every request and persisted in AsyncStorage


const Update = ({item, num}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);
  return (
    <View style={styles.card}>
      {/* <Text>{JSON.stringify(item, null, 2)}</Text> */}
      <Image style={styles.cardImage} source={{uri: 'https://www.liveabout.com/thmb/3hOYoLBcmnd5Rd_JRCSSZoIlE44=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MontBlancRegion_BuenaVistaImages_Getty1-56a16aee3df78cf7726a89cf.jpg'}}/>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.timeContainer}>
            <Image style={styles.iconData} source={{uri: 'https://img.icons8.com/color/96/3498db/calendar.png'}}/>
            <Text style={styles.time}>{item.time}</Text>
            <Pressable onPress={() => {
              setLiked((isLiked) => !isLiked);
              analytics.track("LikeButtonPressed", { "post": item.title, "description": item.description});
              if (liked) {
                setLikeCount(likeCount - 1);
              } else {
                setLikeCount(likeCount + 1);
              }
              }}>
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={32}
        color={liked ? "red" : "black"}
      />
    </Pressable>
    {/* <Text>{likeCount}</Text> */}

            {/* <Text style={styles.time}>   {JSON.stringify(item)}</Text> */}
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.socialBarContainer}>
          {/* <View style={styles.socialBarSection}>
            <TouchableOpacity style={styles.socialBarButton}>
              <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material/96/2ecc71/visible.png'}}/>
              <Text style={styles.socialBarLabel}>78</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.socialBarSection}>
            <TouchableOpacity style={styles.socialBarButton}>
              <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
              <Text style={styles.socialBarLabel}>25</Text>
            </TouchableOpacity>
          </View> */}
          <Text>{item.goalTitle}</Text>
        </View>
      </View>
    </View>
    //8eee91fa259f94afdedfdba55da7d918
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor:"#EEEEEE",
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  }, 
  description:{
    fontSize:15,
    color:"#888",
    flex:1,
    marginTop:5,
    marginBottom:5,
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5,
    marginRight: 200
  },
  icon: {
    width:25,
    height:25,
  },
  iconData:{
    width:15,
    height:15,
    marginTop:5,
    marginRight:5
  },
  timeContainer:{
    flexDirection:'row'
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
}); 

export default Update;