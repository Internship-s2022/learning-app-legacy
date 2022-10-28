import { HomeRoutes, SuperAdminRoutes } from 'src/constants/routes';

interface RouteTypes {
  route: string;
  label: string;
  disabled?: boolean;
}

type RouteKeys = keyof typeof HomeRoutes | keyof typeof SuperAdminRoutes;

export type RoutesTypes = {
  [key in RouteKeys]?: RouteTypes;
};
