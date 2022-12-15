import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

import { Stepper } from 'src/components/shared/ui';
import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { Group } from 'src/interfaces/entities/group';
import { useAppDispatch } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';

import styles from './add-group.module.css';
import AddModules from './add-modules';
import AddName from './add-name';
import { resolverGroup } from './validations';

const AddGroup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [selectedModules, setSelectedModules] = useState<TransferListData[]>([]);
  const [isValidContinueModules, setIsValidContinueModules] = useState<boolean>(false);

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
    },
    [],
  );

  useEffect(() => {
    if (selectedModules.length) {
      setIsValidContinueModules(true);
    } else setIsValidContinueModules(false);
  }, [selectedModules]);

  const onSubmitAddName = (data: Group) => {
    return data;
  };

  return (
    <section className={styles.container}>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        color="success"
        onClick={() => navigate(-1)}
      >
        Volver
      </Button>
      <Stepper
        handleEnd={() => console.log('end')}
        steps={[
          {
            label: 'Nombre del grupo',
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
            element: <div>Agregar tutores</div>,
            isValid: true,
          },
          {
            label: 'Alumnos',
            element: <div>Agregar Alumnos</div>,
            isValid: true,
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
