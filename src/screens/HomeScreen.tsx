import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { fetchApi } from '../utils/fetchApi';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Players } from '../components/Players';
import { PlayerContext } from '../contexts/player.context';

export const HomeScreen = () => {
  const [players, setPlayers] = useState<any>();
  const { updateError } = useContext(PlayerContext) ?? {};

  useEffect(() => {
    void fetchApi('championship-players-pool/1')
      .then((res) => {
        setPlayers(res.poolPlayers);
        // remove the previous error message
        if (updateError) {
          updateError('');
        }
      })
      .catch((err) => {
        console.log('error:', err);
        if (updateError) {
          updateError('Erreur lors du chargement des données');
        }
      });
  }, []);

  return <Container>{players ? <Players players={players} /> : <LoadingSpinner />}</Container>;
};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
`;
