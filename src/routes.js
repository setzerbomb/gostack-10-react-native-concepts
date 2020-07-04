import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="screen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTitleStyle: { alignSelf: 'center', color: '#fff' },
          headerBackTitleVisible: false,
        }}
        headerLayoutPreset="center"
      >
        <AppStack.Screen name="Main" component={Main} />
        <AppStack.Screen name="User" component={User} />
        <AppStack.Screen name="Repository" component={Repository} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
