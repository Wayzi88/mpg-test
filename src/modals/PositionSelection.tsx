import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import Checkbox from 'expo-checkbox';
import { PositionEnum } from '../enums/position.enum';
import { Button } from '../components/Button';

interface PositionSelectionModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setCheckedPositions: Dispatch<SetStateAction<[] | string[]>>;
}

export const PositionSelectionModal = ({
  modalVisible,
  setModalVisible,
  setCheckedPositions,
}: PositionSelectionModalProps) => {
  const playerPositionArray: string[] = Object.values(PositionEnum);
  const [totalFilters, setTotalFilters] = useState<string[]>([]);

  const handlePositionSelection = (position: string) => {
    const isSelected = totalFilters.includes(position);
    if (isSelected) {
      // If already selected, remove it from the totalFilters array
      setTotalFilters(totalFilters.filter((pos) => pos !== position));
    } else {
      // If not selected, add it to the totalFilters array
      setTotalFilters([...totalFilters, position]);
    }
  };

  const handleOnValidate = () => {
    setCheckedPositions(totalFilters);
    setModalVisible(!modalVisible);
  };

  const handleOnReset = () => {
    setTotalFilters([]);
    setCheckedPositions([]);
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
            {playerPositionArray.map((position) => (
              <CheckBoxContainer key={position}>
                <Checkbox
                  value={totalFilters.length > 0 ? totalFilters.includes(position) : false}
                  onValueChange={() => {
                    handlePositionSelection(position);
                  }}
                  color={
                    totalFilters.length > 0 && totalFilters.includes(position)
                      ? colors.primary
                      : undefined
                  }
                />
                <PlayerPosition>{position}</PlayerPosition>
              </CheckBoxContainer>
            ))}
          </CheckBoxesContainer>
          <Button title="Valider" handleOnPress={handleOnValidate} color={colors.primary} />
          <Button title="Réinitialiser" handleOnPress={handleOnReset} color={colors.secondary} />
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
  height: 80%;
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
