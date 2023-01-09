import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/material';

import { CustomButton, Dropdown, InputText, Text } from 'src/components/shared/ui';
import { groupTypeOptions } from 'src/constants/dropdown-options';
import { confirmEdit, invalidForm } from 'src/constants/modal-content';
import { GroupForm } from 'src/interfaces/entities/group';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { editGroup, getGroup } from 'src/redux/modules/group/thunks';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './edit-name.module.css';
import { resolverGroupTypeName } from './validations';

const EditInfo = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId, groupId } = useParams();
  const { group, isLoading } = useAppSelector((state) => state.group);

  const {
    handleSubmit: handleSubmitEditInfo,
    control: controlEditGroup,
    formState: { isDirty },
    reset,
  } = useForm<GroupForm>({
    defaultValues: {
      name: group?.name,
      type: group?.type,
    },
    resolver: resolverGroupTypeName,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(getGroup(courseId, groupId));
  }, [courseId, dispatch, groupId]);

  const resetForm = useCallback(() => {
    reset({
      name: group?.name,
      type: group?.type,
    });
  }, [group?.name, group?.type, reset]);

  const handleEditGroup = async (data: GroupForm) => {
    const response = await dispatch(
      editGroup(courseId, groupId, {
        ...data,
        modules: group?.modules.map((e) => e._id),
        courseUsers: group?.courseUsers.map((group) => group._id),
        isActive: true,
      }),
    );
    if ('error' in response.payload) {
      dispatch(openModal(invalidForm));
    }
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onSubmitAddInfo = (data: GroupForm) => {
    dispatch(
      openModal(confirmEdit({ entity: 'grupo', handleConfirm: () => handleEditGroup(data) })),
    );
  };

  return (
    <section className={styles.container}>
      <Box className={styles.buttonsContainer}>
        <CustomButton
          variant="outlined"
          color="secondary"
          startIcon={<CloseIcon />}
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancelar
        </CustomButton>
        <CustomButton
          variant="contained"
          type="submit"
          color="secondary"
          startIcon={<LockIcon />}
          disabled={!isDirty}
          isLoading={isLoading}
          onClick={handleSubmitEditInfo(onSubmitAddInfo)}
          className={styles.submitBtn}
        >
          Guardar cambios
        </CustomButton>
      </Box>
      <Box className={styles.descriptionContainer}>
        <Text variant="h1">Nombre y tipo de grupo</Text>
        <Text variant="subtitle1">Ingresa el nombre y el tipo con el cual aparecerá el grupo.</Text>
      </Box>
      <form onSubmit={handleSubmitEditInfo(onSubmitAddInfo)}>
        <input type="submit" hidden />
        <Box>
          <InputText
            control={controlEditGroup}
            name="name"
            label="Nombre del grupo"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            className={styles.input}
          />
        </Box>
        <Box>
          <Dropdown
            options={groupTypeOptions}
            control={controlEditGroup}
            name="type"
            label="Tipo de grupo"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            className={styles.input}
          />
        </Box>
      </form>
    </section>
  );
};

export default EditInfo;
