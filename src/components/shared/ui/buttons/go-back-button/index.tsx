import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { Text } from 'src/components/shared/ui';
import useWindowDimensions from 'src/hooks/useWindowDimensions';

import styles from './go-back-button.module.css';
import { GoBackButtonProps } from './types';

const GoBackButton = ({ route }: GoBackButtonProps): JSX.Element => {
  const { isPhone } = useWindowDimensions();

  return (
    <Link to={route} className={styles.container}>
      <ArrowBackRoundedIcon sx={{ color: 'subtitle.main', fontSize: isPhone ? '18px' : '24px' }} />
      <Text variant="h2" fontWeight="400" color="subtitle" fontSize={isPhone ? '14px' : '18px'}>
        Volver
      </Text>
    </Link>
  );
};

export default GoBackButton;
