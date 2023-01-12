import Joi from 'joi';

import {
  descriptionMessages,
  dniMessages,
  emailMessages,
  moduleTypesMessages,
  nameMessages,
  phoneMessages,
} from 'src/constants/validation-messages';
import { QuestionType } from 'src/interfaces/entities/question';

export const emailRegex =
  /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+\b(?!\.)@[a-zA-Z0-9-]+(\.)[a-zA-Z0-9-]{2,3}$/;
export const phoneNumberRegex = /^([0-9]{10,11})*$/;
export const dniRegex = /^[0-9]{6,8}$/;

const validation = (schema, value) => {
  const validation = schema.validate(value);
  if (validation.error) {
    return validation.error.details[0].message;
  }
  return true;
};

const now = Date.now();
const cutoffDateMax = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);
const cutoffDateMin = new Date(now - 1000 * 60 * 60 * 24 * 365 * 100);

const nameSchema = Joi.string()
  .pattern(/^[\p{L}\p{M}]+([ \p{L}\p{M}])*$/u)
  .min(3)
  .max(50)
  .required()
  .messages({
    'string.pattern.base': 'Nombre inválido, debe contener sólo letras.',
    'string.min': 'Nombre inválido, debe contener más de 3 letras.',
    'string.max': 'Nombre inválido, no debe contener más de 50 letras.',
    'string.empty': 'Nombre es requerido.',
  });

const dateSchema = Joi.date().max(cutoffDateMax).min(cutoffDateMin).required().messages({
  'date.max': 'Fecha de nacimiento inválida, debe ser mayor de 18 años.',
  'date.min': 'Fecha de nacimiento inválida, debe ser menor de 100 años.',
  'date.base': 'Fecha de nacimiento es requerida.',
});

export const setRules = (question: QuestionType) => {
  let rules = {};
  if (question.isRequired) {
    rules = { required: 'Esta respuesta es requerida.' };
  }
  switch (question.key) {
    case 'firstName':
      rules = {
        ...rules,
        validate: { string: (v) => validation(nameSchema, v) },
      };
      break;
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
        validate: { string: (v) => validation(dateSchema, v) },
      };
      break;
    default:
      break;
  }
  return rules;
};

export const maxValidDate = '2100/01/11';

export const moduleTypesValidation = Joi.string()
  .valid('DEV', 'QA', 'UX/UI', 'GENERAL')
  .required()
  .messages(moduleTypesMessages);

export const namingRegex = /^[\p{L}\p{M}]+([ \p{L}\p{M}])*$/u;
export const shortStringRegex = /^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()-]+$/;
export const containSpecialCharactersRegex =
  /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s() -`!@#$%^&*()_+=[\]{};':"\\|,<>/?~]+$/;
export const longStringRegex =
  /^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()!@#$%^&*()_+={};':",.<>/?-]+$/;

export const shortStringValidation = (regex = shortStringRegex) =>
  Joi.string().pattern(regex).required().max(50).empty();

export const nameValidation = shortStringValidation().messages(nameMessages);

export const longStringValidation = (regex = longStringRegex) =>
  Joi.string().pattern(regex).required().min(3).max(1000).empty();

export const descriptionValidation = longStringValidation().messages(descriptionMessages);

export const emailValidation = Joi.string()
  .required()
  .pattern(emailRegex)
  .max(256)
  .messages(emailMessages);

export const dniValidation = Joi.string()
  .pattern(/^[0-9]+$/)
  .min(6)
  .max(8)
  .required()
  .messages(dniMessages);

export const phoneValidation = Joi.string()
  .pattern(/^[0-9]+$/)
  .min(10)
  .max(11)
  .required()
  .messages(phoneMessages);
