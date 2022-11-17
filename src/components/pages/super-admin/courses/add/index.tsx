import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Preloader, Stepper } from 'src/components/shared/ui';
import { Course, SelectedUsers } from 'src/interfaces/entities/course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setCourse } from 'src/redux/modules/course/actions';
import { createCourse } from 'src/redux/modules/course/thunks';
import { Actions } from 'src/redux/modules/course/types';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { resetError } from 'src/redux/modules/user/actions';

import AddAdmin from './add-admin';
import AddCourse from './add-course';
import { resolverCourse } from './add-course/validations';
import AddTutor from './add-tutor';
import Confirm from './confirm';

const AddCourseFlow = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedAdmins, setSelectedAdmins] = useState<SelectedUsers[]>([]);
  const [selectedTutors, setSelectedTutors] = useState<SelectedUsers[]>([]);
  const [isValidContinueAdmin, setIsValidContinueAdmin] = useState<boolean>(false);
  const [isValidContinueTutor, setIsValidContinueTutor] = useState<boolean>(false);

  const { isLoading } = useAppSelector((state: RootReducer) => state.course);

  const {
    handleSubmit: handleSubmitAddCourse,
    trigger: triggerAddCourse,
    control: controlAddCourse,
    formState: { isValid },
  } = useForm<Course>({
    defaultValues: {
      name: '',
      description: '',
      inscriptionStartDate: '',
      inscriptionEndDate: '',
      startDate: '',
      endDate: '',
      isInternal: '',
      type: '',
      isActive: true,
    },
    mode: 'onChange',
    resolver: resolverCourse,
  });
  useEffect(
    () => () => {
      dispatch(resetQuery());
      dispatch(resetError());
      dispatch(setCourse(undefined));
      setIsValidContinueAdmin(false);
      setIsValidContinueTutor(false);
    },
    [],
  );

  useEffect(() => {
    if (selectedAdmins.length > 0 && selectedAdmins.length < 6) {
      setIsValidContinueAdmin(false);
    } else setIsValidContinueAdmin(true);
    if (selectedTutors.length > 0) {
      setIsValidContinueTutor(false);
    } else setIsValidContinueTutor(true);
  }, [selectedAdmins, selectedTutors]);

  const onSubmitAddCourse = (data: Course) => {
    return data;
  };

  const courseUsers: SelectedUsers[] =
    useMemo(() => {
      return [...selectedAdmins, ...selectedTutors];
    }, [selectedAdmins, selectedTutors]) || [];

  if (isLoading) {
    return <Preloader />;
  }

  const handleEnd = () => {
    dispatch(
      openModal({
        title: 'Terminar',
        description: '¿Está seguro que desea terminar?',
        type: 'confirm',
        handleConfirm: handleSubmitAddCourse(async (data) => {
          const course = await dispatch(createCourse({ ...data, courseUsers }));
          if (course.type === Actions.CREATE_COURSE_ERROR) {
            dispatch(
              openModal({
                title: 'Error',
                description: course.payload.message,
                type: 'alert',
              }),
            );
          } else {
            navigate(-1);
          }
        }),
      }),
    );
  };

  const handleBack = () => {
    dispatch(
      openModal({
        title: 'Volver',
        description: 'Estas seguro que deseas volver atras? Los datos en el formulario se perderan',
        type: 'confirm',
        handleConfirm: () => navigate(-1),
      }),
    );
  };

  return (
    <section>
      <Stepper
        handleEnd={handleEnd}
        steps={[
          {
            label: 'Nombre y tipo de curso',
            element: (
              <AddCourse
                controlAddCourse={controlAddCourse}
                handleSubmitAddCourse={handleSubmitAddCourse}
                onSubmitAddCourse={onSubmitAddCourse}
              />
            ),
            onContinue: handleSubmitAddCourse(onSubmitAddCourse),
            trigger: triggerAddCourse,
            isValid: isValid,
            onBack: handleBack,
          },
          {
            label: 'Administradores',
            element: (
              <AddAdmin
                setSelectedAdmins={setSelectedAdmins}
                selectedAdmins={selectedAdmins}
                isValidContinueAdmin={isValidContinueAdmin}
              />
            ),
            isValid: selectedAdmins.length > 0 && selectedAdmins.length < 6,
          },
          {
            label: 'Tutores',
            element: (
              <AddTutor
                courseUsers={courseUsers}
                selectedTutors={selectedTutors}
                setSelectedTutors={setSelectedTutors}
                isValidContinueTutor={isValidContinueTutor}
              />
            ),
            isValid: selectedTutors.length > 0,
          },
          {
            label: 'Confirmación',
            element: (
              <Confirm
                courseUsers={courseUsers}
                controlAddCourse={controlAddCourse}
                handleSubmitAddCourse={handleSubmitAddCourse}
                onSubmitAddCourse={onSubmitAddCourse}
              />
            ),
            trigger: triggerAddCourse,
            onContinue: handleSubmitAddCourse(onSubmitAddCourse),
            isValid: isValid,
          },
        ]}
      />
    </section>
  );
};

export default AddCourseFlow;
