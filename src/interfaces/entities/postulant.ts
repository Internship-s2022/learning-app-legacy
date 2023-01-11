import { GeneralDataType } from 'src/interfaces';

export interface Postulant extends GeneralDataType {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  age?: number;
  dni: string;
  email: string;
  phone: string;
  isActive: boolean;
}
