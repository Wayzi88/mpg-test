import { PositionEnum } from '../enums/position.enum';

export const ultraPositionToPosition = (positionNumber: number) => {
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

export const positionToUltraPosition = (position: PositionEnum) => {
  switch (position) {
    case PositionEnum.GARDIEN:
      return 10;
    case PositionEnum.DEFENSEUR:
      return 20;
    case PositionEnum.LATERAL:
      return 21;
    case PositionEnum.MILIEU_DEFENSIF:
      return 30;
    case PositionEnum.MILIEU_OFFENSIF:
      return 31;
    case PositionEnum.ATTAQUANT:
      return 40;
    default:
      console.log(`Unknown position`);
  }
};
