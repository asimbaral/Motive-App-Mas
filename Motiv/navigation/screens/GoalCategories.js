import React, {useEffect, useState} from 'react'
import { View, Button, Text, ScrollView, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import goals from '../../mocks/goals.json';
import PostList from '../../components/PostList';
function GoalCategories(props) {

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