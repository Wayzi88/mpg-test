import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { filteredPlayersByName, filteredPlayersByPositions } from '../utils/filterPlayers';
import { ButtonText, FilterButton, PositionSelectionModal } from '../modals/PositionSelection';
import { PlayerCard } from './PlayerCard';

export const Players = ({ players }: any) => {
  const [searchName, setSearchName] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checkedPositions, setCheckedPositions] = useState<string[] | []>([]);

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
    <View>
      <FiltersContainer>
        <Title>Joueurs</Title>
        <TextInput
          onChangeText={(newText) => {
            setSearchName(newText);
          }}
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
      <FilterButton
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
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
          />
        )}
      />
    </View>
  );
};

const Title = styled(Text)`
  color: ${colors.grey};
  font-size: 16px;
  margin-bottom: 10px;
  padding: 20px 20px 0 20px;
`;

const FiltersContainer = styled(View)``;

const styles = StyleSheet.create({
  button: {
    elevation: 2,
  },
});
