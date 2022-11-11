import React, {useState} from 'react'
import { View, Text, Button } from 'react-native'
import UpdateList from '../../components/UpdateList';
import AddNewGoalForm from '../../components/AddNewGoalForm';
function NewGoalScreen(props) {
  // return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    return <AddNewGoalForm navigation={props.navigation} setGoals={props.route.params.setGoals} setGoalsJson={props.route.params.setGoalsJson}  goalsJson={props.route.params.goalsJson} ></AddNewGoalForm>
  // </View>
}

export default NewGoalScreen;