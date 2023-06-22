import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TextInput, Modal, Pressable, Alert, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../styles/colors';
import { PlayerCard } from '../components/PlayerCard';
import { fetchApi } from '../utils/fetchApi';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { filteredPlayersByName, filteredPlayersByPositions } from '../utils/filterPlayers';
import Checkbox from 'expo-checkbox';
import { PositionEnum } from '../enums/position.enum';

export const HomeScreen = () => {
  const [players, setPlayers] = useState();
  const [searchName, setSearchName] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [checkedPositions, setCheckedPositions] = useState([]);

  const playerPositionArray = Object.values(PositionEnum);

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

  const handlePositionSelection = (position) => {
    const isSelected = checkedPositions.includes(position);
    if (isSelected) {
      // If already selected, remove it from the selectedPositions array
      setCheckedPositions(checkedPositions.filter((pos) => pos !== position));
    } else {
      // If not selected, add it to the selectedPositions array
      setCheckedPositions([...checkedPositions, position]);
    }
  };

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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <CheckBoxesContainer>
                  {playerPositionArray.map((position: string) => (
                    <CheckBoxContainer key={position}>
                      <Checkbox
                        // style={styles.checkbox}
                        value={checkedPositions.includes(position)}
                        onValueChange={() => handlePositionSelection(position)}
                        // onValueChange={setCheckedPositions(...checkedPositions, position)}
                        // color={
                        //   checkedPositions.length > 0 && checkedPositions.includes(position)
                        //     ? colors.primary
                        //     : undefined
                        // }
                        // color={
                        //   checkedPositions.length > 0 && checkedPositions.includes(position)
                        //     ? colors.primary
                        //     : undefined
                        // }
                        color={checkedPositions.includes(position) ? colors.primary : undefined}
                      />
                      <PlayerPosition>{position}</PlayerPosition>
                    </CheckBoxContainer>
                  ))}
                </CheckBoxesContainer>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Filtrer</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
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

const CheckBoxesContainer = styled(View)`
  width: 80%;
  margin-bottom: 30px;
`;

const CheckBoxContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
`;

const PlayerPosition = styled(Text)`
  margin-left: 10px;
`;

const FiltersContainer = styled(View)``;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 0,
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 100,
    width: '80%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
