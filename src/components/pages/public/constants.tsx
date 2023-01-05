import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import { Text } from 'src/components/shared/ui';

export const headerRoutes = [
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
  <Link key="login" to="login">
    <Button variant="contained" color="secondary">
      Log in
    </Button>
  </Link>,
];
