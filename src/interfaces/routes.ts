import { HomeRoutes, SuperAdminRoutes, UserRoutes } from 'src/constants/routes';

import { RoleType } from './entities/course-user';

export interface RouteType {
  route: string;
  label: string;
  enabled?: boolean;
  role?: RoleType;
}

type RouteKeys = keyof typeof HomeRoutes | keyof typeof SuperAdminRoutes | keyof typeof UserRoutes;

export type RoutesTypes = {
  [key in RouteKeys]?: RouteType;
};
