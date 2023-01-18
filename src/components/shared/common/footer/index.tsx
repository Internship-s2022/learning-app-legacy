import React from 'react';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Avatar, Link } from '@mui/material';
import { Box } from '@mui/system';

import styles from './footer.module.css';

const Footer = (): JSX.Element => {
  return (
    <footer data-testid="footer-container-div" className={styles.container}>
      <Box className={styles.lineFooter} />
      <Avatar src="https://radiumrocket.com/static/rocket-logo-883f208f5b6a41d21540cfecae22fa07.png" />
      <Box className={styles.linksContainers}>
        <Link component="button">News</Link>
        <Link component="button">Links</Link>
        <Link component="button">Rocket</Link>
        <Link component="button">Radium</Link>
      </Box>
      <Box className={styles.linksContainers}>
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

      <Box className={styles.copyright}>Copyright © 2022 Radium Rocket</Box>
    </footer>
  );
};

export default Footer;
