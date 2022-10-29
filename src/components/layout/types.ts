import { RoutesTypes } from 'src/interfaces/routes';

export interface LayoutProps {
  routes?: RoutesTypes;
  children?: JSX.Element | JSX.Element[];
  logoutOption?: boolean;
  sidebarOn?: boolean;
  footerOn?: boolean;
}
