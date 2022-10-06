import React from 'react';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Avatar, Link } from '@mui/material';
import { Box } from '@mui/system';

import styles from './footer.module.css';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.container}>
      <Box
        sx={{
          borderTop: ' 1px solid grey',
          width: '90%',
        }}
      />
      <Avatar src="https://radiumrocket.com/static/rocket-logo-883f208f5b6a41d21540cfecae22fa07.png" />
      <Box className={styles.linksContainers}>
        <Link>News</Link>
        <Link>Links</Link>
        <Link>Rocket</Link>
        <Link>Radium</Link>
      </Box>
      <Box className={styles.license}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '50%',
            margin: '20px',
            backgrounColor: '#373867',
          }}
        >
          <Link href="https://www.facebook.com/radiumrocket" target="_blank" rel="noreferrer">
            <Facebook />
          </Link>
          <Link href="https://twitter.com/radiumrocket" target="_blank" rel="noreferrer">
            <Instagram />
          </Link>
          <Link href="https://www.instagram.com/radium.rocket/" target="_blank" rel="noreferrer">
            <LinkedIn />
          </Link>
          <Link href="https://www.instagram.com/radium.rocket/" target="_blank" rel="noreferrer">
            <Twitter />
          </Link>
        </Box>
      </Box>
      <Box className={styles.copyright}>Copyright © 2022 Radium Rocket</Box>
    </footer>
  );
};

export default Footer;
