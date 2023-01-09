import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Button, Divider } from '@mui/material';

import { InputText, Preloader, Text } from 'src/components/shared/ui';
import DatePickerInput from 'src/components/shared/ui/inputs/date-picker';
import { confirmCancel, confirmEdit, invalidEmail, invalidForm } from 'src/constants/modal-content';
import { CustomResponse } from 'src/interfaces/api';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      country: '',
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
        country: data.country,
        email: data.email,
        birthDate: data.birthDate.slice(0, 10),
        phone: data.phone,
      });
    }
  };

  const onEditUser = (data: UserInfoFormValues) => {
    dispatch(
      openModal(confirmEdit({ entity: 'usuario', handleConfirm: () => handleEditUser(data) })),
    );
  };

  const onError = async (response: AxiosResponse<CustomResponse<unknown>>) => {
    await dispatch(getPostulantByDni(dni));
    if (response.data.type === 'ACCOUNT_ERROR') {
      dispatch(openModal(invalidEmail));
    } else {
      dispatch(openModal(invalidForm));
    }
  };

  const handleEditUser = async (data: UserInfoFormValues) => {
    const response = await dispatch(
      editPostulant(postulant?._id, {
        ...data,
        isActive: postulant?.isActive,
        dni: postulant?.dni,
      }),
    );
    if (response.payload.error) {
      onError(response.payload);
    } else {
      return navigate(-1);
    }
  };

  const onCancel = () => {
    if (isDirty) {
      dispatch(
        openModal(
          confirmCancel({
            handleConfirm: () => navigate(-1),
          }),
        ),
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
                name="country"
                label="País"
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
              <DatePickerInput
                control={control}
                name="birthDate"
                label="Fecha de nacimiento"
                className={styles.datePicker}
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
