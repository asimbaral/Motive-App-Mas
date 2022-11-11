import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// TODO: AMISH: Style this better. It is used by UpdateScreen.js 
const CurrentGoal = ({title, deadline, description, updateStatus}) => {
  return(
      <View style={styles.app}>
        <View style={styles.cardContent}>
          <Text style={styles.name}>{title + " by " + deadline}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.status}>{"Updates " + updateStatus}</Text>
        </View>
      </View>
  )
}

export default CurrentGoal;


const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white'
  },
  cardContent: {
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  name:{
    fontSize: 25,
    alignSelf:'left',
    marginLeft: 20,
    color: 'black',
    fontWeight:'bold'
  },
  description:{
    fontSize: 20,
    alignSelf:'left',
    marginLeft: 20,
    marginTop: 2,
    marginBottom: 2,
    color: "dimgrey"
  },
  status:{
    fontSize: 16,
    alignSelf:'left',
    marginLeft: 20,
    marginTop: 2,
    marginBottom: 2,
    color: "dimgrey"
  }
}); 