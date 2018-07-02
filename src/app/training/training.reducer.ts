import {trainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING} from './training.actions';
import {Action, createFeatureSelector, createSelector} from '@ngrx/store';
import {Training} from './training.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableTrainings: Training[];
  finishedTrainings: Training[];
  activeTraining: Training;
}

export interface RootState extends fromRoot.State {
  training: TrainingState;
}


const initialState: TrainingState = {
  availableTrainings: [],
  finishedTrainings: [],
  activeTraining: null,
};

export function trainingReducer(state = initialState, action: trainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableTrainings: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedTrainings: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: { ...state.availableTrainings.find(training => training.id === action.payload) }
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null,
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');


export const getAvailableTrainings = createSelector(getTrainingState, (state: TrainingState) => state.availableTrainings);
export const getFinishedTrainings = createSelector(getTrainingState, (state: TrainingState) => state.finishedTrainings);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);

export const getIsActive = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
