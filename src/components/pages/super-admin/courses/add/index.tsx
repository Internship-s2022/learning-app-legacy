import { add, formatISO } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Preloader, Stepper } from 'src/components/shared/ui';
import { confirmGoBack, genericError } from 'src/constants/modal-content';
import { SuperAdminRoutes } from 'src/constants/routes';
import { FormCourse } from 'src/interfaces/entities/course';
import { SelectedUsers } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setCourse } from 'src/redux/modules/course/actions';
import { createCourse } from 'src/redux/modules/course/thunks';
import { Actions } from 'src/redux/modules/course/types';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { resetError } from 'src/redux/modules/user/actions';

import AddAdmin from './add-admin';
import AddCourse from './add-course';
import AddTutor from './add-tutor';
import Confirm from './confirm';
import { resolverCourse } from './validations';

const AddCourseFlow = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedAdmins, setSelectedAdmins] = useState<SelectedUsers[]>([]);
  const [selectedTutors, setSelectedTutors] = useState<SelectedUsers[]>([]);
  const [isValidContinueAdmin, setIsValidContinueAdmin] = useState<boolean>(false);

  const { isLoading } = useAppSelector((state: RootReducer) => state.course);

  const {
    handleSubmit: handleSubmitAddCourse,
    trigger: triggerAddCourse,
    control: controlAddCourse,
    formState: { isValid },
    watch,
    setValue,
  } = useForm<FormCourse>({
    defaultValues: {
      name: '',
      description: '',
      inscriptionStartDate: null,
      inscriptionEndDate: null,
      startDate: null,
      endDate: null,
      isInternal: true,
      type: 'FULL',
      isActive: true,
    },
    resolver: resolverCourse,
    mode: 'onChange',
  });

  useEffect(
    () => () => {
      dispatch(resetQuery());
      dispatch(resetError());
      dispatch(setCourse(undefined));
      setIsValidContinueAdmin(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (selectedAdmins.length > 0 && selectedAdmins.length < 6) {
      setIsValidContinueAdmin(false);
    } else setIsValidContinueAdmin(true);
  }, [selectedAdmins, selectedTutors]);

  const onSubmitAddCourse = (data: FormCourse) => {
    const formattedData = {
      ...data,
      inscriptionStartDate: formatISO(add(data.inscriptionStartDate, { hours: 2, minutes: 59 })),
      inscriptionEndDate: formatISO(add(data.inscriptionEndDate, { hours: 2, minutes: 59 })),
      startDate: formatISO(add(data.startDate, { hours: 2, minutes: 59 })),
      endDate: formatISO(add(data.endDate, { hours: 2, minutes: 59 })),
    };
    return formattedData;
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
          const course = await dispatch(
            createCourse({
              ...data,
              courseUsers,
            }),
          );
          if (course.type === Actions.CREATE_COURSE_ERROR) {
            dispatch(openModal(genericError));
          } else {
            navigate(`/super-admin/${SuperAdminRoutes.courses.route}`);
          }
        }),
      }),
    );
  };

  const handleBack = () => {
    dispatch(
      openModal(
        confirmGoBack({
          handleConfirm: () => navigate(`/super-admin/${SuperAdminRoutes.courses.route}`),
        }),
      ),
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
                watch={watch}
                setValue={setValue}
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
              />
            ),
            isValid: true,
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
