import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
const GoalCategory = ({item, itemInfo, navigation }) => {
  return(
    <View>
        {/* <Text style={{ fontSize: 26} } onPress={() => navigation.navigate('Goals', {item: item, itemInfo: itemInfo})}>{item}</Text> */}
        <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate('Goals', {item: item, itemInfo: itemInfo})}>
          <Text></Text>
              <View >
                <Text style={styles.name}>{item}</Text>
              </View>
            </TouchableOpacity>
    </View>
  )
}

export default GoalCategory;

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

    marginLeft: 20,
    marginRight: 20,
    marginTop:30,
    backgroundColor:"white",
    padding: 20,
    flexDirection:'row',
    borderRadius:30
  },

  name:{
    fontSize:28,
    flex:1,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold',
    marginBottom: -20
  },
  count:{
    fontSize:24,
    flex:1,
    alignSelf:'center',
    color:"#6666ff"
  }
});