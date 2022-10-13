export interface PrivateRouteProps {
  role: 'SUPER_ADMIN' | 'NORMAL';
  redirectPath?: string;
  children: JSX.Element;
}
