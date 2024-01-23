import { AppStates, AppStateActions } from "./App.type";

export type FormProps = {
    appStates: AppStates
    setAppState: React.Dispatch<AppStateActions>
}