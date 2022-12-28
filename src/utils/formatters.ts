import { RoleType } from 'src/interfaces/entities/course-user';
import { AdmissionResult } from 'src/interfaces/entities/postulant-course';
import { Report } from 'src/interfaces/entities/report';
import { UserType } from 'src/redux/modules/auth/types';

export const capitalizeFirstLetter = (text: string) => {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return '';
};

export const getRoleLabel = (role: RoleType, type: UserType) => {
  if (type === 'NORMAL') {
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
  }
  return 'Super admin';
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

export const convertPostulantCourses = (data, views) => {
  return data
    ?.reduce((prev = [], obj, index) => {
      const {
        _id,
        postulant: { _id: postulantId, lastName, firstName, email, age, location },
      } = obj;
      const view = views?.find((v) => v._id == obj.view)?.name;
      const admissionInfo = obj.admissionResults.reduce((acc = {}, admRe: AdmissionResult) => {
        return {
          ...acc,
          [admRe.admissionTest.name]: { score: admRe.score, admissionResult: admRe._id },
        };
      }, {});
      prev[index] = {
        _id,
        postulantId,
        firstName,
        lastName,
        location,
        age,
        email,
        view,
        ...admissionInfo,
      };
      return prev;
    }, [])
    .sort((a: { firstName: string }, b: { firstName: string }) =>
      a.firstName.localeCompare(b.firstName),
    );
};

export const convertDatatoNotes = (data, admissionTests) => {
  const scores = admissionTests?.reduce(
    (prev = [{}], testName, index) => {
      prev[index] = {
        admissionResult: data.row[testName].admissionResult,
        score: Number(data[testName]),
      };
      return prev;
    },
    [{}],
  );
  return { postulantId: data.row.postulantId, scores };
};

export const convertRoleToRoute = (role: RoleType, courseId: string) => {
  switch (role) {
    case 'ADMIN':
      return `/admin/course/${courseId}`;
    case 'TUTOR':
      return `/tutor/course/${courseId}`;
    case 'AUXILIARY':
      return `/auxiliary/course/${courseId}`;
    default:
      return `/student/course/${courseId}`;
  }
};
