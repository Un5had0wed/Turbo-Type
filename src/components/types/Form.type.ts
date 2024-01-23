import { States, StateActions } from "./App.type";

export type FormProps = {
    appStates: States
    setAppState: React.Dispatch<StateActions>
}