import { GameBoardProps, GameBoardStates } from "./types/GameBoard.type";
import avatar from "../assets/images/avatar.png";
import game_control from "../assets/images/game-control.png";
import useGameHandler from "../assets/service/useGameHandler";
import Game from "./Game";
import TopScore from "./TopScore";
import "../assets/styles/GameBoard.css";
import SetWordlist from "../assets/service/SetWordlist";

function GameBoard({ appStates }: GameBoardProps) {
  const wlist = SetWordlist(appStates.level);

  const initialGBStates: GameBoardStates = {
    difficulty: appStates.level,
    dFactor: appStates.dFactor,
    wordList: wlist,
    randWord: wlist[appStates.randNum].toUpperCase(),
    gameInput: "",
    gameOn: true,
    wordTimer: wlist[appStates.randNum].length,
    curScore: {
      scoreTimer: 0,
      scoreDisplay: "",
    },
    topScore: {
      scoreTimer: 0,
      scoreDisplay: "",
      gameNo: "",
    },
    allScores: [],
  };

  const [gbStates, setGBState] = useGameHandler(initialGBStates);

  const restart = () => {
    setGBState({ type: "setDifficulty", payload: appStates.level });
    setGBState({ type: "setFactor", payload: appStates.dFactor });
    setGBState({ type: "setWord" });
    setGBState({ type: "setScore", payload: 0 });
    setGBState({ type: "setGameInput", payload: "" });
    setGBState({ type: "setGameMode" });
  };

  const quit = () => {
    window.location.reload();
  };

  return (
    <div className="game-container">
      <div className="top">
        <div className="profile">
          <div className="profile-container">
            <img
              className="profile-container__logo"
              src={avatar}
              alt="avatar"
            />
            <h3 className="profile-container__content">{appStates.userName}</h3>
          </div>
          <div className="profile-container">
            <img
              className="profile-container__logo"
              src={game_control}
              alt="difficulty level"
            />
            <h3 className="profile-container__content">
              {gbStates.difficulty}
            </h3>
          </div>
        </div>

        <div className="score">
          <div className="score-container">
            <h3 className="game-name">Turbo Type</h3>
          </div>
          <div className="score-container">
            <h3>Score: {gbStates.curScore.scoreDisplay}</h3>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="score-board">
          <h3 className="score-board__heading">SCORE BOARD</h3>
          {gbStates.allScores.map((score) => (
            <li className="scores-li" key={score.gameNo}>
              {score.gameNo}: {score.scoreDisplay}
            </li>
          ))}
        </div>
        <div className="game-area">
          <Game
            gbStates={gbStates}
            setGBState={setGBState}
            restart={restart}
            quit={quit}
          />
        </div>
      </div>

      <TopScore topScore={gbStates.topScore} />
    </div>
  );
}

export default GameBoard;
