import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import PlusIcon from '../assets/icons/plus.svg';
import { PlayerContext } from '../contexts/player.context';
import { fetchApi } from '../utils/fetchApi';
import _ from 'lodash';

interface PlayerCardProps {
  id: string;
  firstName: string;
  lastName: string;
  clubId: string;
  ultraPosition: number;
}

export const PlayerCard = ({ id, firstName, lastName, clubId, ultraPosition }: PlayerCardProps) => {
  const { navigate } = useNavigation();
  const { update } = useContext(PlayerContext);

  const handleOnPress = () => {
    fetchApi('championship-clubs').then((res) => {
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
    <View style={styles.mainContainer}>
      <Text>
        {firstName} {lastName}
      </Text>
      <TouchableOpacity style={styles.ctaContainer} onPress={handleOnPress}>
        <Text>Plus de détails</Text>
        <PlusIcon height={'28px'} width={'28px'} style={styles.cta} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  ctaContainer: {
    width: '40%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cta: {
    color: colors.primary,
  },
});
