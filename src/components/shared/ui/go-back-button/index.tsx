import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { Text } from 'src/components/shared/ui';

import styles from './go-back-button.module.css';
import { GoBackButtonProps } from './types';

const GoBackButton = ({ route }: GoBackButtonProps): JSX.Element => {
  return (
    <Link to={route} className={styles.container}>
      <ArrowBackRoundedIcon sx={{ color: 'subtitle.main' }} />
      <Text variant="h2" fontWeight="400" color="subtitle">
        Volver
      </Text>
    </Link>
  );
};

export default GoBackButton;
