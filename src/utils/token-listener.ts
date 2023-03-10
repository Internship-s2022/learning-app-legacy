import apiClient from 'src/config/api';
import firebase from 'src/config/firebase';
import { setAuthentication } from 'src/redux/modules/auth/actions';
import { initialState } from 'src/redux/modules/auth/reducer';
import { getMe } from 'src/redux/modules/auth/thunks';
import store from 'src/redux/store';

export const tokenListener = (
  onTokenChanged: (
    params: Partial<{
      isNewUser: boolean;
    }>,
  ) => void,
) => {
  sessionStorage.setItem('isLoading', 'true');
  firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const {
        claims: { userType, isNewUser },
      } = await user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      apiClient.defaults.headers.common['token'] = token;
      store.dispatch(
        setAuthentication({
          userType,
          isNewUser,
          currentUid: user.uid,
        }),
      );
      sessionStorage.setItem('isLoading', 'false');
      if (userType === 'NORMAL') {
        await store.dispatch(getMe());
      }
      onTokenChanged({ isNewUser });
    } else {
      sessionStorage.removeItem('token');
      store.dispatch(setAuthentication(initialState.authenticated));
      sessionStorage.setItem('isLoading', 'false');
    }
  });
};
