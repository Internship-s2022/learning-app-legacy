import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  dniValidation,
  emailValidation,
  namingRegex,
  phoneValidation,
  stringValidation,
} from 'src/utils/validation-rules';

const now = Date.now();
const cutoffDateMax = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);
const cutoffDateMin = new Date(now - 1000 * 60 * 60 * 24 * 365 * 100);

const resolverForm = joiResolver(
  Joi.object({
    dni: dniValidation,
    firstName: stringValidation(namingRegex).messages({
      'string.pattern.base': 'Nombre inválido, debe contener sólo letras.',
      'string.min': 'Nombre inválido, debe contener más de 3 letras.',
      'string.max': 'Nombre inválido, no debe contener más de 50 letras.',
      'string.empty': 'Nombre es requerido.',
    }),
    lastName: stringValidation(namingRegex).messages({
      'string.pattern.base': 'Apellido inválido, debe contener sólo letras.',
      'string.min': 'Apellido inválido, debe contener más de 3 letras.',
      'string.max': 'Apellido inválido, no debe contener más de 50 letras.',
      'string.empty': 'Apellido es requerido.',
    }),
    country: stringValidation().messages({
      'string.min': 'País inválido, debe contener más de 3 letras.',
      'string.max': 'País inválido, no debe contener más de 50 letras.',
      'string.empty': 'País es requerido.',
    }),
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
