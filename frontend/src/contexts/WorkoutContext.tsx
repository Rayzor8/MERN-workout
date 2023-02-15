import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { WorkoutsType } from "../types";

interface ProviderProps {
  children: ReactNode;
}

interface WorkoutsCtx {
  state: WorkoutsState;
  dispatch: Dispatch<WorkoutsAction>;
}

export enum WorkoutsEnum {
  SET_WORKOUTS = "SET_WORKOUTS",
  CREATE_WORKOUT = "CREATE_WORKOUT",
  DELETE_WORKOUT = "DELETE_WORKOUT",
}

interface WorkoutsAction {
  type: WorkoutsEnum;
  payload: any;
}

interface WorkoutsState {
  workouts: WorkoutsType[];
}

// state
const initialState: WorkoutsState = {
  workouts: [],
};

export const WorkoutsContext = createContext<WorkoutsCtx>({
  state: initialState,
  dispatch: () => {},
});

export function workoutsReducer(
  state: WorkoutsState,
  action: WorkoutsAction
): WorkoutsState {
  const { type, payload } = action;

  switch (type) {
    case WorkoutsEnum.SET_WORKOUTS:
      return {
        workouts: payload,
      };
    case WorkoutsEnum.CREATE_WORKOUT:
      return {
        workouts: [payload, ...state.workouts],
      };
    case WorkoutsEnum.DELETE_WORKOUT:
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== payload._id
        ),
      };
    default:
      return state;
  }
}

const WorkoutsContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);
  const contextValue: WorkoutsCtx = {
    state,
    dispatch,
  };

  return (
    <WorkoutsContext.Provider value={contextValue}>
      {children}
    </WorkoutsContext.Provider>
  );
};

export default WorkoutsContextProvider;
