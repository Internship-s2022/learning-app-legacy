import apiClient from 'src/config/api';
import firebase from 'src/config/firebase';
import { setAuthentication } from 'src/redux/modules/auth/actions';
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
          currentUid: undefined,
        }),
      );
    } else {
      sessionStorage.removeItem('token');
      store.dispatch(
        setAuthentication({
          token: undefined,
          userType: undefined,
          isNewUser: false,
          currentUid: undefined,
        }),
      );
    }
  });
};
