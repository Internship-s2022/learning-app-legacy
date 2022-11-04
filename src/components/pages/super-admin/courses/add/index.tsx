import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Stepper } from 'src/components/shared/ui';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { getUsers } from 'src/redux/modules/user/thunks';
import { User } from 'src/redux/modules/user/types';

import AddAdmin from './add-admin';
import AddCourse from './add-course';
import { CourseType, CourseTypes } from './add-course/types';
import { resolverCourse } from './add-course/validations';
import AddTutor from './add-tutor';
import Confirm from './confirm';
import { CourseUser, SelectedUsers } from './types';

const AddCourseFlow = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const navigate = useNavigate();
  const [selectedAdmins, setSelectedAdmins] = useState<CourseUser[]>([]);
  const [selectedTutors, setSelectedTutors] = useState<CourseUser[]>([]);
  const [course, setCourse] = useState<any>();
  const [valid, setValid] = useState(false);
  //////////////////////////////////////////////ADD COURSE///////////////////////////////
  const {
    handleSubmit: handleSubmitAddCourse,
    trigger: triggerAddCourse,
    control: controlAddCourse,
    reset: resetAddCourse,
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
    setValid(true), setCourse({ ...data, courseUsers: [] });
  };

  //////////////////////////////////////////////ADD ADMIN///////////////////////////////

  const handleContinueAddAdmin = () => {
    const admins = selectedAdmins.map((selectedAdmin) => ({
      user: selectedAdmin,
      role: 'ADMIN',
      isActive: true,
    }));
    if (admins) {
      setCourse((prevValue) => {
        return { ...prevValue, courseUsers: admins };
      });
      setValid(true);
    } else setValid(false);
  };

  //////////////////////////////////////////////////////////////////
  const handleContinueAddTutor = () => {
    console.log('selectedTutors', selectedTutors);
    const tutors = selectedTutors.map((selectedTutor) => ({
      user: selectedTutor,
      role: 'TUTOR',
      isActive: true,
    }));
    console.log('tutors', tutors);
    setCourse((prevValue) => {
      return { ...prevValue, courseUsers: [...prevValue.courseUsers, ...tutors] };
    });
    setValid(true);
  };
  ////////////////////////////////////////////////CONFIRM
  // useEffect(() => {
  //   dispatch(
  //     getUsers(`?isInternal=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
  //   );
  // }, []);

  return (
    <>
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
            isValid: valid,
          },
          {
            label: 'Paso 2',
            element: (
              <AddAdmin setSelectedAdmins={setSelectedAdmins} selectedAdmins={selectedAdmins} />
            ),
            onContinue: handleContinueAddAdmin,
            isValid: valid,
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
            // onBack: customBackFunction,
            onContinue: handleContinueAddTutor,
            isValid: valid,
            // trigger: trigger3,
          },
          {
            label: 'Paso 4',
            element: <Confirm course={course} />,
            // onBack: customBackFunction,
            // onContinue: handleSubmit3(onSubmit3),
            // trigger: trigger3,
          },
        ]}
      />
      {/* <AddCourse setCourse={setCourse} />
      <AddAdmin course={course} setCourse={setCourse} setUsersFiltered={setUsersFiltered} />
      <AddTutor
        course={course}
        setCourse={setCourse}
        courseUsers={courseUsers}
        usersFiltered={usersFiltered}
        setSelectedUsers={setSelectedUsers}
      />
      <Confirm course={course} /> */}
    </>
  );
};

export default AddCourseFlow;
