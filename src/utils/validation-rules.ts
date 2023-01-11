import Joi from 'joi';

import { QuestionType } from 'src/interfaces/entities/question';

export const emailRegex =
  /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+\b(?!\.)@[a-zA-Z0-9-]+(\.)[a-zA-Z0-9-]{2,3}$/;
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

export const moduleTypeValidation = Joi.string()
  .valid('DEV', 'QA', 'UIUX', 'GENERAL')
  .required()
  .messages({
    'string.valid': 'Invalid type, should be one of the valids types.',
    'any.required': 'Tipo es un campo requerido.',
    'any.only': 'Debe si o si elegir una de las opciones',
  });

export const namingRegex = /^[\p{L}\p{M}]+([ \p{L}\p{M}])*$/u;
export const basicStringRegex = /^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()-]+$/;
export const descriptionRegex =
  /^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()!@#$%^&*()_+={};':",.<>/?-]+$/;

export const stringValidation = (regex = basicStringRegex) =>
  Joi.string().pattern(regex).required().min(1).max(50).empty();

export const nameValidation = stringValidation().messages({
  'string.pattern.base': 'No debe empezar o terminar con un espacio ni contener símbolos.',
  'string.min': 'Nombre inválido, debe tener al menos 1 carácter.',
  'string.max': 'Nombre inválido, no debe contener más de 50 caracteres.',
  'string.empty': 'Nombre no puede estar vacío.',
  'any.required': 'Nombre es un campo requerido.',
});

export const descriptionValidation = Joi.string()
  .pattern(descriptionRegex)
  .required()
  .min(3)
  .max(1000)
  .messages({
    'string.pattern.base':
      'Descripción inválida, no debe empezar o terminar con espacios ni contener símbolos determinados.',
    'string.max': 'Descripción inválida, no debe contener más de 1000 caracteres.',
    'string.min': 'Descripción inválida, debe contener más de 3 caracteres.',
    'string.empty': 'Descripción es un campo requerido.',
    'any.required': 'Descripción es un campo requerido.',
  });

export const emailValidation = Joi.string().required().pattern(emailRegex).max(256).messages({
  'string.empty': 'El email es requerido',
  'string.pattern.base': 'Formato de email no valido',
  'string.max': 'El email debe tener como máximo 256 caracteres.',
});

export const dniValidation = Joi.string()
  .pattern(/^[0-9]+$/)
  .min(6)
  .max(8)
  .required()
  .messages({
    'string.pattern.base': 'DNI inválido, debe contener sólo números.',
    'string.min': 'DNI inválido, debe contener más de 6 números.',
    'string.max': 'DNI inválido, no debe contener más de 8 números.',
    'string.empty': 'DNI es requerido.',
  });

export const phoneValidation = Joi.string()
  .pattern(/^[0-9]+$/)
  .min(10)
  .max(11)
  .required()
  .messages({
    'string.pattern.base': 'Número de teléfono inválido, debe contener sólo números.',
    'string.min': 'Número de teléfono inválido, debe contener 10 u 11 números.',
    'string.max': 'Número de teléfono inválido, debe contener 10 u 11 números.',
    'string.empty': 'Número de teléfono requerido.',
  });
