import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  countryMessages,
  firstNameMessages,
  lastNameMessages,
} from 'src/constants/validation-messages';
import {
  dniValidation,
  emailValidation,
  namingRegex,
  phoneValidation,
  shortStringValidation,
} from 'src/utils/validation-rules';

const now = Date.now();
const cutoffDateMax = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);
const cutoffDateMin = new Date(now - 1000 * 60 * 60 * 24 * 365 * 100);

const resolverForm = joiResolver(
  Joi.object({
    dni: dniValidation,
    firstName: shortStringValidation(namingRegex).messages(firstNameMessages),
    lastName: shortStringValidation(namingRegex).messages(lastNameMessages),
    country: shortStringValidation().messages(countryMessages),
    birthDate: Joi.date().max(cutoffDateMax).min(cutoffDateMin).required().messages({
      'date.max': 'Fecha de nacimiento inválida, debe ser mayor de 18 años.',
      'date.min': 'Fecha de nacimiento inválida, debe ser menor de 100 años.',
      'date.base': 'Fecha de nacimiento es requerida.',
    }),
    phone: phoneValidation,
    email: emailValidation.messages({
      'string.max': 'El mail debe tener como máximo 256 caracteres.',
      'string.pattern.base': 'Formato de mail inválido.',
      'string.empty': 'Mail personal es requerido.',
    }),
  }),
);

export { resolverForm };
