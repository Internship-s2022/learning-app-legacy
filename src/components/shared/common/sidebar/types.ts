import { RouteType } from 'src/interfaces/routes';

export interface SidebarProps {
  sidebarRoutes: RouteType[];
  toggleSlider: () => void;
  open?: boolean;
}
