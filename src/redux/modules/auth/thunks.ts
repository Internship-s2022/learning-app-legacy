import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import apiClient from 'src/config/api';
import firebase from 'src/config/firebase';

import { ApiResponse, RootReducer } from '../types';
import * as actions from './actions';
import { ChangePassProp, ChangePassResponse, CredentialsProp, GetMeInfo } from './types';

export const login = (data: CredentialsProp) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.login.request(''));
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      const currentUid = response.user.uid;
      const token = await response.user.getIdToken();
      const {
        claims: { userType, isNewUser },
      } = await response.user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      apiClient.defaults.headers.common['token'] = token;
      return dispatch(actions.login.success({ isNewUser, userType, currentUid }));
    } catch (error) {
      throw dispatch(actions.login.failure(error));
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
      dispatch(actions.logout.success(''));
    } catch (error) {
      dispatch(actions.logout.failure(error));
    }
  };
};

export const newPassword = ({ firebaseUid, newPassword, isNewUser }: ChangePassProp) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.newPass.request(''));
    try {
      const response = await apiClient.patch<ApiResponse<ChangePassResponse>>(
        '/auth/me/update-password/',
        {
          firebaseUid,
          newPassword,
          isNewUser,
        },
      );
      dispatch(actions.newPass.success(''));
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.newPass.failure(error));
    }
  };
};

export const getMe = () => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getMe.request(''));
    try {
      {
        const response = await apiClient.get<GetMeInfo>('/auth/me');
        return dispatch(actions.getMe.success(response.data));
      }
    } catch (error) {
      dispatch(actions.getMe.failure(error));
    }
  };
};
