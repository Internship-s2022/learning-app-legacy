import { ThunkDispatch } from 'redux-thunk';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Stepper } from 'src/components/shared/ui';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import AddAdmin from './add-admin';
import AddCourse from './add-course';
import { resolverCourse } from './add-course/validations';
import AddTutor from './add-tutor';
import Confirm from './confirm';
import { CourseTypes, SelectedUsers } from './types';

const AddCourseFlow = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const [selectedAdmins, setSelectedAdmins] = useState<SelectedUsers[]>([]);
  const [selectedTutors, setSelectedTutors] = useState<SelectedUsers[]>([]);

  const {
    handleSubmit: handleSubmitAddCourse,
    trigger: triggerAddCourse,
    control: controlAddCourse,
    formState: { isValid },
  } = useForm<CourseTypes>({
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

  const onSubmitAddCourse = (data: CourseTypes) => {
    data;
  };

  const courseUsers: SelectedUsers[] =
    useMemo(() => {
      return [...selectedAdmins, ...selectedTutors];
    }, [selectedAdmins, selectedTutors]) || [];

  return (
    <section>
      <Stepper
        handleEnd={() =>
          dispatch(
            openModal({
              title: 'Terminar',
              description: '¿Está seguro que desea terminar?',
              type: 'confirm',
              handleConfirm: handleSubmitAddCourse((data) => {
                //TO-DO: make dispatch with this data but first need the endpoint
                console.log('data to send', { ...data, courseUsers });
              }),
            }),
          )
        }
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
          },
          {
            label: 'Administradores',
            element: (
              <AddAdmin setSelectedAdmins={setSelectedAdmins} selectedAdmins={selectedAdmins} />
            ),
            isValid: selectedAdmins.length > 0,
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
