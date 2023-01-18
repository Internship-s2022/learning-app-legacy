import React from 'react';
import { Link } from 'react-router-dom';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import { Text } from 'src/components/shared/ui';

import styles from './login-button.module.css';

const LoginButton = (): JSX.Element => {
  return (
    <Link to="/login" className={styles.container}>
      <LoginRoundedIcon sx={{ color: 'subtitle.light', width: 18, height: 18, marginRight: 0.5 }} />
      <Text variant="subtitle2" fontWeight="400">
        Iniciar Sesión
      </Text>
    </Link>
  );
};

export default LoginButton;
