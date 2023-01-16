import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { firstNameMessages, lastNameMessages } from 'src/constants/validation-messages';
import {
  birthDateValidation,
  countryValidation,
  dniValidation,
  emailValidation,
  namingRegex,
  phoneValidation,
  shortStringValidation,
} from 'src/utils/validation-rules';

const resolverDni = joiResolver(
  Joi.object({
    dni: dniValidation,
  }),
);

const resolverEmail = joiResolver(
  Joi.object({
    newEmail: emailValidation.messages({
      'string.max': 'El mail debe tener como máximo 256 caracteres.',
      'string.pattern.base': 'Formato de mail inválido.',
      'string.empty': 'Mail de usuario es requerido.',
    }),
    isInternal: Joi.string().valid('true', 'false').messages({
      'any.only': 'Tipo es requerido.',
    }),
  }),
);

const resolverForm = joiResolver(
  Joi.object({
    firstName: shortStringValidation(namingRegex).messages(firstNameMessages),
    lastName: shortStringValidation(namingRegex).messages(lastNameMessages),
    country: countryValidation,
    birthDate: birthDateValidation,
    phone: phoneValidation,
    email: emailValidation.messages({
      'string.max': 'El mail debe tener como máximo 256 caracteres.',
      'string.pattern.base': 'Formato de mail inválido.',
      'string.empty': 'Mail personal es requerido.',
    }),
  }),
);

export { resolverDni, resolverEmail, resolverForm };
