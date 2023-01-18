import { HeadCell } from 'src/components/shared/ui/table/types';
import { assistanceType } from 'src/constants/head-cells';
import { ModuleType } from 'src/interfaces/entities/module';
import { Report, StudentReport } from 'src/interfaces/entities/report';

export const generateDynamicHeadCell = (data, disablePadding: boolean) => {
  if (data?.length) {
    return data?.reduce(
      (prev = [{}], obj, index) => {
        prev[index] = {
          id: obj,
          numeric: false,
          disablePadding: disablePadding,
          label: obj,
          editable: true,
        };
        return prev;
      },
      [{}],
    );
  } else {
    return [];
  }
};

export const getReportsFormattedAndHeadCells = (
  reports: StudentReport[] | Report[],
  editableHeadCell = false,
) => {
  const examHeads: string[] = [];
  const mappedReports = reports.map((report) => {
    const { exams, ...rest } = report;
    const newReport = { ...rest };
    if (Array.isArray(exams)) {
      exams.forEach((exam) => {
        examHeads.push(exam.name);
        newReport[exam.name] = exam.grade;
      });
    }
    return newReport;
  });

  const examsHeadCells = [...new Set(examHeads)].map((exam) => ({
    id: exam,
    numeric: false,
    disablePadding: false,
    label: exam,
    editable: editableHeadCell,
  }));

  const mappedExams = [...new Set(examHeads)].map((exam) => exam);
  const studentHeadCells: HeadCell[] = [
    {
      id: 'module.name',
      numeric: false,
      disablePadding: false,
      label: 'Módulo',
    },
    ...examsHeadCells,
    {
      id: 'assistance',
      numeric: false,
      disablePadding: false,
      cellElements: assistanceType,
      label: 'Asistencia',
    },
  ];
  return {
    mappedReports,
    studentHeadCells,
    mappedExams,
    examsHeadCells,
  };
};

export const getCourseStudentReportsHeadCells = (modules: ModuleType[] = []) => {
  return modules.reduce(
    (prev: HeadCell[] = [], obj: ModuleType) => {
      return [
        ...prev,
        {
          id: `reports.${obj._id}.value`,
          numeric: false,
          disablePadding: false,
          label: obj.name,
          subLabel: 'Nota | Asistencia',
        },
      ];
    },
    [
      {
        id: 'student.user.postulant.firstName',
        numeric: false,
        disablePadding: false,
        label: 'Nombre',
      },
      {
        id: 'student.user.postulant.lastName',
        numeric: false,
        disablePadding: false,
        label: 'Apellido',
      },
    ],
  );
};
