import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';
import { colors } from '../styles/colors';

export const LoadingSpinner = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color={colors.primary} />
    </Container>
  );
};

const Container = styled(View)`
  display: flex;
  justify-content: center;
`;
