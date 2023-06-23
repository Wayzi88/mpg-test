import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Player {
  fullName: string;
  clubName: string;
  id: string;
  position?: string;
}

export interface MyContextData {
  player: Player;
  updatePlayer: (updatedPlayer: Player) => void;
  error: string;
  updateError: (title: string) => void;
}

export const PlayerContext = createContext<MyContextData | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;
  const [player, setPlayer] = useState<Player>();
  const [error, setIsError] = useState('');
  const updatePlayer = (newPlayer: Player) => {
    setPlayer(newPlayer);
  };
  const updateError = (title: string) => {
    setIsError(title);
  };
  const contextValue = {
    player,
    updatePlayer,
    error,
    updateError,
  };

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};
