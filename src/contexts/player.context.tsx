import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Player {
  fullName: string;
  clubName: string;
  id: string;
  position: string;
}

export interface MyContextData {
  player: Player | undefined;
  update: (updatedPlayer: Player) => void;
}

export const PlayerContext = createContext<MyContextData | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;
  const [player, setPlayer] = useState<Player>();
  const update = (newPlayer: Player) => {
    setPlayer(newPlayer);
  };
  const contextValue = {
    player,
    update,
  };

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};
