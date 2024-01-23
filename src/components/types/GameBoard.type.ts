import { AppStates } from "./App.type";

export type GameBoardProps = {
  appStates: AppStates;
};

export type GameBoardStates = {
  randWord: string;
  gameInput: string;
  gameOn: boolean;
  wordTimer: number;
  curScore: {
    scoreTimer: number;
    scoreDisplay: string;
  };
  topScore: {
    scoreTimer: number;
    scoreDisplay: string;
    gameNo: string;
  };
  allScores: {
    scoreTimer: number;
    scoreDisplay: string;
    gameNo: string;
  }[];
};

export type GameBoardActions = {
  type:
    | "setGameMode"
    | "setWord"
    | "decrementWordTimer"
    | "setGameInput"
    | "setScore"
    | "setTopScore"
    | "setAllScores"
    | "incrementScore";
  payload?: number | string;
  data?: string[];
};
