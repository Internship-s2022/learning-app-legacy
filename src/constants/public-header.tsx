import React from 'react';

import { LoginButton, Text } from 'src/components/shared/ui';

export const publicHeaderRoutes = [
  <a key="courses" href="#courses-section">
    <Text variant="headerLink">Cursos</Text>
  </a>,
  <a key="contact" href="https://radiumrocket.com/#form" target="_blank" rel="noreferrer">
    <Text>Contáctanos</Text>
  </a>,
  <a key="aboutUs" href="https://radiumrocket.com/" target="_blank" rel="noreferrer">
    <Text variant="headerLink">Sobre nosotros</Text>
  </a>,
  <LoginButton key="login" />,
];
