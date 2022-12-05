import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button } from '@mui/material';

import { LoadingButton, Text, TransferList } from 'src/components/shared/ui';
import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getAdmissionTests } from 'src/redux/modules/admission-test/thunks';
import { editCourse, getCourseById } from 'src/redux/modules/course/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { isArrayEqual } from 'src/utils/arrays-comparator';

import styles from './admission-test.module.css';

const AdmissionTestAsignation = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { course, isLoading } = useAppSelector((state: RootReducer) => state.course);
  const { admissionTests, isLoading: isLoadingAdmTests } = useAppSelector(
    (state: RootReducer) => state.admissionTest,
  );
  const [right, setRight] = useState<TransferListData[]>([]);

  useEffect(() => {
    if (course?._id !== courseId) dispatch(getCourseById(courseId));
    if (!admissionTests?.length) dispatch(getAdmissionTests(''));
  }, [location.pathname]);

  const onSaveClick = async () => {
    const admissionTests = right.map((item) => item._id);
    await dispatch(
      editCourse(course?._id, { ...course, _id: undefined, admissionTests: admissionTests }),
    );
  };

  return (
    <Box className={styles.container}>
      <Box>
        <Text variant="h1">Tests de admision</Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Selecciona los tests que deseas agregar a este curso.
        </Text>
      </Box>
      <Box className={styles.buttonsContainer}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mr: 3 }}
          startIcon={<CloseIcon />}
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancelar
        </Button>
        <LoadingButton
          variant="contained"
          isLoading={isLoading || isLoadingAdmTests}
          type="submit"
          color="secondary"
          startIcon={<LockIcon />}
          disabled={isArrayEqual(course?.admissionTests, right)}
          onClick={onSaveClick}
        >
          Guardar cambios
        </LoadingButton>
      </Box>
      <TransferList
        options={admissionTests}
        selected={course?.admissionTests}
        right={right}
        setRight={setRight}
        isLoading={isLoading || isLoadingAdmTests}
      />
    </Box>
  );
};

export default AdmissionTestAsignation;
