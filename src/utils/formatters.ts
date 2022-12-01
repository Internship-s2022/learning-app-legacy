import { RoleType } from 'src/interfaces/entities/course-user';

export const capitalizeFirstLetter = (text: string) => {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return '';
};

export const getRoleLabel = (role: RoleType) => {
  switch (role) {
    case 'ADMIN':
      return 'Administrador';
    case 'TUTOR':
      return 'Tutor';
    case 'AUXILIARY':
      return 'Auxiliar';
    default:
      return 'Alumno';
  }
};
