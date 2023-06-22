import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { fetchApi } from '../utils/fetchApi';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Players } from '../components/Players';

export const HomeScreen = () => {
  const [players, setPlayers] = useState<any>();

  useEffect(() => {
    fetchApi('championship-players-pool/1').then((res) => {
      setPlayers(res.poolPlayers);
    });
  }, []);

  return <Container>{!players ? <LoadingSpinner /> : <Players players={players} />}</Container>;
};

const Container = styled(View)`
  flex: 1;
`;
