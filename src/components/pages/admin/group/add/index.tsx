import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Stepper } from 'src/components/shared/ui';
import { cannotDoAction, confirmGoBack, genericError } from 'src/constants/modal-content';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { GroupForm } from 'src/interfaces/entities/group';
import { ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { createGroup } from 'src/redux/modules/group/thunks';
import { Actions } from 'src/redux/modules/group/types';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import { resolverGroup } from '../validations';
import styles from './add-group.module.css';
import AddModules from './add-modules';
import AddInfo from './add-name';
import AddStudent from './add-students';
import AddTutor from './add-tutors';
import Confirm from './confirm';

const AddGroup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const mainRoute = `/admin/course/${courseId}/groups`;
  const [selectedModules, setSelectedModules] = useState<ModuleType[]>([]);
  const [isValidContinueModules, setIsValidContinueModules] = useState<boolean>(false);
  const [selectedTutors, setSelectedTutors] = useState<CourseUser[]>([]);
  const [isValidContinueTutors, setIsValidContinueTutors] = useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = useState<CourseUser[]>([]);
  const [isValidContinueStudents, setIsValidContinueStudents] = useState<boolean>(false);
  const { isLoading } = useAppSelector((state: RootReducer) => state.group);

  useEffect(
    () => () => {
      dispatch(getCourseById(courseId));
      setIsValidContinueModules(false);
      setIsValidContinueTutors(false);
      setIsValidContinueStudents(false);
    },
    [courseId, dispatch],
  );

  const courseUsers: CourseUser[] =
    useMemo(
      () => [...selectedTutors, ...selectedStudents] || [],
      [selectedTutors, selectedStudents],
    ) || [];

  const {
    handleSubmit: handleSubmitAddGroup,
    trigger: triggerAddGroup,
    control: controlAddGroup,
    formState: { isValid, isDirty },
  } = useForm<GroupForm>({
    defaultValues: {
      name: '',
      type: '',
      isActive: true,
    },
    resolver: resolverGroup,
    mode: 'onChange',
  });

  useEffect(() => {
    if (selectedModules.length) {
      setIsValidContinueModules(true);
    } else setIsValidContinueModules(false);
    if (selectedTutors.length === 1) {
      setIsValidContinueTutors(true);
    } else setIsValidContinueTutors(false);
    if (selectedStudents.length) {
      setIsValidContinueStudents(true);
    } else setIsValidContinueStudents(false);
  }, [selectedModules, selectedTutors, selectedStudents]);

  const onSubmitAddInfo = (data: GroupForm) => {
    return data;
  };

  const onDelete = (data, setData, modalReason, id) => {
    if (data.length === 1) {
      dispatch(openModal(cannotDoAction({ reason: modalReason })));
    } else {
      setData(() => data.filter((item) => item._id !== id));
    }
  };

  const handleDeleteUser = (id: string) => {
    const role = courseUsers.find((cUser) => cUser._id === id).role;
    if (role === 'TUTOR') {
      onDelete(
        selectedTutors,
        setSelectedTutors,
        'Debe haber como mínimo un tutor en el grupo.',
        id,
      );
    } else {
      onDelete(
        selectedStudents,
        setSelectedStudents,
        'Debe haber como mínimo un alumno en el grupo.',
        id,
      );
    }
  };

  const handleEnd = () => {
    dispatch(
      openModal({
        title: 'Terminar',
        description: '¿Está seguro que desea terminar?',
        type: 'confirm',
        handleConfirm: handleSubmitAddGroup(async (data) => {
          const mappedCourseUsers = courseUsers.map((cUser) => cUser._id);
          const mappedModules = selectedModules.map((mod) => mod._id);
          const newGroup = await dispatch(
            createGroup(courseId, {
              ...data,
              courseUsers: mappedCourseUsers,
              modules: mappedModules,
            }),
          );
          if (newGroup.type === Actions.CREATE_GROUP_ERROR) {
            dispatch(openModal(genericError));
          } else if (!isLoading) {
            navigate(mainRoute);
          }
        }),
      }),
    );
  };

  const handleBack = () => {
    if (isDirty) {
      dispatch(
        openModal(
          confirmGoBack({
            handleConfirm: () => navigate(mainRoute),
          }),
        ),
      );
    } else navigate(mainRoute);
  };

  return (
    <section className={styles.container}>
      <Stepper
        handleEnd={handleEnd}
        steps={[
          {
            label: 'Nombre y tipo',
            element: (
              <AddInfo
                controlAddInfo={controlAddGroup}
                handleSubmitAddInfo={handleSubmitAddGroup}
                onSubmitAddInfo={onSubmitAddInfo}
              />
            ),
            isValid: isValid,
            trigger: triggerAddGroup,
            onBack: handleBack,
          },
          {
            label: 'Módulos',
            element: (
              <AddModules
                selectedModules={selectedModules}
                setSelectedModules={setSelectedModules}
                isValidContinueModules={isValidContinueModules}
              />
            ),
            isValid: isValidContinueModules,
          },
          {
            label: 'Tutores',
            element: (
              <AddTutor
                selectedTutors={selectedTutors}
                setSelectedTutors={setSelectedTutors}
                isValidContinueTutors={isValidContinueTutors}
              />
            ),
            isValid: isValidContinueTutors,
          },
          {
            label: 'Alumnos',
            element: (
              <AddStudent
                modules={selectedModules}
                selectedStudents={selectedStudents}
                setSelectedStudents={setSelectedStudents}
                isValidContinueStudents={isValidContinueStudents}
              />
            ),
            isValid: isValidContinueStudents,
          },
          {
            label: 'Confirmación',
            element: (
              <Confirm
                courseUsers={courseUsers}
                modules={selectedModules}
                setModules={setSelectedModules}
                handleDeleteUser={handleDeleteUser}
                controlAddGroup={controlAddGroup}
                handleSubmitAddGroup={handleSubmitAddGroup}
                onSubmitAddGroup={onSubmitAddInfo}
              />
            ),
            trigger: triggerAddGroup,
            onContinue: handleSubmitAddGroup(onSubmitAddInfo),
            isValid: isValid,
            isLoadingStep: isLoading,
          },
        ]}
      />
    </section>
  );
};

export default AddGroup;
