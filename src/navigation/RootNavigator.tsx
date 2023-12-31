import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Header } from '../components/Header';
import { HomeScreen } from '../screens/HomeScreen';
import { PlayerDetailsScreen } from '../screens/PlayerDetailsScreen';
import { useNavigation } from '@react-navigation/native';

export const RootNavigator = () => {
  const Stack = createStackNavigator();
  const { goBack } = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name="PlayerDetailsScreen"
        component={PlayerDetailsScreen}
        options={{
          header: () => <Header onBack={goBack} />,
        }}
      />
    </Stack.Navigator>
  );
};
