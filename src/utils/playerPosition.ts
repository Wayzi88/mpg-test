import { PositionEnum } from '../enums/position.enum';

export const playerPosition = (positionNumber: number) => {
  switch (positionNumber) {
    case 10:
      return PositionEnum.GARDIEN;
    case 20:
      return PositionEnum.DEFENSEUR;
    case 21:
      return PositionEnum.LATERAL;
    case 30:
      return PositionEnum.MILIEU_DEFENSIF;
    case 31:
      return PositionEnum.MILIEU_OFFENSIF;
    case 40:
      return PositionEnum.ATTAQUANT;
    default:
      console.log(`Unknown position`);
  }
};
