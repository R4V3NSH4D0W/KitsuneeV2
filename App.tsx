import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackScreenNavigation from './src/navigations/stackNavigation';

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <StackScreenNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
