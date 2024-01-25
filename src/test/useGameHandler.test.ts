import { renderHook, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import useGameHandler from "../assets/service/useGameHandler";

// Mock SetWordlist
jest.mock("../assets/service/SetWordlist", () => ({
  __esModule: true,
  default: jest.fn(() => ["mocked", "wordlist"]),
}));

const initialStates = {
  gameOn: false,
  randWord: "",
  wordTimer: 0,
  wordList: ["apple", "banana", "orange"], // Adjust as needed
  dFactor: 1,
  difficulty: "Easy" as "Easy" | "Medium" | "Hard",
  allScores: [],
  topScore: {
    scoreTimer: 0,
    scoreDisplay: "",
    gameNo: "Game 0",
  },
  curScore: {
    scoreTimer: 0,
    scoreDisplay: "",
  },
  gameInput: "",
};

describe("useGameHandler Hook", () => {
  test("reducer sets game mode correctly", () => {
    const { result } = renderHook(() => useGameHandler(initialStates));

    act(() => {
      result.current[1]({ type: "setGameMode" });
    });

    expect(result.current[0].gameOn).toBe(false);
  });

  test("reducer sets word and word timer correctly", () => {
    const { result } = renderHook(() => useGameHandler(initialStates));

    act(() => {
      result.current[1]({ type: "setWord" });
    });

    expect(result.current[0].wordTimer).toBeGreaterThan(0);
  });

  test("reducer decrements word timer correctly", () => {
    const { result } = renderHook(() => useGameHandler(initialStates));

    act(() => {
      result.current[1]({ type: "decrementWordTimer" });
    });

    expect(result.current[0].wordTimer).toBe(initialStates.wordTimer - 1);
  });

  test("useGameHandler updates state correctly", () => {
    const { result } = renderHook(() => useGameHandler(initialStates));

    act(() => {
      result.current[1]({ type: "setGameInput", payload: "test" });
    });

    expect(result.current[0].gameInput).toBe("test");
  });
});
