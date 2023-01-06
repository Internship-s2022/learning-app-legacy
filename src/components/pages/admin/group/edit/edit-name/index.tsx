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

import styles from './edit-name-type.module.css';
import { resolverGroupTypeName } from './validations';

const EditInfo = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId, groupId } = useParams();
  const { group } = useAppSelector((state) => state.group);
  const courseUsersStr = group?.courseUsers.map((e) => e._id);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = useCallback(() => {
    reset({
      name: group?.name,
      type: group?.type,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditGroup = async (data: GroupForm) => {
    const response = await dispatch(
      editGroup(courseId, groupId, {
        ...data,
        modules: group?.modules.map((e) => e._id),
        courseUsers: courseUsersStr,
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
    <section data-testid="add-group-container-section" className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmitEditInfo(onSubmitAddInfo)}>
        <Box className={styles.spaceContainer}>
          <div className={styles.titleContainer}>
            <Text variant="h1">Nombre y tipo de grupo</Text>
            <Text variant="subtitle1" className={styles.subtitle}>
              Ingresa el nombre y el tipo con el cual aparecerá el grupo.
            </Text>
          </div>
          <Box className={styles.btnContainer}>
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
            >
              Guardar cambios
            </CustomButton>
          </Box>
        </Box>
        <Box className={styles.margin25}>
          <InputText
            control={controlEditGroup}
            name="name"
            label="Nombre del grupo"
            size="small"
            className={styles.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box className={styles.margin25}>
          <Dropdown
            options={groupTypeOptions}
            control={controlEditGroup}
            name="type"
            label="Tipo de grupo"
            variant="outlined"
            size="small"
            className={styles.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </form>
    </section>
  );
};

export default EditInfo;
