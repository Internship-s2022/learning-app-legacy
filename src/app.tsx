import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { UserRoutes } from 'src/constants/routes';
import { tokenListener } from 'src/utils/token-listener';

import { router } from './routes';

const App = (): JSX.Element => {
  useEffect(() => {
    tokenListener(({ isNewUser }) => {
      if (isNewUser) {
        router.navigate(UserRoutes.newPassword.route);
      } else {
        router.navigate(router.state.location.pathname);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
