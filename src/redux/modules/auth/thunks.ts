import { Dispatch } from 'redux';

import apiClient from 'src/config/api';
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
      apiClient.defaults.headers.common['token'] = token;
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
      await firebase.auth().signOut();
      sessionStorage.clear();
      apiClient.defaults.headers.common['token'] = '';
      return dispatch(actions.logout.success({}));
    } catch (error) {
      dispatch(actions.logout.failure(error.message));
    }
  };
};
