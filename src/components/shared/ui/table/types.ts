import { SubmitHandler } from 'react-hook-form';

type Filter = 'id' | 'name' | 'status';

interface Filters {
  id?: string;
  name?: string;
  status?: string;
}

export interface HeadCell<DataType> {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  booleanText?: [string, string];
}

export interface TableProps<DataType> {
  headCells: HeadCell<DataType>[];
  rows: DataType[];
  deleteIcon: boolean;
  editIcon: boolean;
  handleDelete?: (_id: string) => void;
  handleEdit?: (_id: string) => void;
  exportButton: boolean;
  handleExportTable?: (entity: string) => void;
  handleExportSelection?: (_ids: string[]) => void;
  filter?: string;
  onFiltersSubmit?: SubmitHandler<Record<string, StringConstructor>>;
  addButton?: { text: string; addPath: string };
}

export interface CustomTableHeadProps<DataType> {
  headCells: HeadCell<DataType>[];
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  deleteIcon: boolean;
  editIcon: boolean;
}

export interface CustomTableFiltersProps {
  filters: Filter[];
  onFiltersSubmit: SubmitHandler<Filters>;
}

export interface TableFiltersForm {
  id: string;
  name: string;
  status: string;
}

export interface CustomTableRowProps<DataType> {
  headCells: HeadCell<DataType>[];
  row: DataType;
  isItemSelected: boolean;
  handleCheckboxClick: (event: React.MouseEvent<unknown>, _id: string) => void;
  deleteIcon: boolean;
  editIcon: boolean;
  handleDelete?: (_id: string) => void;
  handleEdit?: (_id: string) => void;
}
