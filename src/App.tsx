import { useReducer } from "react";
import { AppStates, AppStateActions } from "./components/types/App.type";
import Form from "./components/Form";
import GameBoard from "./components/GameBoard";
import SetWordlist from "./assets/service/SetWordlist";
import "./assets/styles/App.css";

const initialStates: AppStates = {
  pageMode: "Home",
  userName: "",
  level: "Easy",
  dFactor: 1,
  wordList: SetWordlist("Easy"),
  randNum: Math.floor(Math.random() * SetWordlist("Easy").length),
};

function reducer(state: AppStates, action: AppStateActions) {
  switch (action.type) {
    case "setPageMode":
      return {
        ...state,
        pageMode: action.payload as "Home" | "Game",
      };
    case "setName":
      return {
        ...state,
        userName: action.payload,
      };
    case "setLevel":
      return {
        ...state,
        level: action.payload as "Easy" | "Medium" | "Hard",
        dFactor:
          action.payload === "Hard" ? 2 : action.payload === "Medium" ? 1.5 : 1,
        wordList: SetWordlist(action.payload),
        randNum: Math.floor(Math.random() * SetWordlist(action.payload).length),
      };
    default:
      return state;
  }
}

function App() {
  const [appStates, dispatch] = useReducer(reducer, initialStates);
  if (appStates.pageMode === "Home") {
    return (
      <div className="app">
        <Form appStates={appStates} setAppState={dispatch} />
      </div>
    );
  } else if (appStates.pageMode === "Game") {
    return (
      <div className="app">
        <GameBoard appStates={appStates} />
      </div>
    );
  }
}

export default App;
