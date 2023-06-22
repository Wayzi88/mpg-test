import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import BackIcon from '../assets/icons/back-arrow-left.svg';
import { colors } from '../styles/colors';
import { Image } from 'expo-image';

interface HeaderProps {
  onBack?: () => void;
}

export const Header = ({ onBack }: HeaderProps) => {
  return (
    <Container>
      {onBack && (
        <Button onPress={onBack}>
          <BackIcon width={40} height={40} color={colors.white} />
        </Button>
      )}
      <TitleContainer>
        <Image
          style={{ height: '50%', width: '50%' }}
          source="https://mpg.football/build/_assets/logoMpg-GHHGJFQB.png"
          contentFit="contain"
        />
      </TitleContainer>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  justify-content: center;
  width: 100%;
  height: 80px;
  background-color: ${colors.primary};
`;

const Button = styled.Pressable`
  width: 10%;
`;

const TitleContainer = styled.View`
  width: 80%;
  align-items: center;
`;
