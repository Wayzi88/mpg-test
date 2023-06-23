import React, { useContext, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { filteredPlayersByName, filteredPlayersByPositions } from '../utils/filterPlayers';
import { ButtonText, PositionSelectionModal } from '../modals/PositionSelection';
import { PlayerCard } from './PlayerCard';
import { PlayerContext } from '../contexts/player.context';
import { Error } from './Error';

export const Players = ({ players }: any) => {
  const [searchName, setSearchName] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checkedPositions, setCheckedPositions] = useState<string[] | []>([]);
  const { error } = useContext(PlayerContext) ?? {};

  const filteredPlayers = useMemo(() => {
    if (players) {
      if (searchName) {
        // If the user typed a player name, filter players list according to the input
        return filteredPlayersByName(players, searchName);
      } else if (checkedPositions && checkedPositions.length > 0) {
        // If the user selected some positions, filter players list according to the selected positions
        return filteredPlayersByPositions(players, checkedPositions);
      } else {
        // return the whole list
        return players;
      }
    }
  }, [players, searchName, checkedPositions]);

  return (
    <MainContainer>
      <TitleContainer>
        <NameContainer>
          <Title>Joueurs</Title>
          <TextInput
            onChangeText={(newText) => {
              setSearchName(newText);
            }}
            value={searchName}
            placeholder="Chercher par joueur"
          />
        </NameContainer>
        <ShowModalButton
          style={{ elevation: 2 }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <ButtonText>Positions</ButtonText>
        </ShowModalButton>
      </TitleContainer>
      {error && <Error title={error} />}
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
      {/* Modal to filter player positions */}
      <PositionSelectionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setCheckedPositions={setCheckedPositions}
      />
    </MainContainer>
  );
};

const Title = styled(Text)`
  color: ${colors.grey};
  font-size: 16px;
`;

const MainContainer = styled(View)`
  flex: 1;
`;

const TitleContainer = styled(View)`
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const NameContainer = styled(View)`
  width: 50%;
`;

export const ShowModalButton = styled(Pressable)`
  border-radius: 10px;
  padding: 20px 30px;
  background-color: ${colors.primary};
`;
