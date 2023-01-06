import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/material';

import { CustomButton, Text, TransferList } from 'src/components/shared/ui';
import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { cannotShowList, genericError } from 'src/constants/modal-content';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getAdmissionTests } from 'src/redux/modules/admission-test/thunks';
import { editCourse, getCourseById } from 'src/redux/modules/course/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { intersection, isArrayEqual } from 'src/utils/arrays-comparator';

import styles from './admission-test.module.css';

const AdmissionTestAssignation = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { course, isLoading, errorData } = useAppSelector((state: RootReducer) => state.course);
  const {
    admissionTests,
    isLoading: isLoadingAdmTests,
    errorData: errorDataAdmTests,
  } = useAppSelector((state: RootReducer) => state.admissionTest);
  const [right, setRight] = useState<TransferListData[]>([]);
  const courseStarted = new Date(course?.inscriptionStartDate) <= new Date();

  // TO-DO: Review useEffect dependencies
  useEffect(() => {
    if (course?._id !== courseId) dispatch(getCourseById(courseId));
    if (!admissionTests?.length) dispatch(getAdmissionTests(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(genericError));
      setRight(intersection(admissionTests, course?.admissionTests));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorData]);

  useEffect(() => {
    if (errorDataAdmTests.error && errorDataAdmTests.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'test de admisión' })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorDataAdmTests]);

  const onSaveClick = async () => {
    const admissionTests = right.map((item) => item._id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, createdAt, updatedAt, __v, ...courseRest } = course;
    await dispatch(editCourse(course?._id, { ...courseRest, admissionTests: admissionTests }));
  };

  return (
    <Box className={styles.container}>
      <Box>
        <Text variant="h1">Tests de admisión</Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Selecciona los tests que deseas agregar a este curso.
        </Text>
      </Box>
      <Box className={styles.textAndButtonContainer}>
        <Text variant="subtitle2" color="error">
          {courseStarted
            ? 'Las inscripciones del curso ya comenzaron. La lista de tests ya no es editable.'
            : ''}
        </Text>
        <Box className={styles.buttonsContainer}>
          <CustomButton
            variant="outlined"
            color="secondary"
            startIcon={<CloseIcon />}
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancelar
          </CustomButton>
          <CustomButton
            variant="contained"
            isLoading={isLoading || isLoadingAdmTests}
            type="submit"
            color="secondary"
            startIcon={<LockIcon />}
            disabled={isArrayEqual(course?.admissionTests, right)}
            onClick={onSaveClick}
          >
            Guardar cambios
          </CustomButton>
        </Box>
      </Box>
      <Box className={styles.transferListContainer}>
        <TransferList
          options={admissionTests}
          selected={course?.admissionTests}
          right={right}
          setRight={setRight}
          isLoading={isLoading || isLoadingAdmTests}
          disableButtons={courseStarted}
        />
      </Box>
    </Box>
  );
};

export default AdmissionTestAssignation;
