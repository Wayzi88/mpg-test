import React from 'react';
import { DataTable } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import useApi from '../hooks/useApi';
import { colors } from '../styles/colors';

export const Home = () => {
  // const { isLoading, data } = useApi('championship-clubs');
  const { isLoading, data } = useApi('championship-players-pool/1');

  return (
    <Container>
      {isLoading ? (
        // TODO créer un spinner ou un ballon qui tourne
        <Text>Jattends...</Text>
      ) : (
        // <DataTable>
        //   <DataTable.Header>
        //     <DataTable.Title>Joueurs</DataTable.Title>
        //     <DataTable.Title numeric>Calories</DataTable.Title>
        //     <DataTable.Title numeric>Fat</DataTable.Title>
        //   </DataTable.Header>

        //   <DataTable.Row>
        //     <DataTable.Cell>Frozen yogurt</DataTable.Cell>
        //     <DataTable.Cell numeric>159</DataTable.Cell>
        //     <DataTable.Cell numeric>6.0</DataTable.Cell>
        //   </DataTable.Row>

        //   <DataTable.Row>
        //     <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
        //     <DataTable.Cell numeric>237</DataTable.Cell>
        //     <DataTable.Cell numeric>8.0</DataTable.Cell>
        //   </DataTable.Row>
        // </DataTable>
        <>
          <Title>Joueurs</Title>
          <FlatList
            data={data.poolPlayers}
            renderItem={({ item }) => (
              <Text key={item.id}>
                {item.firstName} {item.lastName}
              </Text>
            )}
          />
        </>
      )}
    </Container>
  );
};

const Title = styled(Text)`
  color: ${colors.grey};
  /* text-align: center; */
  font-size: 16px;
  margin-bottom: 10px;
`;

const Container = styled(View)`
  border: 1px solid black;
  /* align-items: center; */
  border: 1px solid red;
  /* justify-content: center; */
  /* margin: auto 10px; */
  padding: 20px;
`;
