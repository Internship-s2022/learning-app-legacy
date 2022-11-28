import { RoutesTypes } from 'src/interfaces/routes';

export interface HeaderNavProps {
  routes?: RoutesTypes;
  logoutOption?: boolean;
  textTitle?: string;
  toggleSlider: () => void;
}
