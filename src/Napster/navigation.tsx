import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Album from '../Napster/Album'
import Tracks from '../Napster/Tracks'
import Song from '../Napster/Song'
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Album"
          component={Album}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Tracks"
          component={Tracks}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Song"
          component={Song}
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
