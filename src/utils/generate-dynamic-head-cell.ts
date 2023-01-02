import { HeadCell } from 'src/components/shared/ui/table/types';
import { assistanceType } from 'src/constants/head-cells';
import { StudentReport } from 'src/interfaces/entities/report';

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

export const getReportsFormattedAndHeadCells = (reports: StudentReport[]) => {
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
  }));

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
  };
};
