import React from 'react';
import Button from '@mui/material/Button';

import { Text } from 'src/components/shared/ui';
import { router } from 'src/routes';

export const publicHeaderRoutes = [
  <a key="courses" href="#courses-section">
    <Text>Cursos</Text>
  </a>,
  <a
    key="contact"
    href={`mailto:${process.env.REACT_APP_CONTACT_MAIL}`}
    target="_blank"
    rel="noreferrer"
  >
    <Text>Contáctanos</Text>
  </a>,
  <a key="aboutUs" href="https://radiumrocket.com/" target="_blank" rel="noreferrer">
    <Text>Sobre nosotros</Text>
  </a>,
  <Button
    key="login"
    variant="contained"
    color="secondary"
    onClick={() => router.navigate('/login')}
  >
    Log in
  </Button>,
];
