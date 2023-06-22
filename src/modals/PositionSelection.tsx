import React, { type Dispatch, type SetStateAction } from 'react';
import { StyleSheet, Modal, View, Text, Pressable } from 'react-native';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import Checkbox from 'expo-checkbox';
import { PositionEnum } from '../enums/position.enum';

interface PositionSelectionModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  checkedPositions: string[] | [];
  setCheckedPositions: Dispatch<SetStateAction<[] | string[]>>;
}

export const PositionSelectionModal = ({
  modalVisible,
  setModalVisible,
  checkedPositions,
  setCheckedPositions,
}: PositionSelectionModalProps) => {
  const playerPositionArray = Object.values(PositionEnum);

  const handlePositionSelection = (position: string) => {
    const isSelected = checkedPositions.includes(position);
    if (isSelected) {
      // If already selected, remove it from the checkedPositions array
      setCheckedPositions(checkedPositions.filter((pos) => pos !== position));
    } else {
      // If not selected, add it to the checkedPositions array
      setCheckedPositions([...checkedPositions, position]);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <ModalContainer>
        <ModalContentContainer style={styles.modalView}>
          <CheckBoxesContainer>
            {playerPositionArray.map((position: string) => (
              <CheckBoxContainer key={position}>
                <Checkbox
                  value={checkedPositions.includes(position)}
                  onValueChange={() => handlePositionSelection(position)}
                  color={checkedPositions.includes(position) ? colors.primary : undefined}
                />
                <PlayerPosition>{position}</PlayerPosition>
              </CheckBoxContainer>
            ))}
          </CheckBoxesContainer>

          <FilterButton style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
            <ButtonText>Filtrer</ButtonText>
          </FilterButton>
        </ModalContentContainer>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalContentContainer = styled(View)`
  background-color: ${colors.white};
  border-radius: 20px;
  width: 80%;
  height: 70%;
  align-items: center;
  justify-content: center;
`;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    elevation: 2,
  },
});

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

export const FilterButton = styled(Pressable)`
  border-radius: 10px;
  padding: 20px 40px;
  background-color: ${colors.grey};
`;

export const ButtonText = styled(Text)`
  font-weight: bold;
  color: ${colors.white};
  text-align: center;
`;
