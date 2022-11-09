import React from 'react';
import { Chip } from '@mui/material';

import { ChipType, HeadCell } from 'src/components/shared/ui/table/types';

const userHeadCells: HeadCell[] = [
  {
    id: 'postulant.firstName',
    numeric: false,
    disablePadding: false,
    label: 'NOMBRE',
  },
  {
    id: 'postulant.lastName',
    numeric: false,
    disablePadding: false,
    label: 'APELLIDO',
  },
  {
    id: 'postulant.dni',
    numeric: false,
    disablePadding: false,
    label: 'DNI',
  },
  {
    id: 'postulant.email',
    numeric: false,
    disablePadding: false,
    label: 'MAIL',
  },
  {
    id: 'isInternal',
    numeric: false,
    disablePadding: false,
    label: 'TIPO',
    booleanText: ['Empleado', 'Estudiante'],
  },
];

const courseChipsTypes: ChipType[] = [
  {
    element: <Chip label="Completado" color="success" />,
    id: 'Completado',
  },
  {
    element: <Chip label="En curso" color="primary" />,
    id: 'En curso',
    disableDeleteButton: true,
  },
  {
    element: <Chip label="Próximo" variant="outlined" />,
    id: 'Próximo',
  },
];

const courseHeadCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'NOMBRE DEL CURSO',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'ESTADO',
    chips: true,
    chipsTypes: courseChipsTypes,
  },
  {
    id: 'isInternal',
    numeric: false,
    disablePadding: false,
    label: 'TIPO',
    booleanText: ['Interno', 'Externo'],
  },
];

const admissionTestHeadCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'NOMBRE',
  },
  {
    id: 'nota1',
    numeric: false,
    disablePadding: false,
    label: 'Nota 1',
    editable: true,
  },
  {
    id: 'nota2',
    numeric: false,
    disablePadding: false,
    label: 'Nota 2',
    editable: true,
  },
];

export { admissionTestHeadCells, courseHeadCells, userHeadCells };
