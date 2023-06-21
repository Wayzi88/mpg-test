import type { ParamListBase } from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  HomeScreen: undefined;
  PlayerDetailsScreen: {
    fullName: string;
    clubId: string;
    playerId: string;
  };
}
