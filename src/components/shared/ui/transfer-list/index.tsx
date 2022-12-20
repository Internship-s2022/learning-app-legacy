import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

import { intersection, not } from 'src/utils/arrays-comparator';

import CustomList from './components/list';
import styles from './transfer-list.module.css';
import { TransferListData, TransferListProps } from './types';

const TransferList = ({
  options = [],
  selected = [],
  right,
  setRight,
  isLoading = false,
  disableButtons = false,
}: TransferListProps): JSX.Element => {
  const [checked, setChecked] = useState<TransferListData[]>([]);
  const [left, setLeft] = useState<TransferListData[]>([]);

  useEffect(() => {
    setLeft(not(options, selected));
    setRight(intersection(options, selected));
  }, [options, isLoading]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.listContainer}>
        <CustomList
          title="Disponibles"
          items={left}
          checked={checked}
          setChecked={setChecked}
          isLoading={isLoading}
          disableButtons={disableButtons}
        />
      </Box>
      <Box className={styles.buttonsContainer}>
        <Button
          className={styles.arrowButton}
          color="secondary"
          variant="contained"
          size="small"
          onClick={handleAllRight}
          disabled={left.length === 0 || disableButtons}
        >
          ≫
        </Button>
        <Button
          className={styles.arrowButton}
          color="secondary"
          variant="outlined"
          size="small"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0 || disableButtons}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          className={styles.arrowButton}
          color="secondary"
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0 || disableButtons}
          aria-label="move selected left"
        >
          &lt;
        </Button>
        <Button
          className={styles.arrowButton}
          color="secondary"
          variant="contained"
          size="small"
          onClick={handleAllLeft}
          disabled={right.length === 0 || disableButtons}
          aria-label="move all left"
        >
          ≪
        </Button>
      </Box>
      <Box className={styles.listContainer}>
        <CustomList
          title="Asignados"
          items={right}
          checked={checked}
          setChecked={setChecked}
          isLoading={isLoading}
          disableButtons={disableButtons}
        />
      </Box>
    </Box>
  );
};

export default TransferList;
