import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { postulantCourseHeadCells } from 'src/constants/head-cells';
import { AdmissionResult } from 'src/interfaces/entities/postulant-course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery } from 'src/redux/modules/admission-test/actions';
import { getCourseById } from 'src/redux/modules/course/thunks';
import {
  getCorrectedPostulants,
  promotePostulants,
} from 'src/redux/modules/postulant-course/thunks';
import { getRegistrationForms } from 'src/redux/modules/registration-form/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { convertArrayToQuery, download } from 'src/utils/export-csv';

import styles from './postulant-list.module.css';

const ListCorrectedPostulants = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { correctedPostulantCourses, errorData, isLoading, pagination, filterQuery } =
    useAppSelector((state: RootReducer) => state.postulantCourse);
  const { registrationForms, isLoading: isLoadingRegistration } = useAppSelector(
    (state: RootReducer) => state.registrationForm,
  );
  const { course } = useAppSelector((state: RootReducer) => state.course);
  const { courseId } = useParams();
  const views = registrationForms[0]?.views;
  const admissionTests = correctedPostulantCourses[0]?.admissionResults;
  const [selectedObjects, setSelectedObjects] = useState([]);

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(
      getCorrectedPostulants(
        courseId,
        `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
    // TO-DO: Add dispatch registration form
    // dispatch(getRegistrationForms(`&course._id=${courseId}`));
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(
        openModal({
          title: 'Ocurrió un error',
          description: 'No se puede mostrar la lista de postulantes, intente nuevamente.',
          type: 'alert',
        }),
      );
    }
  }, [errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getCorrectedPostulants(
        courseId,
        `&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getCorrectedPostulants(
        courseId,
        `&page=${pagination.page}&limit=${parseInt(event.target.value, 10)}${filterQuery}`,
      ),
    );
  };

  const handleExportSelection = (_ids: string[]) => {
    download(
      `/course/${courseId}/postulation/export/csv&${filterQuery}&${convertArrayToQuery(_ids)}`,
      'selected-postulant-course-corrected',
    );
  };

  const handleExportTable = () => {
    download(
      `/course/${courseId}/postulation/export/csv&${filterQuery}`,
      'postulant-course-corrected',
    );
  };

  const convertEntity = () => {
    return correctedPostulantCourses
      .reduce(
        (prev = [{}], obj, index) => {
          const {
            _id,
            postulant: { _id: postulantId, lastName, firstName, email, birthDate, location },
          } = obj;
          const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
          const view = views?.find((v) => v._id == obj.view)?.name;
          const admissionInfo = obj.admissionResults.reduce((acc = {}, admRe: AdmissionResult) => {
            return { ...acc, [admRe.admissionTest.name]: admRe.score };
          }, {});
          prev[index] = {
            _id,
            postulantId,
            firstName,
            lastName,
            location,
            age,
            email,
            view,
            ...admissionInfo,
          };
          return prev;
        },
        [{}],
      )
      .sort((a: any, b: any) => a.firstName.localeCompare(b.firstName));
  };

  const generateDynamicHeadCell = () => {
    return admissionTests?.reduce(
      (prev = [{}], obj, index) => {
        prev[index] = {
          id: obj.admissionTest.name,
          numeric: false,
          disablePadding: true,
          label: obj.admissionTest.name,
        };
        return prev;
      },
      [{}],
    );
  };

  const dynamicHeadCells = admissionTests?.length && [
    ...postulantCourseHeadCells,
    ...(generateDynamicHeadCell() as HeadCell[]),
  ];
  const convertedPostulantCourse = convertEntity();

  const onPromotePostulants = () => {
    const currentDate = new Date();
    if (currentDate >= new Date(course?.startDate)) {
      dispatch(
        openModal({
          title: 'Algo salió mal',
          description: 'Sólo se pueden promover postulantes antes de que inicie el curso.',
          type: 'alert',
        }),
      );
    } else {
      const data = selectedObjects.map((item) => ({
        postulantId: item.postulantId,
      }));
      if (data.length > 0)
        dispatch(
          openModal({
            title: 'Admitir postulantes',
            description: '¿Está seguro que desea admitir estos postulantes como alumnos?',
            type: 'confirm',
            handleConfirm: () => dispatch(promotePostulants(courseId, data)),
          }),
        );
    }
  };

  return (
    <Box>
      {errorData.error && errorData.status != 404 ? (
        <div
          data-testid="list-corrected-postulants-title-container-div-error"
          className={styles.titleContainer}
        >
          <Text variant="h2">Hubo un error al cargar la tabla de usuarios.</Text>
        </div>
      ) : correctedPostulantCourses.length && convertedPostulantCourse.length ? (
        <CustomTable
          key="list-corrected"
          headCells={dynamicHeadCells}
          rows={convertedPostulantCourse}
          isLoading={isLoading || isLoadingRegistration}
          pagination={pagination}
          deleteIcon={false}
          editIcon={true}
          addButton={{
            text: 'Agregar postulantes',
            onClick: onPromotePostulants,
            disabled: !selectedObjects.length,
          }}
          exportButton={true}
          handleExportSelection={handleExportSelection}
          handleExportTable={handleExportTable}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />
      ) : (
        <div className={styles.titleContainer}>
          <Text variant="h2">No hay postulantes calificados en este curso.</Text>
        </div>
      )}
    </Box>
  );
};

export default ListCorrectedPostulants;
