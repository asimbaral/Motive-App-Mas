import React, {useState} from 'react'
import { View, Text, Button } from 'react-native'
import AddNewGoalForm from '../../components/AddNewGoalForm';
function NewGoalScreen(props) {
    return <AddNewGoalForm navigation={props.navigation} setGoals={props.route.params.setGoals} setGoalsJson={props.route.params.setGoalsJson}  goalsJson={props.route.params.goalsJson} ></AddNewGoalForm>
}

export default NewGoalScreen;