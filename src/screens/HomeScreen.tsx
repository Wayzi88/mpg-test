import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../styles/colors';
import { PlayerCard } from '../components/PlayerCard';
import { fetchApi } from '../utils/fetchApi';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { filteredPlayersByName, filteredPlayersByPositions } from '../utils/filterPlayers';
import { ButtonText, FilterButton, PositionSelectionModal } from '../modals/PositionSelection';

export const HomeScreen = () => {
  const [players, setPlayers] = useState<any>();
  const [searchName, setSearchName] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checkedPositions, setCheckedPositions] = useState<number[]>([]);

  useEffect(() => {
    fetchApi('championship-players-pool/1').then((res) => setPlayers(res.poolPlayers));
  }, []);

  const filteredPlayers = useMemo(() => {
    if (players) {
      if (searchName) {
        return filteredPlayersByName(players, searchName);
      } else if (checkedPositions.length > 0) {
        return filteredPlayersByPositions(players, checkedPositions);
      } else {
        return players;
      }
    }
  }, [players, searchName, checkedPositions]);

  return (
    <Container>
      {!players ? (
        <LoadingSpinner />
      ) : (
        <>
          <FiltersContainer>
            <Title>Joueurs</Title>
            <TextInput
              onChangeText={(newText) => setSearchName(newText)}
              value={searchName}
              placeholder="Search Here"
            />
          </FiltersContainer>
          <PositionSelectionModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            checkedPositions={checkedPositions}
            setCheckedPositions={setCheckedPositions}
          />
          <FilterButton style={styles.button} onPress={() => setModalVisible(true)}>
            <ButtonText>Show Modal</ButtonText>
          </FilterButton>
          <FlatList
            data={filteredPlayers}
            renderItem={({ item }) => (
              <PlayerCard
                key={item.id}
                id={item.id}
                firstName={item.firstName}
                lastName={item.lastName}
                clubId={item.clubId}
                ultraPosition={item.ultraPosition}
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
  flex: 1;
`;

const FiltersContainer = styled(View)``;

const styles = StyleSheet.create({
  button: {
    elevation: 2,
  },
});
