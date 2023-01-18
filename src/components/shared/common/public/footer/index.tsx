import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Divider, IconButton } from '@mui/material';

import { images } from 'src/assets';
import { Text } from 'src/components/shared/ui';

import styles from './footer.module.css';

const PublicScreenFooter = (): JSX.Element => {
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
        <Box className={`${styles.linksSocialContainer} ${styles.childContainer}`}>
          <IconButton
            aria-label="Facebook icon button"
            onClick={() => window.open('https://www.facebook.com/radiumrocket/')}
          >
            <FacebookIcon color="primary" />
          </IconButton>
          <IconButton
            aria-label="Twitter icon button"
            onClick={() => window.open('https://twitter.com/radiumrocket')}
          >
            <TwitterIcon color="primary" />
          </IconButton>
          <IconButton
            aria-label="Github icon button"
            onClick={() => window.open('https://github.com/RadiumRocket')}
          >
            <GitHubIcon color="primary" />
          </IconButton>
          <IconButton
            aria-label="LinkedIn icon button"
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
        <Box className={styles.childContainer}>
          <Text variant="body1" color="#0A142FAA">
            © 2022 Radium Rocket. Todos los derechos reservados.
          </Text>
        </Box>
        <img
          className={styles.image}
          src={images.rocketLogoGreen.imagePath}
          alt={images.rocketLogoGreen.alt}
        />
        <Box className={`${styles.infoTextContainer} ${styles.childContainer}`}>
          <Text variant="body1" color="#0A142FAA">
            Términos de Servicio
          </Text>
          <Text variant="body1" color="#0A142FAA">
            Política de Privacidad
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PublicScreenFooter;
