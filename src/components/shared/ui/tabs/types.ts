import { SxProps, Theme } from '@mui/material';

import { RoutesTypes } from 'src/interfaces/routes';

export interface HeaderTabsProps {
  routes?: RoutesTypes;
}

interface Prop {
  element: JSX.Element;
  label: string;
}

export interface CommonTabsProps {
  elements?: Prop[];
  onChange?: () => void;
  style?: SxProps<Theme>;
}
