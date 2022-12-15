import { TransferListData } from 'src/components/shared/ui/transfer-list/types';

export interface CustomListProps {
  title: React.ReactNode;
  items: TransferListData[];
  checked: TransferListData[];
  setChecked: React.Dispatch<React.SetStateAction<TransferListData[]>>;
  isLoading?: boolean;
  disableButtons?: boolean;
}
