import { union } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { intersection, not } from 'src/utils/arrays-comparator';

import styles from './transfer-list.module.css';
import { TransferListData, TransferListProps } from './types';

const TransferList = ({
  options = [],
  selected = [],
  right,
  setRight,
  isLoading = false,
}: TransferListProps): JSX.Element => {
  const [checked, setChecked] = useState<TransferListData[]>([]);
  const [left, setLeft] = useState<TransferListData[]>([]);

  useEffect(() => {
    setLeft(not(options, selected));
    setRight(intersection(options, selected));
  }, [selected, options]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: TransferListData) => () => {
    const currentIndex = checked.findIndex((item) => item._id === value._id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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

  const handleToggleAll = (items: TransferListData[]) => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const numberOfChecked = (items: TransferListData[]) => intersection(checked, items).length;

  const customList = (title: React.ReactNode, items: TransferListData[]) => (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        avatar={
          <Checkbox
            sx={{
              color: '#FFFFFF',
              '&.Mui-checked': {
                color: '#FFFFFF',
              },
              '&.MuiCheckbox-indeterminate': {
                color: '#FFFFFF',
              },
              '&.Mui-disabled': {
                color: '#AAAAAA',
              },
            }}
            onClick={() => {
              handleToggleAll(items);
            }}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        variant="headerTable"
        title={<Text variant="headerTable">{title}</Text>}
        subheader={
          <Text variant="body2" color="white">{`${numberOfChecked(items)}/${
            items.length
          } seleccionados`}</Text>
        }
      />
      <Divider />
      <List className={styles.list} dense component="div" role="list">
        {!isLoading ? (
          items.map((item: TransferListData) => {
            return (
              <ListItem
                key={item._id}
                role="listitem"
                button
                onClick={handleToggle(item)}
                sx={{ backgroundColor: checked.indexOf(item) !== -1 ? '#37386714' : '' }}
              >
                <ListItemIcon>
                  <Checkbox checked={checked.indexOf(item) !== -1} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            );
          })
        ) : (
          <LinearProgress />
        )}
      </List>
    </Card>
  );

  return (
    <Box className={styles.container}>
      <Box className={styles.listContainer}>{customList('Disponibles', left)}</Box>
      <Box className={styles.buttonsContainer}>
        <Button
          className={styles.arrowButton}
          color="secondary"
          variant="contained"
          size="small"
          onClick={handleAllRight}
          disabled={left.length === 0}
          aria-label="move all right"
        >
          ≫
        </Button>
        <Button
          className={styles.arrowButton}
          color="secondary"
          variant="outlined"
          size="small"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
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
          disabled={rightChecked.length === 0}
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
          disabled={right.length === 0}
          aria-label="move all left"
        >
          ≪
        </Button>
      </Box>
      <Box className={styles.listContainer}>{customList('Asignados', right)}</Box>
    </Box>
  );
};

export default TransferList;
