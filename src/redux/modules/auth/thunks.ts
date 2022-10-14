import { Dispatch } from 'redux';

import firebase from 'src/config/firebase';

import * as actions from './actions';
import { CredentialsProp } from './types';

export const login = (data: CredentialsProp) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.login.request(''));
    return firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        const {
          claims: { userType },
        } = await response.user.getIdTokenResult();
        sessionStorage.setItem('token', token);
        return dispatch(actions.login.success({ token, userType }));
      })
      .catch((error) => dispatch(actions.login.failure(error.message)));
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        sessionStorage.clear();
        return dispatch(actions.logout());
      });
  };
};
