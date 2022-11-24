import { RouteType } from 'src/interfaces/routes';

export interface SideBarProps {
  sideBarRoutes: RouteType[];
  toggleSlider: () => void;
  open?: boolean;
}
