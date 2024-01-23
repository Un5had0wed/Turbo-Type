import { FormEvent, useEffect, useRef } from "react";
import logo from "../assets/images/logo.png";
import { FormProps } from "./types/Form.type";
import "../assets/styles/Form.css";

function Form({ appStates, setAppState }: FormProps) {
  const level_options = [
    { value: "Easy", text: "Easy" },
    { value: "Medium", text: "Medium" },
    { value: "Hard", text: "Hard" },
  ];

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (appStates.userName != "")
      setAppState({ type: "setPageMode", payload: "Game" });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <img className="form__logo" src={logo} alt="logo" />

        <div className="heading__grp">
          <h1 className="form__heading form__heading--main">Turbo Type</h1>
          <span className="form__heading form__heading--tagline">
            Typing Triumph Challenge
          </span>
        </div>

        <input
          type="text"
          name="name"
          value={appStates.userName}
          onChange={(e) => {
            setAppState({ type: "setName", payload: e.target.value });
          }}
          placeholder="Enter your name"
          className="form__inp"
          ref={inputRef}
          required
        />

        <select
          name="level"
          value={appStates.level}
          onChange={(e) => {
            setAppState({ type: "setLevel", payload: e.target.value });
          }}
          className="form__select"
        >
          {level_options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        <button className="form__btn" type="submit">
          Start Game
        </button>
      </form>
    </div>
  );
}

export default Form;
