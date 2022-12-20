import React from 'react';
import { Chip } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { ChipType, HeadCell } from 'src/components/shared/ui/table/types';

const userHeadCells: HeadCell[] = [
  {
    id: 'postulant.firstName',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'postulant.lastName',
    numeric: false,
    disablePadding: false,
    label: 'Apellido',
  },
  {
    id: 'postulant.dni',
    numeric: false,
    disablePadding: false,
    label: 'DNI',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'isInternal',
    numeric: false,
    disablePadding: false,
    label: 'Tipo',
    booleanText: ['Empleado', 'Estudiante'],
  },
];

const courseChipsTypes: ChipType[] = [
  {
    element: <Chip label="Completado" color="success" />,
    id: 'COMPLETED',
  },
  {
    element: <Chip label="En curso" color="primary" />,
    id: 'IN_PROGRESS',
    disableDeleteButton: true,
  },
  {
    element: <Chip label="Próximo" variant="filled" />,
    id: 'SOON',
  },
  {
    element: <Chip label="Inscripciones abiertas" color="inscription" />,
    id: 'OPEN_INSCRIPTION',
  },
];

const moduleChipsTypes: ChipType[] = [
  {
    element: <Chip label="Pendiente" variant="filled" />,
    id: 'PENDING',
  },
  {
    element: <Chip label="En curso" color="primary" />,
    id: 'IN_PROGRESS',
    disableDeleteButton: true,
  },
  {
    element: <Chip label="Completado" color="success" />,
    id: 'COMPLETED',
    disableDeleteButton: true,
  },
];

const courseTypes: ChipType[] = [
  {
    element: <Text>Express</Text>,
    id: 'EXPRESS',
  },
  {
    element: <Text>Full</Text>,
    id: 'FULL',
  },
];

const courseHeadCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nombre del curso',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
    cellElements: courseChipsTypes,
  },
  {
    id: 'isInternal',
    numeric: false,
    disablePadding: false,
    label: 'Tipo',
    booleanText: ['Interno', 'Externo'],
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Duración',
    cellElements: courseTypes,
  },
];

const registrationFormHeadCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Vistas',
  },
];

const moduleFormHeadCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Módulo',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
    cellElements: moduleChipsTypes,
  },
];

const admissionTestHeadCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Test de admision',
  },
];

const courseUserHeadCells: HeadCell[] = [
  {
    id: 'postulant.firstName',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'postulant.lastName',
    numeric: false,
    disablePadding: false,
    label: 'Apellido',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
];

const courseUserChipsTypes: ChipType[] = [
  {
    element: <Chip label="Alumno" color="student" />,
    id: 'STUDENT',
  },
  {
    element: <Chip label="Tutor" color="tutor" />,
    id: 'TUTOR',
  },
  {
    element: <Chip label="Auxiliar" color="auxiliary" />,
    id: 'AUXILIARY',
  },
  {
    element: <Chip label="Administrador" color="admin" />,
    id: 'ADMIN',
  },
];

const courseUserWithRoleHeadCells: HeadCell[] = [
  {
    id: 'user.postulant.firstName',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'user.postulant.lastName',
    numeric: false,
    disablePadding: false,
    label: 'Apellido',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Rol',
    cellElements: courseUserChipsTypes,
  },
];

const courseUserWithoutRoleHeadCells: HeadCell[] = courseUserWithRoleHeadCells.slice(0, -1);

const studentHeadCells: HeadCell[] = [
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Apellido',
  },
];

const postulantCourseHeadCells: HeadCell[] = [
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Apellido',
  },
  {
    id: 'age',
    numeric: false,
    disablePadding: false,
    label: 'Edad',
  },
  {
    id: 'location',
    numeric: false,
    disablePadding: false,
    label: 'Ubicación',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Mail',
  },
  {
    id: 'view',
    numeric: false,
    disablePadding: false,
    label: 'Tipo de formulario',
  },
];

export {
  admissionTestHeadCells,
  courseHeadCells,
  courseUserHeadCells,
  courseUserWithoutRoleHeadCells,
  courseUserWithRoleHeadCells,
  moduleFormHeadCells,
  postulantCourseHeadCells,
  registrationFormHeadCells,
  studentHeadCells,
  userHeadCells,
};
