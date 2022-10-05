import { GridColDef } from '@mui/x-data-grid';

export interface TableProps<TRowType> {
  rows: Array<TRowType>;
  columns: GridColDef[];
}
