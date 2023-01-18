import { GeneralDataType } from 'src/interfaces';
import { Postulant } from 'src/interfaces/entities/postulant';

export interface User extends GeneralDataType {
  email?: string;
  firebaseUid: string;
  postulant: Postulant;
  isInternal: boolean;
  isActive: boolean;
  isNewUser?: boolean;
}
