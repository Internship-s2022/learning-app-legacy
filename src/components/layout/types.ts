import { RoutesTypes, RouteType } from 'src/interfaces/routes';

export interface LayoutProps {
  headerRoutes?: RoutesTypes;
  children?: JSX.Element | JSX.Element[];
  sidebarOn?: boolean;
  footerOn?: boolean;
  textTitle?: string;
  sideBarRoutes?: RouteType[];
}
