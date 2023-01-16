import Joi from 'joi';

import {
  birthDateMessages,
  countryMessages,
  descriptionMessages,
  dniMessages,
  emailMessages,
  firstNameMessages,
  lastNameMessages,
  longStringMessages,
  moduleTypesMessages,
  nameMessages,
  phoneMessages,
} from 'src/constants/validation-messages';
import { QuestionType } from 'src/interfaces/entities/question';

const validation = (schema, value) => {
  const validation = schema.validate(value);
  if (validation.error) {
    return validation.error.details[0].message;
  }
  return true;
};

export const setRules = (question: QuestionType) => {
  let rules = {};
  if (question.isRequired) {
    rules = { required: 'Esta respuesta es requerida.' };
  }
  if (question.type === 'PARAGRAPH' && !question.key) {
    rules = {
      ...rules,
      validate: {
        string: (v: string) =>
          validation(longStringValidation(longStringRegex).messages(longStringMessages), v),
      },
    };
  }
  switch (question?.key) {
    case 'firstName':
      rules = {
        ...rules,
        validate: {
          string: (v: string) =>
            validation(shortStringValidation(namingRegex).messages(firstNameMessages), v),
        },
      };
      break;
    case 'lastName':
      rules = {
        ...rules,
        validate: {
          string: (v: string) =>
            validation(shortStringValidation(namingRegex).messages(lastNameMessages), v),
        },
      };
      break;
    case 'email':
      rules = {
        ...rules,
        validate: { string: (v: string) => validation(emailValidation, v) },
      };
      break;
    case 'dni':
      rules = {
        ...rules,
        validate: { string: (v: string) => validation(dniValidation, v) },
      };
      break;
    case 'phone':
      rules = {
        ...rules,
        validate: { string: (v: string) => validation(phoneValidation, v) },
      };
      break;
    case 'birthDate':
      rules = {
        ...rules,
        validate: { string: (v: string) => validation(birthDateValidation, v) },
      };
      break;
    case 'country':
      rules = {
        ...rules,
        validate: { string: (v: string) => validation(countryValidation, v) },
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
export const emailRegex =
  /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+\b(?!\.)@[a-zA-Z0-9-]+(\.)[a-zA-Z0-9-]{2,3}$/;

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

const now = Date.now();
const cutoffDateMax = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);
const cutoffDateMin = new Date(now - 1000 * 60 * 60 * 24 * 365 * 100);

export const birthDateValidation = Joi.date()
  .max(cutoffDateMax)
  .min(cutoffDateMin)
  .required()
  .messages(birthDateMessages);

export const countryValidation = Joi.string()
  .valid('Argentina', 'Uruguay')
  .required()
  .messages(countryMessages);
