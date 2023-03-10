import { RoleType } from 'src/interfaces/entities/course-user';
import { AdmissionResult } from 'src/interfaces/entities/postulant-course';
import { ExamType, Report } from 'src/interfaces/entities/report';
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

export const convertPostulantCourses = (data, views) => {
  return data
    ?.reduce((prev = [], obj, index) => {
      const {
        _id,
        postulant: { _id: postulantId, lastName, firstName, email, age, country },
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
        country,
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

export const convertModuleReports = (data) => {
  return data
    ?.reduce((prev = [], obj: Report, index) => {
      const {
        _id,
        courseUser: {
          user: {
            postulant: { firstName, lastName },
          },
        },
        assistance,
      } = obj;
      const reportInfo = obj.exams.reduce((acc = {}, exam: ExamType) => {
        return {
          ...acc,
          [exam.name]: { _id: exam._id, grade: exam.grade, name: exam.name },
        };
      }, {});
      prev[index] = {
        _id,
        firstName,
        lastName,
        assistance,
        ...reportInfo,
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
    case 'AUXILIARY':
      return '/user/home';
    default:
      return `/student/course/${courseId}`;
  }
};

export const convertDatatoExams = (data, currentExams, convertExams = true) => {
  const exams = currentExams?.reduce(
    (prev = [{}], examName, index) => {
      prev[index] = {
        _id: data.row[examName]._id,
        grade: convertExams ? Number(data[examName]) : Number(data.row[examName].grade),
      };
      return prev;
    },
    [{}],
  );
  return {
    _id: data.row._id,
    exams,
    assistance: convertExams ? data.row.assistance : data.assistance,
  };
};
