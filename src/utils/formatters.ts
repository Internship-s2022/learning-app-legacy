import { RoleType } from 'src/interfaces/entities/course-user';
import { Report } from 'src/interfaces/entities/report';

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

export const mapReports = (reports: Report[], defaultModules: Record<string, string>) => {
  if (reports.length) {
    return reports?.reduce((prev = [], report, index) => {
      const reportId = [report._id];
      const {
        _id,
        postulant: { firstName, lastName },
      } = report.courseUser.user;

      const moduleInfo = {
        [report.module.name]: `${
          report.exams[0].grade === 10 ? report.exams[0].grade : '0' + report.exams[0].grade
        } | ${report.assistance ? 'Asistió' : 'No asistió'}`,
      };

      const indexResult = prev.findIndex((item) => item._id === _id);
      if (indexResult === -1) {
        prev[index] = { _id, reportId, firstName, lastName, ...defaultModules, ...moduleInfo };
      } else {
        prev[indexResult].reportId.push(report._id);
        prev[indexResult] = { ...prev[indexResult], ...moduleInfo };
      }
      return prev;
    }, []);
  } else {
    return [];
  }
};
