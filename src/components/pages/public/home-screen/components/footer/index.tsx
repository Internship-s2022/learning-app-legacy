import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Divider, IconButton } from '@mui/material';

import { images } from 'src/assets';
import { Text } from 'src/components/shared/ui';

import styles from './footer.module.css';

const HomeScreenFooter = (): JSX.Element => {
  return (
    <Box component="footer" className={styles.container}>
      <Box className={styles.linksContainer}>
        <Box className={styles.linksTextContainer}>
          <a key="aboutUs" href="https://radiumrocket.com/" target="_blank" rel="noreferrer">
            <Text variant="subtitle1">Sobre nosotros</Text>
          </a>
          <a
            key="contact"
            href={`mailto:${process.env.REACT_APP_CONTACT_MAIL}`}
            target="_blank"
            rel="noreferrer"
          >
            <Text variant="subtitle1">Contáctanos</Text>
          </a>
          <a key="courses" href="#courses-section">
            <Text variant="subtitle1">Cursos</Text>
          </a>
        </Box>
        <Box className={styles.linksSocialContainer}>
          <IconButton onClick={() => window.open('https://www.facebook.com/radiumrocket/')}>
            <FacebookIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => window.open('https://twitter.com/radiumrocket')}>
            <TwitterIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => window.open('https://www.youtube.com/channel/UCsJLZUI7yEr4XdRhUB7_4dA')}
          >
            <YouTubeIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => window.open('https://www.linkedin.com/company/radium-rocket/mycompany/')}
          >
            <LinkedInIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
      <Box className={styles.divider}>
        <Divider />
      </Box>

      <Box className={styles.infoContainer}>
        <img
          className={styles.image}
          src={images.rocketLogoGreen.imagePath}
          alt={images.rocketLogoGreen.alt}
        />
        <Text variant="body1" color="#0A142FAA">
          © 2022 Radium Rocket. Todos los derechos reservados.
        </Text>
        <Box className={styles.infoTextContainer}>
          <Text variant="body1" color="#0A142FAA">
            Terminos de Servicio
          </Text>
          <Text variant="body1" color="#0A142FAA">
            Política de Privacidad
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreenFooter;
