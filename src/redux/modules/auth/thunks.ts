import { Dispatch } from 'redux';

import firebase from 'src/config/firebase';

import * as actions from './actions';
import { CredentialsProp } from './types';

export const login = (data: CredentialsProp) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.login.request(''));
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      const token = await response.user.getIdToken();
      const {
        claims: { userType },
      } = await response.user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      return dispatch(actions.login.success({ token, userType }));
    } catch (error) {
      dispatch(actions.login.failure(error.message));
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.logout.request(''));
    try {
      const response = await firebase.auth().signOut();
      sessionStorage.clear();
      console.log(response);
      return dispatch(actions.logout.success(response));
    } catch (error) {
      dispatch(actions.logout.failure(error.message));
    }
  };
};
