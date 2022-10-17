type RoleProp = 'SUPER_ADMIN' | 'NORMAL';

export interface PrivateRouteProps {
  role?: RoleProp[];
  redirectPath?: string;
  children?: JSX.Element;
}
