import { SubmitHandler } from 'react-hook-form';

import { Pagination } from 'src/interfaces';

type Filter = 'id' | 'name' | 'status';

export type EditableTableData = {
  row: { _id: string; [key: string]: string };
  [key: string]: unknown;
};

interface Filters {
  id?: string;
  name?: string;
  status?: string;
}

export type ChipType = {
  element: JSX.Element;
  id: string;
  disableDeleteButton?: boolean;
};

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  booleanText?: [string, string];
  cellElements?: ChipType[];
  editable?: boolean;
}

export interface TableProps<DataType> {
  headCells: HeadCell[];
  rows: DataType[];
  isLoading?: boolean;
  pagination: Pagination;
  checkboxes?: boolean;
  deleteIcon: boolean;
  editIcon: boolean;
  customIconText?: string;
  handleDelete?: (_id: string) => void;
  handleEdit?: (_id: string) => void;
  handleCustomIcon?: (_id: string) => void;
  exportButton: boolean;
  handleExportTable?: () => void;
  handleExportSelection?: (_ids: string[]) => void;
  filter?: string;
  onFiltersSubmit?: SubmitHandler<Record<string, string>>;
  addButton?: { text: string; addPath: string };
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saveEditableText?: string;
  onEditableSubmit?: SubmitHandler<EditableTableData>;
  onInputChange?: SubmitHandler<EditableTableData>;
  selectedObjects?: DataType[];
  setSelectedObjects?: React.Dispatch<React.SetStateAction<DataType[]>>;
}
export interface CustomTableHeadProps {
  headCells: HeadCell[];
  numSelected: number;
  checkboxes: boolean;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  deleteIcon: boolean;
  editIcon: boolean;
  style: React.CSSProperties;
  saveEditableText: string;
  customIconText: string;
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
  headCells: HeadCell[];
  row: DataType;
  isItemSelected: boolean;
  checkboxes: boolean;
  deleteIcon: boolean;
  editIcon: boolean;
  customIconText?: string;
  handleDelete?: (_id: string) => void;
  handleEdit?: (_id: string) => void;
  handleCustomIcon?: (_id: string) => void;
  style: React.CSSProperties;
  saveEditableText?: string;
  onEditableSubmit?: SubmitHandler<EditableTableData>;
  onInputChange?: SubmitHandler<EditableTableData>;
  handleObjectCheckboxClick?: (object: DataType, setValue?: 'uncheck' | 'check') => void;
  index?: number;
}
