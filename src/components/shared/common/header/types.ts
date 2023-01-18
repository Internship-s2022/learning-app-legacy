import { RoutesTypes } from 'src/interfaces/routes';

export interface HeaderProps {
  routes?: RoutesTypes;
  logoutOption?: boolean;
  textTitle?: string;
  toggleSlider: () => void;
}
