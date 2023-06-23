import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import PlusIcon from '../assets/icons/plus.svg';
import { PlayerContext } from '../contexts/player.context';
import { fetchApi } from '../utils/fetchApi';
import _ from 'lodash';
import { type StackNavigationProp } from '@react-navigation/stack';
import { type RootStackParamList } from '../navigation/types';
import { styled } from 'styled-components';

interface PlayerCardProps {
  id: string;
  firstName: string;
  lastName: string;
  clubId: string;
}

export const PlayerCard = ({ id, firstName, lastName, clubId }: PlayerCardProps) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { update } = useContext(PlayerContext);

  const handleOnPress = () => {
    void fetchApi('championship-clubs').then((res) => {
      const club = _.find(res.championshipClubs, { id: clubId });
      const clubName = club.name['fr-FR'];
      const currentPlayer = {
        fullName: firstName + ' ' + lastName,
        clubName,
        id,
      };
      update(currentPlayer);
    });

    navigate('PlayerDetailsScreen');
  };
  return (
    <MainContainer onPress={handleOnPress}>
      <Text>
        {firstName} {lastName}
      </Text>
      <MoreDetailsContainer>
        <Text>Plus de détails</Text>
        <PlusIcon height={'28px'} width={'28px'} style={{ color: colors.primary }} />
      </MoreDetailsContainer>
    </MainContainer>
  );
};

const MainContainer = styled(TouchableOpacity)`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightGrey};
  height: 70px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

const MoreDetailsContainer = styled(View)`
  width: 40%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
