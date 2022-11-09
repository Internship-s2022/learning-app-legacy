import { AdmissionTest } from 'src/interfaces/entities/admission-test';

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
