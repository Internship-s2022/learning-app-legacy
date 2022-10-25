import { Dispatch } from 'redux';

import apiClient from 'src/config/api';
import firebase from 'src/config/firebase';

import { ApiResponse } from '../types';
import * as actions from './actions';
import { ChangePassProp, CredentialsProp } from './types';

export const login = (data: CredentialsProp) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.login.request(''));
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      const currentUid = response.user.uid;
      const responseNewUser = await apiClient.patch(`/user/update/${currentUid}`);
      const isNewUser = responseNewUser.data;
      const token = await response.user.getIdToken();
      const {
        claims: { userType },
      } = await response.user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      apiClient.defaults.headers.common['token'] = token;
      return dispatch(actions.login.success({ token, isNewUser, userType, currentUid }));
    } catch (error) {
      throw dispatch(actions.login.failure(error.message));
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
      dispatch(actions.logout.failure(error));
    }
  };
};

export const newPassword = ({ firebaseUid, newPassword }: ChangePassProp) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.newPass.request(''));
    try {
      const response = await apiClient.patch<ApiResponse<ChangePassProp>>(
        '/auth/me/update-password/',
        {
          firebaseUid,
          newPassword,
        },
      );
      dispatch(actions.newPass.success(response));
    } catch (error) {
      dispatch(actions.newPass.failure(error));
    }
  };
};
