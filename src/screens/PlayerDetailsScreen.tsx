import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { PlayerContext } from '../contexts/player.context';
import { fetchApi } from '../utils/fetchApi';
import { playerPosition } from '../utils/playerPosition';

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
    <View>
      {playerDetails && player ? (
        <View>
          <Text>{player.fullName}</Text>
          <Text>{playerDetails.position}</Text>
          <Text>{playerDetails.rating}</Text>
          <Text>{playerDetails.quotation}</Text>
          <Text>{playerDetails.goals}</Text>
        </View>
      ) : (
        <Text>Jattends...</Text>
      )}
    </View>
  );
};
