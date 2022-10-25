import { HeadCell } from 'src/components/shared/ui/table/types';
import { User } from 'src/redux/modules/user/types';

const userHeadCells: HeadCell<User>[] = [
  {
    id: 'postulantId.firstName',
    numeric: false,
    disablePadding: false,
    label: 'NOMBRE',
  },
  {
    id: 'postulantId.lastName',
    numeric: false,
    disablePadding: false,
    label: 'APELLIDO',
  },
  {
    id: 'postulantId.dni',
    numeric: false,
    disablePadding: false,
    label: 'DNI',
  },
  {
    id: 'postulantId.email',
    numeric: false,
    disablePadding: false,
    label: 'MAIL',
  },
  {
    id: 'isInternal',
    numeric: false,
    disablePadding: false,
    label: 'TIPO',
    booleanText: ['Employee', 'Student'],
  },
];

export { userHeadCells };
