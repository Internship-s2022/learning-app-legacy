import { QuestionType } from 'src/interfaces/entities/question';

export const emailRegex =
  /^[0-9a-zA-Z]+(?:[.-_!$+=#][0-9a-zA-Z]+)*@[a-z0-9]{2,252}(?:.[a-z]{2,3})+$/;
export const phoneNumberRegex = /^([0-9]{10,11})*$/;
export const dniRegex = /^[0-9]{6,8}$/;

export const isDateBeforeNow = (date: string) => {
  const today = new Date();
  const formattedDate = new Date(`${date}T00:00`);
  const distance = formattedDate.getTime() - today.getTime();
  if (distance > 0) {
    return false;
  } else {
    return true;
  }
};

export const setRules = (question: QuestionType) => {
  let rules = {};
  if (question.isRequired) {
    rules = { required: 'La respuesta no puede estar vacía.' };
  }
  switch (question.key) {
    case 'email':
      rules = {
        ...rules,
        pattern: {
          value: emailRegex,
          message: 'El email no es válido.',
        },
      };
      break;
    case 'dni':
      rules = {
        ...rules,
        pattern: {
          value: dniRegex,
          message: 'Debe ser un DNI válido.',
        },
      };
      break;
    case 'phone':
      rules = {
        ...rules,
        pattern: {
          value: phoneNumberRegex,
          message: 'Debe contener entre 10 y 11 números.',
        },
      };
      break;
    case 'birthDate':
      rules = {
        ...rules,
        validate: {
          date: (v: string) => isDateBeforeNow(v) || 'La fecha no debe ser posterior a hoy.',
        },
      };
      break;
    default:
      break;
  }
  return rules;
};
