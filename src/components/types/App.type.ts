export type AppStates = {
  pageMode: "Home" | "Game";
  userName: string;
  level: "Easy" | "Medium" | "Hard";
  dFactor: number;
  randNum: number;
};

export type AppStateActions = {
  type: "setPageMode" | "setName" | "setLevel";
  payload: string;
};
