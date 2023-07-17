import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {ProfileDetail} from './ProfileDetail';
import { Edit } from './Edit';
import { Password } from './Password';


type RootStackParamList = {
  ProfileDetail: undefined;
  Edit: undefined;
  Password: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileDetail" component={ProfileDetail} options={{ headerShown: false }}/>
      <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }}/>
      <Stack.Screen name="Password" component={Password} options={{ headerShown: false }}/>
     
    </Stack.Navigator>
  );
}

export {Profile};