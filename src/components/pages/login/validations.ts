import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const resolver = joiResolver(
  Joi.object({
    email: Joi.string()
      .required()
      .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .messages({
        'string.required': 'El email es requerido',
        'string.pattern.base': 'El formato del email no es valido',
      }),
    password: Joi.string().min(8).max(24).messages({
      'string.required': 'La contraseña es requerida',
      'string.min': 'Constraseña invalida, debe tener al menos 8 caracteres',
    }),
  }),
);

export default resolver;
