import { TransferListData } from 'src/components/shared/ui/transfer-list/types';

export interface AddModulesProps {
  selectedModules: TransferListData[];
  setSelectedModules: React.Dispatch<React.SetStateAction<TransferListData[]>>;
  isValidContinueModules: boolean;
}
