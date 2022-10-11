import { SubmitHandler } from 'react-hook-form';

type Filter = 'id' | 'name' | 'status';

interface Filters {
  id?: string;
  name?: string;
  status?: string;
}

export interface HeadCell<DataType> {
  disablePadding: boolean;
  id: keyof DataType;
  label: string;
  numeric: boolean;
}

export interface TableProps<DataType> {
  headCells: HeadCell<DataType>[];
  rows: DataType[];
  title?: string;
  icons: boolean;
  handleDelete?: (_id: string) => void;
  handleEdit?: (_id: string) => void;
  exportButtons: boolean;
  handleExportTable?: (_ids: string[]) => void;
  handleExportSelection?: (_ids: string[]) => void;
  filters?: Filter[];
  onFiltersSubmit?: SubmitHandler<Filters>;
}

export interface CustomTableHeadProps<DataType> {
  headCells: HeadCell<DataType>[];
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  icons: boolean;
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
  icons: boolean;
  handleDelete?: (_id: string) => void;
  handleEdit?: (_id: string) => void;
}
