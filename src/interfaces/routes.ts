import { HomeRoutes, SuperAdminRoutes, UserRoutes } from 'src/constants/routes';

export interface RouteType {
  route: string;
  label: string;
  enabled?: boolean;
}

type RouteKeys = keyof typeof HomeRoutes | keyof typeof SuperAdminRoutes | keyof typeof UserRoutes;

export type RoutesTypes = {
  [key in RouteKeys]?: RouteType;
};
