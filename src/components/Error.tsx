import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

interface ErrorProps {
  title: string;
}

export const Error = ({ title }: ErrorProps) => {
  return (
    <Container>
      <TextError>{title}</TextError>
    </Container>
  );
};

const Container = styled(View)`
  display: flex;
  justify-content: center;
  padding: 0 20px;
`;

const TextError = styled(Text)`
  color: red;
  font-size: 18px;
`;
