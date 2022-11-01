import Joi from 'joi';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';

import { InputText, Stepper } from 'src/components/shared/ui';
import { openModal } from 'src/redux/modules/ui/actions';

const resolver1 = joiResolver(
  Joi.object({
    input1: Joi.string().required().messages({
      'string.empty': 'Campo requerido.',
    }),
  }),
);

const resolver3 = joiResolver(
  Joi.object({
    input3: Joi.string().required().messages({
      'string.empty': 'Campo requerido.',
    }),
  }),
);

const AddWithStepper = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);

  const customContinueFunction = () => {
    dispatch(
      openModal({
        title: 'Ejecutar continuar',
        description: 'Esta es una acción personzalida',
        type: 'alert',
      }),
    );
  };

  const customBackFunction = () => {
    dispatch(
      openModal({
        title: 'Ejecutar volver',
        description: 'Esta es una acción personzalida',
        type: 'alert',
      }),
    );
  };

  const {
    handleSubmit: handleSubmit1,
    control,
    trigger: trigger1,
  } = useForm({
    defaultValues: {
      input1: '',
    },
    mode: 'onSubmit',
    resolver: resolver1,
  });

  const {
    handleSubmit: handleSubmit3,
    control: control3,
    trigger: trigger3,
  } = useForm({
    defaultValues: {
      input3: '',
    },
    mode: 'onSubmit',
    resolver: resolver3,
  });

  const onSubmit1 = (data) => {
    console.log(data);
  };

  const onSubmit3 = (data) => {
    console.log(data);
  };

  const SingleInput1 = () => {
    return (
      <form onSubmit={handleSubmit1(onSubmit1)}>
        <InputText
          name="input1"
          label="input 1"
          size="small"
          control={control}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  };

  const SingleElement = () => {
    return (
      <div>
        {valid ? <p>Se puede continuar</p> : <p>No se puede continuar</p>}
        <Button
          color={valid ? 'success' : 'error'}
          variant={'contained'}
          onClick={() => setValid(!valid)}
        >
          Cambiar
        </Button>
      </div>
    );
  };

  const SingleInput3 = () => {
    return (
      <form onSubmit={handleSubmit3(onSubmit3)}>
        <InputText
          name="input3"
          label="input 3"
          size="small"
          control={control3}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
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
            label: 'Completá input 1',
            element: <SingleInput1 />,
            onContinue: handleSubmit1(onSubmit1),
            trigger: trigger1,
          },
          {
            label: 'Completá input 2',
            element: <SingleElement />,
            onContinue: customContinueFunction,
            isValid: valid,
          },
          {
            label: 'Completá input 3',
            element: <SingleInput3 />,
            onBack: customBackFunction,
            onContinue: handleSubmit3(onSubmit3),
            trigger: trigger3,
          },
        ]}
      />
    </section>
  );
};

export default AddWithStepper;
