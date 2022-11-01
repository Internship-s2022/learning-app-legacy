import React from 'react';
import { Chip } from '@mui/material';

import { ChipType, HeadCell } from 'src/components/shared/ui/table/types';
import { Course } from 'src/redux/modules/course/types';
import { User } from 'src/redux/modules/user/types';

const userHeadCells: HeadCell<User>[] = [
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

const courseHeadCells: HeadCell<Course>[] = [
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
  {
    id: 'aaa',
    numeric: false,
    disablePadding: false,
    label: 'edit',
    editable: true,
  },
  {
    id: 'bbb',
    numeric: false,
    disablePadding: false,
    label: 'edit2',
    editable: true,
  },
];

export { courseHeadCells, userHeadCells };
