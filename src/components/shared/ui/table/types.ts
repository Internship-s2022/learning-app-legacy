export interface HeadCell<DataType> {
  disablePadding: boolean;
  id: keyof DataType;
  label: string;
  numeric: boolean;
}
export interface TableProps<TRowData> {
  headCells: any;
  rows: TRowData[];
  icons?: boolean;
  handleDelete?: any;
  handleEdit?: any;
}
export interface CustomTableProps {
  numSelected: number;
  headCells: [any];
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  icons: boolean;
}

export interface CustomTableToolbarProps {
  numSelected: number;
}
