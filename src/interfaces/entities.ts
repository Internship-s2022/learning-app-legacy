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

export interface User extends GeneralDataType {
  email?: string;
  firebaseUid: string;
  postulant: Postulant;
  isInternal: boolean;
  isActive: boolean;
}

export interface AdmissionTest {
  _id: string;
  name: string;
  isActive: boolean;
}

export interface Course {
  _id: string;
  name: string;
  admissionTests: AdmissionTest[];
  description: string;
  inscriptionStartDate: string;
  inscriptionEndDate: string;
  startDate: string;
  endDate: string;
  type: string;
  isInternal: boolean;
  isActive: boolean;
}
