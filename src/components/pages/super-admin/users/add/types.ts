export interface DniFormValue {
  dni: string;
}

export interface GenerateAccountValues {
  newEmail: string;
  isInternal?: string;
}
export interface UserInfoFormValues {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  birthDate: string;
  phone: string;
  isInternal?: string;
}
