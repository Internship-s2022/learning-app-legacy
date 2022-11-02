export interface CourseType {
  name: string;
  inscriptionStartDate: string;
  inscriptionEndDate: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
  isInternal: boolean;
  isActive: boolean;
}

export interface CourseFormValues {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  technologies: string[];
}

export interface AddCourseType {
  setCourseId: React.Dispatch<React.SetStateAction<string>>;
}
