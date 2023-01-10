import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Divider, IconButton } from '@mui/material';

import { Dropdown, InputText, Preloader, Text } from 'src/components/shared/ui';
import DatePickerInput from 'src/components/shared/ui/inputs/date-picker';
import {
  alertEdit,
  confirmAdd,
  confirmCancel,
  confirmEdit,
  invalidEmail,
  invalidForm,
} from 'src/constants/modal-content';
import { CustomResponse } from 'src/interfaces/api';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { editPostulant, getPostulantByDni } from 'src/redux/modules/postulant/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { resetError } from 'src/redux/modules/user/actions';
import { createManualUser } from 'src/redux/modules/user/thunks';

import styles from './add-user.module.css';
import { DniFormValue, GenerateAccountValues, UserInfoFormValues } from './types';
import { resolverDni, resolverEmail, resolverForm } from './validations';

const AddUser = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading: isLoadingPostulant, postulant } = useAppSelector(
    (state: RootReducer) => state.postulant,
  );
  const { isLoading } = useAppSelector((state: RootReducer) => state.user);
  const [dniFound, setDniFound] = useState<boolean | string>('');
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [postulantDni, setPostulantDni] = useState<string>(undefined);

  const postulantValues = {
    firstName: postulant?.firstName,
    lastName: postulant?.lastName,
    location: postulant?.location,
    email: postulant?.email,
    birthDate: postulant?.birthDate.slice(0, 10),
    phone: postulant?.phone,
  };

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    birthDate: '',
    phone: '',
  };

  useEffect(() => {
    if (onEdit) {
      resetUserInfo(postulantValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postulant]);

  const onSearchDni = async (data: DniFormValue) => {
    const response = await dispatch(getPostulantByDni(data.dni));
    setPostulantDni(data.dni);
    if (response?.payload) {
      const data = response.payload.data;
      setDniFound(true);
      setOnEdit(false);
      resetUserInfo({
        firstName: data.firstName,
        lastName: data.lastName,
        location: data.location,
        email: data.email,
        birthDate: data.birthDate.slice(0, 10),
        phone: data.phone,
      });
    } else {
      resetAccountInfo({ isInternal: 'true', newEmail: '' });
      setDniFound(false);
      setOnEdit(true);
      resetUserInfo(defaultValues);
    }
  };

  const onGenerateAccount = (data: GenerateAccountValues) => {
    dispatch(
      openModal({
        title: 'Generar cuenta',
        description: '¿Está seguro que desea agregar este usuario?',
        type: 'confirm',
        handleConfirm: () => handleGenerateUser(data),
      }),
    );
  };

  const onError = (response: AxiosResponse<CustomResponse<unknown>>) => {
    if (response.data.type === 'EMAIL_ALREADY_EXISTS') {
      dispatch(openModal(invalidEmail));
    } else {
      dispatch(openModal(invalidForm));
    }
  };

  const handleGenerateUser = async (data: GenerateAccountValues) => {
    const response = await dispatch(
      createManualUser({
        firstName: postulant.firstName,
        lastName: postulant.lastName,
        location: postulant.location,
        dni: postulant.dni,
        birthDate: postulant.birthDate,
        phone: postulant.phone,
        isInternal: data.isInternal,
        email: data.newEmail,
        isActive: true,
        postulant: postulant?._id,
      }),
    );
    if (response?.error) {
      onError(response);
    } else {
      navigate(-1);
    }
  };

  const onAddEditUser = (data: UserInfoFormValues) => {
    if (dniFound) {
      dispatch(
        openModal(confirmEdit({ entity: 'usuario', handleConfirm: () => handleEditUser(data) })),
      );
    } else {
      dispatch(
        openModal(confirmAdd({ entity: 'usuario', handleConfirm: () => handleAddUser(data) })),
      );
    }
  };

  const handleAddUser = async (data: UserInfoFormValues) => {
    const response = await dispatch(
      createManualUser({
        ...data,
        isActive: true,
        dni: postulantDni,
        isInternal: controlAccountInfo._formValues.isInternal,
      }),
    );
    if (response.error) {
      onError(response);
    } else {
      navigate(-1);
    }
  };

  const handleEditUser = async (data: UserInfoFormValues) => {
    const response = await dispatch(
      editPostulant(postulant?._id, {
        ...data,
        isActive: true,
        dni: postulantDni,
      }),
    );
    if (response.error) {
      dispatch(openModal(invalidForm));
    } else {
      dispatch(openModal(alertEdit({ entity: 'usuario' })));
    }
    setOnEdit(false);
  };

  const onCancel = () => {
    if (isDirtyUserInfoForm || isDirtyAccountForm) {
      dispatch(
        openModal(
          confirmCancel({
            handleConfirm: () => {
              dispatch(resetError()), navigate(-1);
            },
          }),
        ),
      );
    } else {
      resetUserInfo(defaultValues);
      return navigate(-1);
    }
  };

  const { handleSubmit, control } = useForm<DniFormValue>({
    defaultValues: {
      dni: '',
    },
    mode: 'onSubmit',
    resolver: resolverDni,
  });

  const {
    formState: { isDirty: isDirtyAccountForm },
    handleSubmit: handleSubmitAccountInfo,
    control: controlAccountInfo,
    reset: resetAccountInfo,
  } = useForm<GenerateAccountValues>({
    defaultValues: {
      newEmail: '',
      isInternal: '',
    },
    mode: 'onSubmit',
    resolver: resolverEmail,
  });

  const {
    formState: { isDirty: isDirtyUserInfoForm },
    handleSubmit: handleSubmitUserInfo,
    control: controlUserInfo,
    reset: resetUserInfo,
  } = useForm<UserInfoFormValues>({
    defaultValues: defaultValues,
    mode: 'onSubmit',
    resolver: resolverForm,
  });

  return isLoading ? (
    <Preloader />
  ) : (
    <section data-testid="add-user-container-section" className={styles.container}>
      <div className={styles.header}>
        <Text variant="h1" className={styles.h1Margin}>
          Usuarios - Agregar usuario
        </Text>
        <Text data-testid="text-01" variant="body1">
          Ingrese el DNI del usuario, si existe en la base de datos, los campos se completarán
          automáticamente.
        </Text>
        <Text data-testid="text-02" variant="body1">
          En caso de no existir se deberá ingresar los datos de forma manual.
        </Text>
        <div className={styles.headerForm}>
          <form
            data-testid="add-user-container-form"
            onSubmit={handleSubmit(onSearchDni)}
            className={styles.dniForm}
          >
            <InputText
              control={control}
              name="dni"
              label="DNI"
              size="small"
              color="primary"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <IconButton data-testid="dniBtn" type="submit">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
            {dniFound !== '' ? (
              <span>
                {dniFound ? (
                  <CheckCircleOutlineIcon color="success" />
                ) : (
                  <CancelOutlinedIcon color="error" />
                )}
              </span>
            ) : (
              <span />
            )}

            <Dropdown
              control={controlAccountInfo}
              variant="outlined"
              name="isInternal"
              label="Tipo"
              options={[
                { value: 'true', label: 'Empleado' },
                { value: 'false', label: 'Estudiante' },
              ]}
              disabled={!dniFound && !onEdit}
              margin="normal"
              size="small"
            />
          </form>
          <form onSubmit={handleSubmitAccountInfo(onGenerateAccount)} className={styles.emailForm}>
            {dniFound !== '' && dniFound && (
              <>
                <InputText
                  control={controlAccountInfo}
                  name="newEmail"
                  label="Mail de usuario"
                  size="small"
                  disabled={!dniFound || dniFound === '' || onEdit}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PersonAddIcon />}
                  size="small"
                  disabled={!dniFound || onEdit}
                  type="submit"
                  className={styles.btns}
                >
                  Generar cuenta
                </Button>
              </>
            )}
          </form>
        </div>
        <Divider variant="fullWidth" />
        <div className={styles.bodyForms}>
          {!isLoadingPostulant && (
            <form onSubmit={handleSubmitUserInfo(onAddEditUser)}>
              <div>
                <InputText
                  control={controlUserInfo}
                  name="firstName"
                  label="Nombre"
                  size="small"
                  disabled={(dniFound || dniFound === '') && !onEdit}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <InputText
                  control={controlUserInfo}
                  name="email"
                  label="Mail personal"
                  size="small"
                  disabled={(dniFound || dniFound === '') && !onEdit}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <InputText
                  control={controlUserInfo}
                  name="location"
                  label="Domicilio"
                  size="small"
                  disabled={(dniFound || dniFound === '') && !onEdit}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={styles.lastColumn}>
                <InputText
                  control={controlUserInfo}
                  name="lastName"
                  label="Apellido"
                  size="small"
                  disabled={(dniFound || dniFound === '') && !onEdit}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <DatePickerInput
                  control={controlUserInfo}
                  name="birthDate"
                  label="Fecha de nacimiento"
                  disabled={(dniFound || dniFound === '') && !onEdit}
                  className={styles.datePicker}
                  maxDate={new Date(Date.now())}
                />
                <div>
                  <InputText
                    control={controlUserInfo}
                    name="phone"
                    label="Número de teléfono"
                    size="small"
                    disabled={(dniFound || dniFound === '') && !onEdit}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                {dniFound && (
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={onEdit ? <CloseIcon /> : <EditIcon />}
                    disabled={!dniFound}
                    onClick={() => {
                      setOnEdit(!onEdit);
                      if (onEdit) {
                        resetUserInfo(postulantValues);
                      }
                    }}
                    className={styles.btns}
                  >
                    {onEdit ? 'Anular' : 'Editar'}
                  </Button>
                )}
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
                  data-testid="submitBtn"
                  variant="contained"
                  type="submit"
                  color="secondary"
                  startIcon={dniFound ? <LockIcon /> : <AddIcon />}
                  disabled={
                    dniFound && onEdit
                      ? !isDirtyUserInfoForm
                      : !onEdit || (!isDirtyUserInfoForm && !isDirtyAccountForm)
                  }
                >
                  {dniFound ? 'Guardar cambios' : 'Agregar'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddUser;
