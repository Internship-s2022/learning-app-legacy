import { HeadCell } from 'src/components/shared/ui/table/types';
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

const courseHeadCells: HeadCell<Course>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nombre del curso',
  },
  {
    id: 'isActive',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
    booleanText: ['Activo', 'Inactivo'],
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Tipo',
  },
];

export { courseHeadCells, userHeadCells };
