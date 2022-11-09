import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Button, Divider } from '@mui/material';

import { InputText, Preloader, Text } from 'src/components/shared/ui';
import { Postulant } from 'src/interfaces/entities/postulant';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { editPostulant, getPostulantByDni } from 'src/redux/modules/postulant/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './edit-user.module.css';
import { UserInfoFormValues } from './types';
import { resolverForm } from './validations';

const EditUser = (): JSX.Element => {
  const { dni } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, postulant } = useAppSelector((state: RootReducer) => state.postulant);

  useEffect(() => {
    getPostulant();
  }, []);

  const {
    formState: { isDirty },
    handleSubmit,
    control,
    reset,
  } = useForm<Postulant>({
    defaultValues: {
      dni: '',
      firstName: '',
      lastName: '',
      location: '',
      email: '',
      birthDate: '',
      phone: '',
    },
    mode: 'onSubmit',
    resolver: resolverForm,
  });

  const getPostulant = async () => {
    const response = await dispatch(getPostulantByDni(dni));
    if (response?.payload) {
      const data: Postulant = response.payload.data;
      reset({
        dni: data.dni,
        firstName: data.firstName,
        lastName: data.lastName,
        location: data.location,
        email: data.email,
        birthDate: data.birthDate.slice(0, 10),
        phone: data.phone,
      });
    }
  };

  const onEditUser = (data: UserInfoFormValues) => {
    dispatch(
      openModal({
        title: 'Editar usuario',
        description: '¿Está seguro que desea editar a este usuario?',
        type: 'confirm',
        handleConfirm: () => handleEditUser(data),
      }),
    );
  };

  const handleEditUser = async (data: UserInfoFormValues) => {
    const response = await dispatch(
      editPostulant(postulant?._id, {
        ...data,
        isActive: postulant?.isActive,
        dni: postulant?.dni,
      }),
    );
    if (response.error) {
      dispatch(
        openModal({
          title: 'Algo salió mal',
          description: 'Por favor revise los datos ingresados.',
          type: 'alert',
        }),
      );
    } else {
      return navigate(-1);
    }
  };

  const onCancel = () => {
    if (isDirty) {
      dispatch(
        openModal({
          title: 'Cancelar',
          description: '¿Está seguro que desea cancelar? Se perderán los cambios sin guardar.',
          type: 'confirm',
          handleConfirm: () => navigate(-1),
        }),
      );
    } else {
      reset();
      return navigate(-1);
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <div className={styles.headerForm}>
        <Text variant="h1">
          Usuario - {postulant?.firstName} {postulant?.lastName}
        </Text>
        <InputText
          name="dni"
          label="DNI"
          size="small"
          control={control}
          disabled
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <Divider variant="fullWidth" />
      <div className={styles.bodyForms}>
        {!isLoading && (
          <form onSubmit={handleSubmit(onEditUser)}>
            <div>
              <InputText
                control={control}
                name="firstName"
                label="Nombre"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputText
                control={control}
                name="email"
                label="Mail personal"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputText
                control={control}
                name="location"
                label="Domicilio"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={styles.lastColumn}>
              <InputText
                control={control}
                name="lastName"
                label="Apellido"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputText
                control={control}
                name="birthDate"
                label="Fecha de nacimiento"
                size="small"
                type={'date'}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputText
                control={control}
                name="phone"
                label="Número de teléfono"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={styles.btnContainer}>
              <Button
                onClick={() => onCancel()}
                color="secondary"
                startIcon={<CloseIcon />}
                variant="outlined"
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                startIcon={<LockIcon />}
                disabled={!isDirty}
              >
                Guardar cambios
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default EditUser;
