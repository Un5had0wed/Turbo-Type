import React, { useEffect, useReducer } from "react";
import {
  GameBoardStates,
  GameBoardActions,
} from "../../components/types/GameBoard.type";

const getScoreDisplay = (timer: number) => {
  let seconds = timer;

  const timeUnits: [string, number][] = [
    ["hr", 3600],
    ["min", 60],
    ["s", 1],
  ];

  const outstr = timeUnits
    .map(([unit, divisor]) => {
      const value = Math.trunc(seconds / divisor);
      seconds %= divisor;

      if (value !== 0) {
        return value === 1 ? `1 ${unit}` : `${value} ${unit}`;
      }

      return "";
    })
    .join(" ");

  return outstr;
};

function reducer(
  state: GameBoardStates,
  action: GameBoardActions
): GameBoardStates {
  switch (action.type) {
    case "setGameMode":
      return {
        ...state,
        gameOn: !(state.gameOn),
      };
    case "setWord": {
      const j = Math.floor(Math.random() * action.data!.length);

      return {
        ...state,
        randWord: action.data![j].toUpperCase(),
        wordTimer: Math.ceil(
          action.data![j].length / (action.payload as number)
        ),
      };
    }
    case "decrementWordTimer":
      return {
        ...state,
        wordTimer: state.wordTimer - 1,
      };
    case "setAllScores":
      return {
        ...state,
        allScores: [
          ...state.allScores,
          {
            scoreTimer: state.curScore.scoreTimer,
            scoreDisplay: state.curScore.scoreDisplay,
            gameNo: "Game " + String(state.allScores.length + 1),
          },
        ],
      };
    case "setTopScore":
      return {
        ...state,
        topScore: {
          scoreTimer: state.curScore.scoreTimer,
          scoreDisplay: state.curScore.scoreDisplay,
          gameNo: "Game " + String(state.allScores.length),
        },
      };
    case "setScore":
        return {
            ...state,
            curScore: {
                scoreTimer: action.payload as number,
                scoreDisplay: getScoreDisplay(action.payload as number)
            }
        }
    case "incrementScore":
      return {
        ...state,
        curScore: {
          scoreTimer: state.curScore.scoreTimer + 1,
          scoreDisplay: getScoreDisplay(state.curScore.scoreTimer + 1),
        },
      };
    case "setGameInput":
      return {
        ...state,
        gameInput: action.payload as string,
      };
    default:
      return state;
  }
}

function useGameHandler(states: GameBoardStates): [GameBoardStates, React.Dispatch<GameBoardActions>] {
  const [gameStates, dispatch] = useReducer(reducer, states);

  // timer for word
  useEffect(() => {
    if (gameStates.wordTimer == 0) {
      dispatch({ type: "setGameMode" });
      return;
    }

    const intervalId = setInterval(() => {
      dispatch({ type: "decrementWordTimer" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameStates.wordTimer, gameStates.randWord]);

  // timer for the game
  useEffect(() => {
    if (gameStates.wordTimer == 0) {
      dispatch({ type: "setAllScores" });

      if (gameStates.topScore.scoreTimer < gameStates.curScore.scoreTimer)
        dispatch({ type: "setTopScore" });

      return;
    }

    const scoreIntervalId = setInterval(() => {
      dispatch({ type: "incrementScore" });
    }, 1000);

    return () => clearInterval(scoreIntervalId);
  }, [gameStates.curScore.scoreTimer]);

  return [gameStates, dispatch];
}

export default useGameHandler;
