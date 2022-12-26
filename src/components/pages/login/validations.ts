import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const resolver = joiResolver(
  Joi.object({
    email: Joi.string()
      .required()
      .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .max(256)
      .messages({
        'string.empty': 'El email es requerido',
        'string.pattern.base': 'Formato de email no valido',
        'string.max': 'El mail debe tener como máximo 256 caracteres.',
      }),
    password: Joi.string().required().messages({
      'string.empty': 'La contraseña es requerida',
    }),
  }),
);

export default resolver;
