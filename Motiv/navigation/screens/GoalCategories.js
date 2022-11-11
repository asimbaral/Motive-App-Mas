import React, {useEffect, useState} from 'react'
import { View, Button, Text, ScrollView, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import goals from '../../mocks/goals.json';
import PostList from '../../components/PostList';
function GoalCategories(props) {
  // return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //   <ScrollView contentContainerStyle={styles.contentContainer}>
  //     <Button title="Add New Goal" onPress={()=> props.navigation.navigate("NewGoals")}></Button>
  //     <PostList props={goals["Personal"]} navigation={props.navigation}></PostList>
  //   </ScrollView>
  // </View>
  let [lis, setLis] = useState(goals["Personal"]);
  const foc = useIsFocused();
  useEffect(()=> {
      setLis(goals["Personal2"]);
  }, [foc]);
  return <PostList props={lis} navigation={props.navigation}></PostList>
}

const styles = StyleSheet.create({
  contentContainer: {
      paddingVertical: 20,
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
  },
});

export default GoalCategories;