export interface HeadCell<DataType> {
  disablePadding: boolean;
  id: keyof DataType;
  label: string;
  numeric: boolean;
}
export interface TableProps<DataType> {
  headCells: HeadCell<DataType>[];
  rows: DataType[];
  icons: boolean;
  exportButtons: boolean;
  title?: string;
  filters?: Filter[];
  handleDelete?: (_id: string) => void;
  handleEdit?: (_id: string) => void;
  handleExportTable?: (_ids: string[]) => void;
  handleExportSelection?: (_ids: string[]) => void;
}

export interface CustomTableHeadProps<DataType> {
  headCells: HeadCell<DataType>[];
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  icons: boolean;
}
type Filter = 'id' | 'name' | 'status';

export interface CustomTableFiltersProps {
  filters: Filter[];
}

export type TableFiltersForm = {
  id: string;
  name: string;
  status: string;
};
