import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Stepper } from 'src/components/shared/ui';

import styles from './add-group.module.css';

const AddGroup = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <section className={styles.container}>
      <Stepper
        handleEnd={() => console.log('end')}
        steps={[
          {
            label: 'Nombre del grupo',
            element: <div>Agregar nombre</div>,
            isValid: true,
            onBack: () => navigate(-1),
          },
          {
            label: 'Módulos',
            element: <div>Agregar módulos</div>,
            isValid: true,
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
