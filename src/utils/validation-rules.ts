import { QuestionType } from 'src/interfaces/entities/question';

export const emailRegex =
  /^[0-9a-zA-Z]+(?:[.-_!$+=#][0-9a-zA-Z]+)*@[a-z0-9]{2,252}(?:.[a-z]{2,3})+$/;
export const numberRegex = /^[0-9]*$/;

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
    case 'phone':
      rules = {
        ...rules,
        pattern: {
          value: numberRegex,
          message: 'La respuesta no debe contener letras.',
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
