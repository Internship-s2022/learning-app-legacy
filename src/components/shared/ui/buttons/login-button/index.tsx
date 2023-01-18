import React from 'react';
import { Link } from 'react-router-dom';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import { Text } from 'src/components/shared/ui';
import useWindowDimensions from 'src/hooks/useWindowDimensions';

import styles from './login-button.module.css';

const LoginButton = (): JSX.Element => {
  const { isDesktop } = useWindowDimensions();

  return (
    <Link to="/login" className={styles.container}>
      <LoginRoundedIcon
        sx={{
          color: 'subtitle.light',
          marginRight: isDesktop ? 1 : 0.5,
          width: isDesktop ? 24 : 18,
        }}
      />
      <Text
        variant="subtitle2"
        fontWeight="500"
        sx={{
          color: '#555555',
          typography: {
            md: {
              fontSize: '16px',
            },
            lg: {
              fontSize: '20px',
            },
          },
        }}
      >
        Iniciar Sesión
      </Text>
    </Link>
  );
};

export default LoginButton;
