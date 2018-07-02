import {Action} from '@ngrx/store';
import {AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: string;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true,
        user: action.payload,
      }
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false,
        user: null,
      };
    default: {
      return state;
    }
  }
}


export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getUserEmail = (state: State) => state.user;
