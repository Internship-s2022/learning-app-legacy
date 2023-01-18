import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { PostulantCourseFilter } from 'src/components/shared/ui/table/components/filters/postulant-course/types';
import { postulantCourseHeadCells } from 'src/constants/head-cells';
import { cannotShowList } from 'src/constants/modal-content';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { resetQuery, setQuery } from 'src/redux/modules/postulant-course/actions';
import {
  correctTests,
  getCorrectedPostulants,
  promotePostulants,
} from 'src/redux/modules/postulant-course/thunks';
import { getRegistrationFormByCourseId } from 'src/redux/modules/registration-form/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { convertArrayToQuery, download } from 'src/utils/export-csv';
import { convertDatatoNotes, convertPostulantCourses } from 'src/utils/formatters';
import { generateDynamicHeadCell } from 'src/utils/generate-dynamic-head-cell';

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
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(
      getCorrectedPostulants(
        courseId,
        `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
    dispatch(getRegistrationFormByCourseId(`?isActive=true&course._id=${courseId}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'postulantes' })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleExportSelection = async (_ids: string[]) => {
    await download(
      `/course/${courseId}/postulation/export/csv?corrected=true${filterQuery}&${convertArrayToQuery(
        _ids,
      )}`,
      selectedObjects.length === correctedPostulantCourses.length
        ? 'postulant-course-corrected'
        : 'selected-postulant-course-corrected',
    );
  };

  const handleExportTable = async () => {
    await download(
      `/course/${courseId}/postulation/export/csv?corrected=true${filterQuery}`,
      'postulant-course-corrected',
    );
  };

  const dynamicHeadCells = [
    ...postulantCourseHeadCells,
    ...generateDynamicHeadCell(admissionTests, false),
  ];

  const convertedPostulantCourse = useMemo(
    () => convertPostulantCourses(correctedPostulantCourses, views),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [correctedPostulantCourses],
  );

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

  const handleCorrectTest = (data) => {
    const singleNote = [notes.find((note) => note.postulantId === data.row.postulantId)];
    if (singleNote[0] != undefined) {
      dispatch(correctTests(courseId, '', singleNote, true));
    }
  };

  const onInputChange = (data) => {
    const dataConverted = convertDatatoNotes(data, admissionTests);
    const noteIndex = notes.findIndex((note) => note.postulantId === data.row._id);
    if (noteIndex === -1) {
      setNotes([...notes, dataConverted]);
    } else {
      setNotes(notes.map((note, index) => (index === noteIndex ? dataConverted : note)));
    }
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
          key={`list-correct-${convertedPostulantCourse.length}`}
          headCells={dynamicHeadCells}
          rows={convertedPostulantCourse}
          isLoading={isLoading || isLoadingRegistration || isLoadingCourse}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          isRowEditable={true}
          onRowEditableSubmit={handleCorrectTest}
          onInputChange={onInputChange}
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
          editableProp="score"
        />
      )}
    </Box>
  );
};

export default ListCorrectedPostulants;
