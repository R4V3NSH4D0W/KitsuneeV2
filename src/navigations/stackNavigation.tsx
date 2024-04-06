import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GettingStarted from '../screens/getting-started';
import DrawerNavigation from './drawer-navigation';
import DetailPage from '../screens/detailpage';
import StreamVideo from '../screens/stream-video';

const Stack = createNativeStackNavigator();

const StackScreenNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GettingStarted" component={GettingStarted} />
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
      <Stack.Screen name="Detail" component={DetailPage} />
      <Stack.Screen name="Stream" component={StreamVideo} />
    </Stack.Navigator>
  );
};

export default StackScreenNavigation;
