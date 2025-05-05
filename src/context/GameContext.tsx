import React, { createContext, useContext, useState } from 'react';

type GameSettings = {
  getCurrentTableWidth: number;
  getCurrentTableHeight: number;
  getCurrentMinesToGenerate: number;
  getUpdateTableWidth: number;
  getUpdateTableHeight: number;
  getMinesToGenerate: number;
  getDisplayedMines: number;
  getMineField: any[][];
  getShownMineField: any[][];
  getGameStateLoss: boolean;
  getGameStateStarted: boolean;
  getInvisible: boolean;
  getMines: number[];
  getPreGeneratedField: string;
  getAlertModalOpen: boolean;
  getAlertModalText: string;
  getRenderGeneratedFieldModalOpen: boolean;
  getHeightIndex: number;
  getWidthIndex: number;
  getDrawerOpen: boolean;
  getTimer: number;
  getTableDataIsCorrect: boolean;
  getIntervalId: NodeJS.Timeout | null;
  setCurrentTableWidth: (w: number) => void;
  setCurrentTableHeight: (h: number) => void;
  setUpdateTableWidth: (w: number) => void;
  setUpdateTableHeight: (w: number) => void;
  setCurrentMinesToGenerate: (w: number) => void;
  setMinesToGenerate: (w: number) => void;
  setDisplayedMines:  (w: number) => void;
  setMineField: (w: any[][]) => void;
  setShownMineField: (w: any[][]) => void;
  setGameStateLoss: (w: boolean) => void;
  setGameStateStarted: (w: boolean) => void;
  setInvisible: (w: boolean) => void;
  setMines: (w: number[]) => void;
  setPreGeneratedField: (w: string) => void;
  setAlertModalOpen: (w: boolean) => void;
  setAlertModalText: (w: string) => void;
  setRenderGeneratedFieldModalOpen: (w: boolean) => void;
  setHeightIndex: (w: number) => void;
  setWidthIndex: (w: number) => void;
  setDrawerOpen: (w: boolean) => void;
  setTimer: (w: number) => void;
  setTableDataIsCorrect: (w: boolean) => void;
  setIntervalId: (w: NodeJS.Timeout | null) => void;
};

export const GameContext = createContext<GameSettings | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Data
  const [getCurrentTableWidth, setCurrentTableWidth] = useState(13);
  const [getCurrentTableHeight, setCurrentTableHeight] = useState(13);
  const [getCurrentMinesToGenerate, setCurrentMinesToGenerate] = useState(30);
  const [getUpdateTableWidth, setUpdateTableWidth] = useState(getCurrentTableWidth);
  const [getUpdateTableHeight, setUpdateTableHeight] = useState(getCurrentTableHeight);
  const [getMinesToGenerate, setMinesToGenerate] = useState(getCurrentMinesToGenerate);
  const [getDisplayedMines, setDisplayedMines] = useState(getMinesToGenerate);
  const [getMines, setMines] = useState<number[]>([]);
  const [getTableDataIsCorrect, setTableDataIsCorrect] = useState(true);
  // Field
  const [getMineField, setMineField] = useState<any[][]>(Array(getCurrentTableHeight).fill(null).map(() => Array(getCurrentTableWidth).fill(0)));
  const [getShownMineField, setShownMineField] = useState<any[][]>(Array(getCurrentTableHeight).fill(null).map(() => Array(getCurrentTableWidth).fill("")));
  // Generated Field
  const [getPreGeneratedField, setPreGeneratedField] = useState("");
  const [getHeightIndex, setHeightIndex] = useState(0);
  const [getWidthIndex, setWidthIndex] = useState(0);
  // Modal
  const [getAlertModalOpen, setAlertModalOpen] = useState(false);
  const [getAlertModalText, setAlertModalText] = useState("");
  const [getRenderGeneratedFieldModalOpen, setRenderGeneratedFieldModalOpen] = useState(false);
  // Drawer
  const [getDrawerOpen, setDrawerOpen] = useState(false);
  // Game State
  const [getGameStateLoss, setGameStateLoss] = useState(false);
  const [getGameStateStarted, setGameStateStarted] = useState(false);
  // Timer
  const [getTimer, setTimer] = useState(0);
  const [getIntervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  // Dev Tools
  const [getInvisible, setInvisible] = useState(false);

  return (
    <GameContext.Provider value={{ 
      getCurrentTableWidth, getCurrentTableHeight, getCurrentMinesToGenerate, getUpdateTableWidth, 
      getUpdateTableHeight, getMinesToGenerate, getDisplayedMines, getMineField, getShownMineField, 
      getGameStateLoss, getGameStateStarted, getInvisible, getMines, getPreGeneratedField, getAlertModalOpen,
      getAlertModalText, getRenderGeneratedFieldModalOpen, getHeightIndex, getWidthIndex, getDrawerOpen, getTimer,
      getTableDataIsCorrect, getIntervalId,
      setCurrentTableWidth, setCurrentTableHeight, setCurrentMinesToGenerate, setUpdateTableWidth, 
      setUpdateTableHeight, setMinesToGenerate, setDisplayedMines, setMineField, setShownMineField, 
      setGameStateLoss, setGameStateStarted, setInvisible, setMines, setPreGeneratedField, setAlertModalOpen,
      setAlertModalText, setRenderGeneratedFieldModalOpen, setHeightIndex, setWidthIndex, setDrawerOpen, setTimer,
      setTableDataIsCorrect, setIntervalId }}>
      {children}
    </GameContext.Provider>
  );
};

export function sanitizeNumberInput(input: number | undefined | null): number {
  if (typeof input !== 'number' || isNaN(input)) {
    return 0;
  }
  return input;
}

export const useGameSettings = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameSettings must be used within a GameProvider');
  }
  return context;
};