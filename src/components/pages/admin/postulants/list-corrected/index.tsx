import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { PostulantCourseFilter } from 'src/components/shared/ui/table/components/filters/postulant-course/types';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { postulantCourseHeadCells } from 'src/constants/head-cells';
import { cannotShowList } from 'src/constants/modal-content';
import { AdmissionResult } from 'src/interfaces/entities/postulant-course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { resetQuery, setQuery } from 'src/redux/modules/postulant-course/actions';
import {
  getCorrectedPostulants,
  promotePostulants,
} from 'src/redux/modules/postulant-course/thunks';
import { getRegistrationFormByCourseId } from 'src/redux/modules/registration-form/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { convertArrayToQuery, download } from 'src/utils/export-csv';

import styles from './postulant-list.module.css';

const ListCorrectedPostulants = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { correctedPostulantCourses, errorData, isLoading, pagination, filterQuery } =
    useAppSelector((state: RootReducer) => state.postulantCourse);
  const { registrationForm, isLoading: isLoadingRegistration } = useAppSelector(
    (state: RootReducer) => state.registrationForm,
  );
  const { course, isLoading: isLoadingCourse } = useAppSelector(
    (state: RootReducer) => state.course,
  );
  const { courseId } = useParams();
  const views = registrationForm?.views;
  const admissionTests = course?.admissionTests.map((at) => at.name);
  const [selectedObjects, setSelectedObjects] = useState([]);

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(
      getCorrectedPostulants(
        courseId,
        `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
    dispatch(getRegistrationFormByCourseId(`?isActive=true&course._id=${courseId}`));
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'postulantes' })));
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
      `/course/${courseId}/postulation/export/csv?corrected=true${filterQuery}&${convertArrayToQuery(
        _ids,
      )}`,
      'selected-postulant-course-corrected',
    );
  };

  const handleExportTable = () => {
    download(
      `/course/${courseId}/postulation/export/csv?corrected=true${filterQuery}`,
      'postulant-course-corrected',
    );
  };
  const convertEntity = () => {
    return correctedPostulantCourses
      .reduce((prev = [], obj, index) => {
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
      }, [])
      .sort((a: { firstName: string }, b: { firstName: string }) =>
        a.firstName.localeCompare(b.firstName),
      );
  };

  const generateDynamicHeadCell = () => {
    if (admissionTests?.length) {
      return admissionTests?.reduce((prev = [], obj, index) => {
        prev[index] = {
          id: obj,
          numeric: false,
          disablePadding: true,
          label: obj,
        };
        return prev;
      }, []);
    } else {
      return [];
    }
  };

  const dynamicHeadCells = [
    ...postulantCourseHeadCells,
    ...(generateDynamicHeadCell() as HeadCell[]),
  ];

  const convertedPostulantCourse = useMemo(() => convertEntity(), [correctedPostulantCourses]);

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

  const onFiltersSubmit: SubmitHandler<Partial<PostulantCourseFilter>> = (
    data: Record<string, string>,
  ) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  return (
    <Box className={styles.container}>
      {errorData.error && errorData.status != 404 ? (
        <div
          data-testid="list-corrected-postulants-title-container-div-error"
          className={styles.titleContainer}
        >
          <Text variant="h2">Hubo un error al cargar la tabla de postulantes.</Text>
        </div>
      ) : (
        <CustomTable
          key="list-corrected"
          headCells={dynamicHeadCells}
          rows={convertedPostulantCourse}
          isLoading={isLoading || isLoadingRegistration || isLoadingCourse}
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
          filter="postulantCourse"
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />
      )}
    </Box>
  );
};

export default ListCorrectedPostulants;
