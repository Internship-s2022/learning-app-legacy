import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Stepper } from 'src/components/shared/ui';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { Group } from 'src/interfaces/entities/group';
import { ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';

import styles from './add-group.module.css';
import AddModules from './add-modules';
import AddName from './add-name';
import AddStudent from './add-students';
import AddTutor from './add-tutors';
import { resolverGroup } from './validations';

const AddGroup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [selectedModules, setSelectedModules] = useState<ModuleType[]>([]);
  const [isValidContinueModules, setIsValidContinueModules] = useState<boolean>(false);
  const [selectedTutors, setSelectedTutors] = useState<CourseUser[]>([]);
  const [isValidContinueTutors, setIsValidContinueTutors] = useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = useState<CourseUser[]>([]);
  const [isValidContinueStudents, setIsValidContinueStudents] = useState<boolean>(false);

  const {
    handleSubmit: handleSubmitAddName,
    trigger: triggerAddGroup,
    control: controlAddGroup,
    formState: { isValid },
  } = useForm<Group>({
    defaultValues: {
      name: '',
      type: '',
    },
    resolver: resolverGroup,
    mode: 'onChange',
  });

  useEffect(
    () => () => {
      dispatch(getCourseById(courseId));
      setIsValidContinueModules(false);
      setIsValidContinueTutors(false);
    },
    [],
  );

  useEffect(() => {
    if (selectedModules.length) {
      setIsValidContinueModules(true);
    } else setIsValidContinueModules(false);
    if (selectedTutors.length) {
      setIsValidContinueTutors(true);
    } else setIsValidContinueTutors(false);
    if (selectedStudents.length) {
      setIsValidContinueStudents(true);
    } else setIsValidContinueStudents(false);
  }, [selectedModules, selectedTutors, selectedStudents]);

  const onSubmitAddName = (data: Group) => {
    return data;
  };

  return (
    <section className={styles.container}>
      <Stepper
        handleEnd={() => console.log('end')}
        steps={[
          {
            label: 'Nombre y tipo',
            element: (
              <AddName
                controlAddGroup={controlAddGroup}
                handleSubmitAddName={handleSubmitAddName}
                onSubmitAddName={onSubmitAddName}
              />
            ),
            isValid: isValid,
            trigger: triggerAddGroup,
            onBack: () => navigate(-1),
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
            isValid: selectedModules.length > 0,
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
            isValid: selectedTutors.length > 0,
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
            isValid: selectedTutors.length > 0,
          },
          {
            label: 'Confirmación',
            element: <div>Pantalla de confirmación</div>,
            isValid: true,
          },
        ]}
      />
    </section>
  );
};

export default AddGroup;
