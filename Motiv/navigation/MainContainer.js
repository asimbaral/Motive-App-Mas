import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import ExploreScreen from './screens/ExploreScreen';
import GoalScreens from './screens/GoalScreens';
import ProfileHomeScreen from './screens/ProfileHomeScreen';
import CalendarScreen from './screens/CalendarScreenTmp';
// import StartScreen from './screens/StartScreen';
//Screen names
const homeName = "Home";
const exploreName = "Explore";
const goalsName = "Goals";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        initialRouteName={exploreName}
        screenOptions={({route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === exploreName) {
              iconName = focused ? 'albums' : 'albums-outline';

            } else if (rn === goalsName) {
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}
        >
        <Tab.Screen name={exploreName} component={ExploreScreen} />
        <Tab.Screen name={goalsName} component={GoalScreens} />
        <Tab.Screen name={homeName} component={ProfileHomeScreen} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default MainContainer;