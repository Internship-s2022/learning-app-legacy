import apiClient from 'src/config/api';
import firebase from 'src/config/firebase';
import { setAuthentication } from 'src/redux/modules/auth/actions';
import { initialState } from 'src/redux/modules/auth/reducer';
import store from 'src/redux/store';

export const tokenListener = () => {
  firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const {
        claims: { userType },
      } = await user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      apiClient.defaults.headers.common['token'] = token;
      store.dispatch(
        setAuthentication({
          token,
          userType,
          isNewUser: false,
          currentUid: user.uid,
        }),
      );
    } else {
      sessionStorage.removeItem('token');
      store.dispatch(setAuthentication(initialState.authenticated));
    }
  });
};
