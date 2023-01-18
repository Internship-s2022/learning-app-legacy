import { UserType } from 'src/redux/modules/auth/types';

export interface PrivateRouteProps {
  role?: UserType[];
  redirectPath?: string;
  children?: JSX.Element;
}
