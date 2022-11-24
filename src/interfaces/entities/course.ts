import { AdmissionTest } from 'src/interfaces/entities/admission-test';

import { SelectedUsers } from './course-user';

export interface Course {
  _id: string;
  name: string;
  admissionTests?: AdmissionTest[];
  courseUsers?: SelectedUsers[];
  description: string;
  inscriptionStartDate: string;
  inscriptionEndDate: string;
  startDate: string;
  endDate: string;
  type: string;
  isInternal: boolean;
  isActive: boolean;
}
