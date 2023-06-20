import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Header } from '../components/Header';
import { Home } from '../components/Home';
// import { useNavigation } from '@react-navigation/native';

export const RootNavigator = () => {
  const Stack = createStackNavigator();

  // const { navigate } = useNavigation();

  // const handleOnClose = navigate('Home');

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => <Header hasNavIcons />,
        }}
      />
    </Stack.Navigator>
  );
};
