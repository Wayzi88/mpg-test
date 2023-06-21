import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../styles/colors';
import { PlayerCard } from '../components/PlayerCard';
import { fetchApi } from '../utils/fetchApi';

export const HomeScreen = () => {
  // const { isLoading, data } = useApi('championship-players-pool/1');
  const [data, setData] = useState();

  useEffect(() => {
    fetchApi('championship-players-pool/1').then((res) => setData(res));
  }, []);

  return (
    <Container>
      {!data ? (
        // TODO créer un spinner ou un ballon qui tourne
        <Text>Jattends...</Text>
      ) : (
        <>
          <Title>Joueurs</Title>
          <FlatList
            data={data.poolPlayers}
            renderItem={({ item }) => (
              <PlayerCard
                key={item.id}
                id={item.id}
                firstName={item.firstName}
                lastName={item.lastName}
                clubId={item.clubId}
              />
            )}
          />
        </>
      )}
    </Container>
  );
};

const Title = styled(Text)`
  color: ${colors.grey};
  font-size: 16px;
  margin-bottom: 10px;
  padding: 20px 20px 0 20px;
`;

const Container = styled(View)`
  border: 1px solid red;
`;
