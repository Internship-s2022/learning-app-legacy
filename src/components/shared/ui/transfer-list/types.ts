export interface TransferListData {
  _id: string;
  name: string;
}

export interface TransferListProps {
  options: TransferListData[];
  selected: TransferListData[];
  right: TransferListData[];
  setRight: React.Dispatch<React.SetStateAction<TransferListData[]>>;
  isLoading?: boolean;
  disableButtons?: boolean;
}
