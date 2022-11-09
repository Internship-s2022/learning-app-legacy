import { GeneralDataType } from 'src/interfaces';

export interface Postulant extends GeneralDataType {
  firstName: string;
  lastName: string;
  birthDate: string;
  location: string;
  dni: string;
  email: string;
  phone: string;
  isActive: boolean;
}
