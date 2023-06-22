import { positionToUltraPosition } from './playerPosition';

export const filteredPlayersByName = (players: any, search: string) =>
  players.filter((player: any) => {
    if (player.firstName && player.lastName) {
      const lowerCaseFirstName = player.firstName.toLowerCase();
      const lowerCaseLastName = player.lastName.toLowerCase();
      return (
        lowerCaseFirstName.startsWith(search.toLowerCase()) ||
        lowerCaseLastName.startsWith(search.toLowerCase())
      );
    }
    return null;
  });

export const filteredPlayersByPositions = (players, checkedPositions) => {
  return players.filter((player: any) => {
    const checkedUltraPositions = checkedPositions.map((checkedPosition) =>
      positionToUltraPosition(checkedPosition)
    );
    const includes = checkedUltraPositions.includes(player.ultraPosition);
    return includes;
  });
};
