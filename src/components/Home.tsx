import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export const Home = () => {
  return (
    <Container>
      <Title>Open up App.tsx to start working on your app! </Title>
    </Container>
  );
};

const Title = styled(Text)`
  color: #d10606;
  text-align: center;
  font-size: 16px;
`;

const Container = styled(View)`
  border: 1px solid black;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
