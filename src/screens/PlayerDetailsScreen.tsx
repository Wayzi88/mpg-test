import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { PlayerContext } from '../contexts/player.context';
import { fetchApi } from '../utils/fetchApi';
import { playerPosition } from '../utils/playerPosition';
import { styled } from 'styled-components';
import { colors } from '../styles/colors';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface PlayerDetails {
  position: string;
  rating: number;
  quotation: number;
  playedMatches: number;
  concededGoals: number;
  goals: number;
  fouls: number;
}

export const PlayerDetailsScreen = () => {
  const { player } = useContext(PlayerContext);
  const [playerDetails, setPlayerDetails] = useState<PlayerDetails>();
  useEffect(() => {
    if (player) {
      fetchApi(`championship-player-stats/${player.id}/2022`).then((res) => {
        const position = playerPosition(res.ultraPosition);

        const details = Object.values(res.championships)[0];

        setPlayerDetails({
          position,
          rating: details.keySeasonStats.averageRating,
          quotation: details.keySeasonStats.quotation,
          concededGoals: details.total.stats.totalGoalsConceded,
          playedMatches: details.total.stats.totalPlayedMatches,
          goals: details.total.stats.totalGoals,
          fouls: details.total.stats.totalFouls,
        });
      });
    }
  }, [player]);

  return (
    <MainContainer>
      {playerDetails && player ? (
        <CardContainer>
          <CardTitle>{player.fullName}</CardTitle>
          <Text>
            <DetailTitle>Club</DetailTitle>: {player.clubName}
          </Text>
          <Text>
            <DetailTitle>Position</DetailTitle>: {playerDetails.position}
          </Text>
          <Text>
            <DetailTitle>Note</DetailTitle>: {playerDetails.rating.toFixed(1)}
          </Text>
          <Text>
            <DetailTitle>Cote</DetailTitle>: {playerDetails.quotation}
          </Text>
          <Text>
            <DetailTitle>Match joués</DetailTitle>: {playerDetails.playedMatches}
          </Text>
          <Text>
            <DetailTitle>Total buts</DetailTitle>: {playerDetails.goals}
          </Text>
          <Text>
            <DetailTitle>Nombre de fautes</DetailTitle>: {playerDetails.fouls}
          </Text>
        </CardContainer>
      ) : (
        <LoadingSpinner />
      )}
    </MainContainer>
  );
};

const MainContainer = styled(View)`
  background-color: ${colors.lightGrey};
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

const CardContainer = styled(View)`
  background-color: ${colors.white};
  width: 60%;
  height: 50%;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 7px 29px ${colors.lightGrey};
`;

const CardTitle = styled(Text)`
  color: ${colors.black};
  font-size: 22px;
  text-align: center;
  margin-bottom: 10px;
`;

const DetailTitle = styled(Text)`
  color: ${colors.grey};
  font-size: 16px;
`;
