export interface HeadCell<DataType> {
  disablePadding: boolean;
  id: keyof DataType;
  label: string;
  numeric: boolean;
}
export interface TableProps<DataType> {
  headCells: HeadCell<DataType>[];
  rows: DataType[];
  icons?: boolean;
  title?: string;
  handleDelete?: (_id: string) => void;
  handleEdit?: (_id: string) => void;
}

export interface CustomTableHeadProps<DataType> {
  headCells: HeadCell<DataType>[];
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  icons: boolean;
}

export interface CustomTableToolbarProps {
  numSelected: number;
  title?: string;
}
