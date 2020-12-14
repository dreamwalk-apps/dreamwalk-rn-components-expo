import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './src/Menu';
import Inputs from './src/Inputs';
import Buttons from './src/Buttons';
import ValueSlides from './src/ValueSlides';

const Stack = createStackNavigator();

const defaultOptions = {
  title: () => {},
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'menu'} component={Menu} options={{ title: 'Menu' }} />
        <Stack.Screen name={'inputs'} component={Inputs} options={{ title: 'Inputs' }} />
        <Stack.Screen name={'buttons'} component={Buttons} options={{ title: 'Buttons' }} />
        <Stack.Screen name={'value_slides'} component={ValueSlides} options={{ title: 'Parallax Swiper' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
