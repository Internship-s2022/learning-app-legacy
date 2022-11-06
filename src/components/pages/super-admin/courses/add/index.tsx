import { ThunkDispatch } from 'redux-thunk';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Stepper } from 'src/components/shared/ui';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { User } from 'src/redux/modules/user/types';

import AddAdmin from './add-admin';
import AddCourse from './add-course';
import { CourseTypes } from './add-course/types';
import { resolverCourse } from './add-course/validations';
import AddTutor from './add-tutor';
import Confirm from './confirm';
import { CourseUser } from './types';

const AddCourseFlow = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const navigate = useNavigate();
  const [selectedAdmins, setSelectedAdmins] = useState<CourseUser[]>([]);
  const [selectedTutors, setSelectedTutors] = useState<CourseUser[]>([]);
  interface CourseUser {
    user?: User;
    role: string;
    isActive: boolean;
  }
  interface CourseTypes {
    name: string;
    description: string;
    inscriptionStartDate: string;
    inscriptionEndDate: string;
    startDate: string;
    endDate: string;
    type: string;
    courseUsers?: CourseUser[];
    isInternal: boolean;
    isActive: boolean;
  }

  const [course, setCourse] = useState<CourseTypes | any>({
    name: '',
    description: '',
    inscriptionStartDate: '',
    inscriptionEndDate: '',
    startDate: '',
    endDate: '',
    type: '',
    courseUsers: [],
    isInternal: false,
    isActive: true,
  });
  const [valid, setValid] = useState(false);
  const [courseUsers, setCourseUsers] = useState<any>([]);

  //////////////////////////////////////////////ADD COURSE///////////////////////////////
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
      type: '',
      courseUsers: [],
      isInternal: false,
      isActive: true,
    },
    mode: 'onChange',
    resolver: resolverCourse,
  });

  const onSubmitAddCourse = (data) => {
    setCourse({ ...data });
  };

  //////////////////////////////////////////////ADD ADMIN///////////////////////////////

  const handleContinueAddAdmin = () => {
    const admins = selectedAdmins.map((selectedAdmin) => ({
      user: selectedAdmin,
      role: 'ADMIN',
      isActive: true,
    }));
    setCourse((prevValue) => {
      console.log('prevValue', prevValue);
      return { ...prevValue, courseUsers: admins };
    });
  };

  ////////////////////////////////////////////ADD TUTOR//////////////////////

  const handleContinueAddTutor = () => {
    const tutors = selectedTutors.map((selectedTutor) => ({
      user: selectedTutor,
      role: 'TUTOR',
      isActive: true,
    }));

    setCourse((prevValue) => {
      return { ...prevValue, courseUsers: [...prevValue.courseUsers, ...tutors] };
    });
  };

  return (
    <section>
      <Stepper
        handleEnd={() =>
          dispatch(
            openModal({
              title: 'Terminar',
              description: '¿Está seguro que desea terminar?',
              type: 'confirm',
              handleConfirm: () => navigate(-1),
            }),
          )
        }
        steps={[
          {
            label: 'Paso 1',
            element: (
              <AddCourse
                setCourse={setCourse}
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
            label: 'Paso 2',
            element: (
              <AddAdmin setSelectedAdmins={setSelectedAdmins} selectedAdmins={selectedAdmins} />
            ),
            onContinue: handleContinueAddAdmin,
            isValid: selectedAdmins.length > 0,
          },
          {
            label: 'Paso 3',
            element: (
              <AddTutor
                course={course}
                setCourse={setCourse}
                selectedTutors={selectedTutors}
                setSelectedTutors={setSelectedTutors}
              />
            ),
            onContinue: handleContinueAddTutor,
            isValid: selectedTutors.length > 0,
          },
          {
            label: 'Paso 4',
            element: <Confirm course={course} />,
            // onBack: customBackFunction,
            onContinue: () => console.log('course', course),
            // trigger: trigger3,
            isValid: true,
          },
        ]}
      />
    </section>
  );
};

export default AddCourseFlow;
