import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const resolverDni = joiResolver(
  Joi.object({
    dni: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(6)
      .max(9)
      .required()
      .messages({
        'string.pattern.base': 'DNI inválido, debe contener sólo números.',
        'string.min': 'DNI inválido, debe contener más de 6 números.',
        'string.max': 'DNI inválido, no debe contener más de 8 números.',
        'string.empty': 'DNI es requerido.',
      }),
  }),
);

const resolverEmail = joiResolver(
  Joi.object({
    newEmail: Joi.string()
      .required()
      .max(256)
      .pattern(
        /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+\b(?!\.)@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,3})*$/,
      )
      .messages({
        'string.max': 'El mail debe tener como máximo 256 caracteres.',
        'string.pattern.base': 'Formato de mail inválido.',
        'string.empty': 'Mail de usuario es requerido.',
      }),
    isInternal: Joi.string().valid('true', 'false').messages({
      'any.only': 'Tipo es requerido.',
    }),
  }),
);

const now = Date.now();
const cutoffDateMax = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);
const cutoffDateMin = new Date(now - 1000 * 60 * 60 * 24 * 365 * 100);

const resolverForm = joiResolver(
  Joi.object({
    firstName: Joi.string()
      .pattern(/^[\p{L}\p{M}]+([ \p{L}\p{M}])*$/u)
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.pattern.base': 'Nombre inválido, debe contener sólo letras.',
        'string.min': 'Nombre inválido, debe contener más de 3 letras.',
        'string.max': 'Nombre inválido, no debe contener más de 50 letras.',
        'string.empty': 'Nombre es requerido.',
      }),
    lastName: Joi.string()
      .pattern(/^[\p{L}\p{M}]+([ \p{L}\p{M}])*$/u)
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.pattern.base': 'Apellido inválido, debe contener sólo letras.',
        'string.min': 'Apellido inválido, debe contener más de 3 letras.',
        'string.max': 'Apellido inválido, no debe contener más de 50 letras.',
        'string.empty': 'Apellido es requerido.',
      }),
    country: Joi.string().min(3).max(50).required().messages({
      'string.min': 'Domicilio inválido, debe contener más de 3 letras.',
      'string.max': 'Domicilio inválido, no debe contener más de 50 letras.',
      'string.empty': 'Domicilio es requerido.',
    }),
    birthDate: Joi.date().max(cutoffDateMax).min(cutoffDateMin).required().messages({
      'date.max': 'Fecha de nacimiento inválida, debe ser mayor de 18 años.',
      'date.min': 'Fecha de nacimiento inválida, debe ser menor de 100 años.',
      'date.base': 'Fecha de nacimiento es requerida.',
    }),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .length(10)
      .required()
      .messages({
        'string.pattern.base': 'Número de teléfono inválido, debe contener sólo números.',
        'string.length': 'Número de teléfono inválido, debe contener 10 números.',
        'string.empty': 'Número de teléfono requerido.',
      }),
    email: Joi.string()
      .required()
      .max(256)
      .pattern(
        /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+\b(?!\.)@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,3})*$/,
      )
      .messages({
        'string.max': 'El mail debe tener como máximo 256 caracteres.',
        'string.pattern.base': 'Formato de mail inválido.',
        'string.empty': 'Mail personal es requerido.',
      }),
  }),
);

export { resolverDni, resolverEmail, resolverForm };
