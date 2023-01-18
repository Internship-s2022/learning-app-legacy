import React from 'react';

import { LoginButton, Text } from 'src/components/shared/ui';

export const publicHeaderRoutes = [
  <a key="courses" href="#courses-section">
    <Text variant="headerLink">Cursos</Text>
  </a>,
  <a key="contact" href="https://radiumrocket.com/#form" target="_blank" rel="noreferrer">
    <Text variant="headerLink">Contáctanos</Text>
  </a>,
  <a key="aboutUs" href="https://radiumrocket.com/" target="_blank" rel="noreferrer">
    <Text variant="headerLink">Sobre nosotros</Text>
  </a>,
  <LoginButton key="login" />,
];

export const publicDrawerRoutes = [
  { href: '#courses-section', text: 'Cursos' },
  {
    href: 'https://radiumrocket.com/#form',
    text: 'Contáctanos',
    target: '_blank',
    rel: 'noreferrer',
  },
  {
    href: 'https://radiumrocket.com/',
    text: 'Sobre nosotros',
    target: '_blank',
    rel: 'noreferrer',
  },
];
