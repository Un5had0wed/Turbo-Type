import { GameBoardStates, GameBoardActions } from "./types/GameBoard.type";
import restartImg from "../assets/images/refresh-arrow.png";
import quitImg from "../assets/images/delete-cross.png";
import { useRef, useEffect } from "react";
import "../assets/styles/Game.css";

type GameProps = {
  gbStates: GameBoardStates;
  setGBState: React.Dispatch<GameBoardActions>;
  restart: () => void;
  quit: () => void;
};

function Game({
  gbStates,
  setGBState,
  restart,
  quit,
}: GameProps) {
  const wordChars = gbStates.randWord.split("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  const getClass = (char: string, index: number) => {
    let charClass: string = "";

    if (index < gbStates.gameInput.length && gbStates.gameInput.length > 0) {
      if (char == gbStates.gameInput[index]) charClass = "correct";
      else charClass = "incorrect";
    }
    return charClass;
  };

  const handleGameInput = (value: string) => {
    setGBState({ type: "setGameInput", payload: value.toUpperCase() });

    if (value.toUpperCase() === gbStates.randWord) {
      setGBState({ type: "incrementDifficulty", payload : 0.01})
      setGBState({ type: "setWord"});
      setGBState({ type: "setGameInput", payload: "" });
    }
  };

  if (gbStates.gameOn) {
    return (
      <div className="game-on">
        <div className="game-timer">
          <h1>{gbStates.wordTimer}s</h1>
        </div>
        <div className="word-display">
          {wordChars.map((char, index) => {
            const charClass = getClass(char, index);
            return (
              <h2 key={index} id={String(index)} className={charClass}>
                {char}
              </h2>
            );
          })}
        </div>
        <input
          type="text"
          className="game-input"
          maxLength={gbStates.randWord.length}
          value={gbStates.gameInput}
          onChange={(e) => handleGameInput(e.target.value)}
          ref={inputRef}
        />
      </div>
    );
  } else {
    return (
      <div className="game-over">
        <div className="score-display">
          <h1 className="score-display__header">
            Score : {gbStates.curScore.scoreDisplay}
          </h1>
        </div>
        <a className="btn" onClick={() => restart()}>
          <div className="btn-container">
            <img className="btn__logo" src={restartImg} alt="restart" />
            <h1 className="btn__content">Play Again</h1>
          </div>
        </a>
        <a className="btn" onClick={() => quit()}>
          <div className="btn-container">
            <img className="btn__logo" src={quitImg} alt="quit" />
            <h1 className="btn__content">Quit Game</h1>
          </div>
        </a>
      </div>
    );
  }
}

export default Game;
