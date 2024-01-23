import { GameBoardStates, GameBoardActions } from "./types/GameBoard.type"
import restartImg from "../assets/images/refresh-arrow.png"
import quitImg from "../assets/images/delete-cross.png"
import React from "react";
import "../assets/styles/Game.css";

type GameProps = {
    gbStates: GameBoardStates
    wordList: string[]
    setGBState: React.Dispatch<GameBoardActions>
    dFactor: number
    restart: () => void
    quit: () => void
}

function Game({gbStates, wordList, setGBState, dFactor, restart, quit}: GameProps) {
    const wordChars = gbStates.randWord.split("");

    const handleGameInput = (value: string) => {
        setGBState({type:"setGameInput", payload:value.toUpperCase()})
        const wlen = gbStates.randWord.length;
        const inpWord = value;
        const inpLen = inpWord.length;
    
        // remove colors before in order to avoid coloring of word after new word is shown
        for(let i=0; i<wlen; i++){
          document.getElementById(String(i))!.classList.remove('correct', 'incorrect');
        }
    
        // give colors based on input
        for(let i=0; i<inpLen; i++){
          if(inpWord[i].toUpperCase() === gbStates.randWord[i]){
            document.getElementById(String(i))!.classList.add('correct');
          } else {
            document.getElementById(String(i))!.classList.add('incorrect');
          }
        }
        if (value.toUpperCase() === gbStates.randWord ) {
          // clear color before new word is selected
          for(let i=0; i<wlen; i++){
            document.getElementById(String(i))!.classList.remove('correct','incorrect');
          }
          setGBState({type:"setWord", data: wordList, payload: dFactor})
          setGBState({type:"setGameInput", payload: ""})
        }
      }
    
    if(gbStates.gameOn) {
        return (
            <div className="game-on">
            <div className="game-timer">    
                <h1>{gbStates.wordTimer}s</h1>
            </div>
            <div className="word-display">
                {wordChars.map((char,index) => <h2 key={index} id={String(index)} className="char">{char}</h2>)}
            </div>
            <input 
            type="text" 
            className="game-input"
            maxLength={gbStates.randWord.length}
            value={gbStates.gameInput}
            onChange={(e) => handleGameInput(e.target.value)}/>
        </div>
        )
    } else {
        return (
            <div className="game-over">
                <div className="score-display">
                    <h1 className="score-display__header">Score : {gbStates.curScore.scoreDisplay}</h1>
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
        )
    }
}

export default Game
