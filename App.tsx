import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/styles/colors';
import 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';

// npx expo start --tunnel

const App = () => {
  // const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer>
      <SafeContainer>
        <RootNavigator />
      </SafeContainer>
    </NavigationContainer>
  );
};

const SafeContainer = styled(SafeAreaView)`
  background-color: ${colors.white};
  justify-content: center;
  flex: 1;
`;

export default App;
