import { union } from 'lodash';
import React from 'react';
import {
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

import { TransferListData } from '../../types';
import styles from './custom-list.module.css';
import { CustomListProps } from './types';

const CustomList = ({ title, items, checked, setChecked, isLoading }: CustomListProps) => {
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

  const handleToggleAll = (items: TransferListData[]) => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const numberOfChecked = (items: TransferListData[]) => intersection(checked, items).length;

  return (
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
};
export default CustomList;
