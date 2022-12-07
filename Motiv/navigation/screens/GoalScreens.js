import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GoalCategories from './GoalCategories.js'
import UpdateScreen from './UpdateScreen.js';
import NewGoalScreen from './NewGoalScreen.js';
import AddNewUpdateForm from '../../components/AddNewUpdateForm.js';
import Share from './Share.js';
const Stack = createNativeStackNavigator()
// Use stack navigator when you need multiple screens in one tab

function GoalScreens() {
    return <Stack.Navigator>
       <Stack.Screen name="Categories" component={GoalCategories} options={{headerShown: false}} />
       <Stack.Screen name="Update" component={UpdateScreen} />
       <Stack.Screen name="New Goal" component={NewGoalScreen} />
       <Stack.Screen name="New Update" component={AddNewUpdateForm} />
       <Stack.Screen name="Share" component={Share} />
    </Stack.Navigator>
}

export default GoalScreens;