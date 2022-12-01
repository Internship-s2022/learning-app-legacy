import { ModalState } from 'src/redux/modules/ui/types';

interface ModalParams {
  entity?: string;
  handleConfirm?: ModalState['handleConfirm'];
}

export const genericError: ModalState = {
  title: 'Algo salió mal',
  description: 'Por favor reintente nuevamente.',
  type: 'alert',
};

export const invalidForm: ModalState = {
  ...genericError,
  description: 'Por favor revise los datos ingresados.',
};

export const cannotShowList = ({ entity }: ModalParams): ModalState => ({
  title: 'Ocurrió un error',
  description: `No se puede mostrar la lista de ${entity}, intente nuevamente.`,
  type: 'alert',
});

export const confirmAdd = ({ entity, handleConfirm }: ModalParams): ModalState => ({
  title: `Agregar ${entity}`,
  description: `¿Está seguro que desea agregar a este ${entity}?`,
  type: 'confirm',
  handleConfirm,
});

export const confirmCancel = ({ handleConfirm }: ModalParams): ModalState => ({
  title: 'Cancelar',
  description: '¿Está seguro que desea cancelar? Se perderán los cambios sin guardar.',
  type: 'confirm',
  handleConfirm,
});

export const confirmGoBack = ({ handleConfirm }: ModalParams): ModalState => ({
  title: 'Volver',
  description: 'Estas seguro que deseas volver atrás? Los datos en el formulario se perderán',
  type: 'confirm',
  handleConfirm,
});

export const confirmDelete = ({ entity, handleConfirm }: ModalParams): ModalState => ({
  title: `Eliminar ${entity}`,
  description: `¿Está seguro que desea eliminar este ${entity}?`,
  type: 'confirm',
  handleConfirm,
});

export const confirmEdit = ({ entity, handleConfirm }: ModalParams): ModalState => ({
  title: `Editar ${entity}`,
  description: `¿Está seguro que desea editar este ${entity}?`,
  type: 'confirm',
  handleConfirm,
});

export const alertEdit = ({ entity }: ModalParams): ModalState => ({
  title: `Editar ${entity}`,
  description: `El ${entity} se editó correctamente.`,
  type: 'alert',
});
