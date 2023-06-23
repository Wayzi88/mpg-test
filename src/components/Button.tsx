import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import styled from 'styled-components';
import { colors } from '../styles/colors';

interface ButtonProps {
  title: string;
  handleOnPress: () => void;
  color: string;
  small?: boolean;
}

interface FilterButtonProps {
  color: string;
  small?: boolean;
}

export const Button = ({ title, handleOnPress, color, small }: ButtonProps) => {
  return (
    <FilterButton style={styles.button} onPress={handleOnPress} color={color} small={small}>
      <ButtonText>{title}</ButtonText>
    </FilterButton>
  );
};

const FilterButton = styled(Pressable)<FilterButtonProps>`
  border-radius: 10px;
  padding: 20px 30px;
  background-color: ${(props: FilterButtonProps) => props.color};
  width: ${(props: FilterButtonProps) => (props.small ? '40%' : '60%')};
  margin-top: 10px;
`;

export const ButtonText = styled(Text)`
  font-weight: bold;
  color: ${colors.white};
  text-align: center;
`;

const styles = StyleSheet.create({
  button: {
    elevation: 2,
  },
});
