import React from 'react';
import { Chip } from '@mui/material';

import { Text } from 'src/components/shared/ui';
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
    id: 'email',
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
    element: <Chip label="Inscripciones abiertas" color={'inscription'} />,
    id: 'OPEN_INSCRIPTION',
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
    label: 'NOMBRE DEL CURSO',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'ESTADO',
    cellElements: courseChipsTypes,
  },
  {
    id: 'isInternal',
    numeric: false,
    disablePadding: false,
    label: 'TIPO',
    booleanText: ['Interno', 'Externo'],
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'DURACIÓN',
    cellElements: courseTypes,
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
  {
    id: 'nota3',
    numeric: false,
    disablePadding: false,
    label: 'Nota 3',
    editable: true,
  },
  {
    id: 'nota4',
    numeric: false,
    disablePadding: false,
    label: 'Nota 4',
    editable: true,
  },
];

export { admissionTestHeadCells, courseHeadCells, userHeadCells };
