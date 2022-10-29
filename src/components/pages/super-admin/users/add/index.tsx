import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Divider, IconButton } from '@mui/material';

import { Dropdown, InputText, Preloader, Text } from 'src/components/shared/ui';
import { editPostulant, getPostulantByDni } from 'src/redux/modules/postulant/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { createManualUser } from 'src/redux/modules/user/thunks';

import styles from './addUser.module.css';
import { DniFormValue, GenerateAccountValues, UserInfoFormValues } from './types';
import { resolverDni, resolverEmail, resolverForm } from './validations';

const AddUser = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const navigate = useNavigate();
  const { isLoading: isLoadingPostulant, postulant } = useSelector(
    (state: RootReducer) => state.postulant,
  );
  const { isLoading } = useSelector((state: RootReducer) => state.user);
  const [dniFound, setDniFound] = useState<boolean | string>('');
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [postulantDni, setpostulantDni] = useState<string>(undefined);

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
      reset3(postulantValues);
    }
  }, [postulant]);

  const onSearchDni = async (data: DniFormValue) => {
    const response = await dispatch(getPostulantByDni(data.dni));
    setpostulantDni(data.dni);
    if (response?.payload) {
      const data = response.payload.data;
      setDniFound(true);
      setOnEdit(false);
      reset3({
        firstName: data.firstName,
        lastName: data.lastName,
        location: data.location,
        email: data.email,
        birthDate: data.birthDate.slice(0, 10),
        phone: data.phone,
      });
    } else {
      reset2({ isInternal: 'true', newEmail: '' });

      setDniFound(false);
      setOnEdit(true);
      reset3(defaultValues);
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
      dispatch(
        openModal({
          title: 'Algo salió mal',
          description: 'Por favor revise los datos ingresados.',
          type: 'alert',
        }),
      );
    } else {
      navigate(-1);
    }
  };

  const onAddEditUser = (data: UserInfoFormValues) => {
    if (dniFound) {
      dispatch(
        openModal({
          title: 'Editar usuario',
          description: '¿Está seguro que desea editar a este usuario?',
          type: 'confirm',
          handleConfirm: () => handleEditUser(data),
        }),
      );
    } else {
      dispatch(
        openModal({
          title: 'Agregar usuario',
          description: '¿Está seguro que desea agregar a este usuario?',
          type: 'confirm',
          handleConfirm: () => handleAddUser(data),
        }),
      );
    }
  };

  const handleAddUser = async (data: UserInfoFormValues) => {
    const response = await dispatch(
      createManualUser({
        ...data,
        isActive: true,
        dni: postulantDni,
        isInternal: control2._formValues.isInternal,
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
      navigate('users');
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
      dispatch(
        openModal({
          title: 'Algo salió mal',
          description: 'Por favor revise los datos ingresados.',
          type: 'alert',
        }),
      );
    } else {
      dispatch(
        openModal({
          title: 'Editar usuario',
          description: 'El usuario se editó correctamente.',
          type: 'alert',
        }),
      );
    }
    setOnEdit(false);
  };

  const onCancel = () => {
    if (isDirtyInfoForm || isDirtyHeaderForm) {
      dispatch(
        openModal({
          title: 'Cancelar',
          description: '¿Está seguro que desea cancelar? Se perderán los cambios sin guardar.',
          type: 'confirm',
          handleConfirm: () => navigate(-1),
        }),
      );
    } else {
      reset3(defaultValues);
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
    formState: { isDirty: isDirtyHeaderForm },
    handleSubmit: handleSubmit2,
    control: control2,
    reset: reset2,
  } = useForm<GenerateAccountValues>({
    defaultValues: {
      newEmail: '',
      isInternal: '',
    },
    mode: 'onSubmit',
    resolver: resolverEmail,
  });

  const {
    formState: { isDirty: isDirtyInfoForm },
    handleSubmit: handleSubmit3,
    control: control3,
    reset: reset3,
  } = useForm<UserInfoFormValues>({
    defaultValues: defaultValues,
    mode: 'onSubmit',
    resolver: resolverForm,
  });

  return isLoading ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <div className={styles.header}>
        <Text variant="h1">Usuarios - Agregar usuario</Text>
        <Text variant="body1">
          <br />
          Ingrese el DNI del usuario, si existe en la base de datos, los campos se completaran
          automáticamente.
        </Text>
        <Text variant="body1">
          En caso de no existir se deberá ingresar los datos de forma manual.
        </Text>
        <div className={styles.headerForm}>
          <form onSubmit={handleSubmit(onSearchDni)} className={styles.dniForm}>
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
                  <IconButton type="submit">
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
              control={control2}
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
          <form onSubmit={handleSubmit2(onGenerateAccount)} className={styles.emailForm}>
            {dniFound !== '' && dniFound && (
              <>
                <InputText
                  control={control2}
                  name="newEmail"
                  label="Mail de usuario"
                  size="small"
                  disabled={!dniFound || dniFound === '' || onEdit}
                />
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  size="small"
                  disabled={!dniFound || onEdit}
                  type="submit"
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
            <form onSubmit={handleSubmit3(onAddEditUser)}>
              <div>
                <InputText
                  control={control3}
                  name="firstName"
                  label="Nombre"
                  size="small"
                  disabled={(dniFound || dniFound === '') && !onEdit}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <InputText
                  control={control3}
                  name="email"
                  label="Mail personal"
                  size="small"
                  disabled={(dniFound || dniFound === '') && !onEdit}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <InputText
                  control={control3}
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
                  control={control3}
                  name="lastName"
                  label="Apellido"
                  size="small"
                  disabled={(dniFound || dniFound === '') && !onEdit}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <InputText
                  control={control3}
                  name="birthDate"
                  label="Fecha de nacimiento"
                  size="small"
                  type={'date'}
                  disabled={(dniFound || dniFound === '') && !onEdit}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <div>
                  <InputText
                    control={control3}
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
                        reset3(postulantValues);
                      }
                    }}
                  >
                    {onEdit ? 'Anular' : 'Editar'}
                  </Button>
                )}
              </div>
              <div className={styles.btnContainer}>
                <Button onClick={() => onCancel()} startIcon={<CloseIcon />} variant="outlined">
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={dniFound ? <LockIcon /> : <AddIcon />}
                  disabled={
                    dniFound && onEdit
                      ? !isDirtyInfoForm
                      : !onEdit || (!isDirtyInfoForm && !isDirtyHeaderForm)
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
