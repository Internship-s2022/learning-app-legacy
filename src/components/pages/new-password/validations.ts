import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const resolver = joiResolver(
  Joi.object({
    newPass: Joi.string()
      .min(8)
      .max(24)
      .pattern(/[a-z]{1,}/)
      .pattern(/[A-Z]{1,}/)
      .pattern(/[0-9]{1,}/)
      .messages({
        'string.min': 'Contraseña inválida, debe como mínimo 8 caracteres',
        'string.max': 'Contraseña inválida, debe como máximo 24 caracteres',
        'string.pattern.base':
          'Contraseña inválida, debe contener una minúscula, una mayúscula y un número',
      }),
    repeatNewPass: Joi.string()
      .min(8)
      .max(24)
      .pattern(/[a-z]{1,}/)
      .pattern(/[A-Z]{1,}/)
      .pattern(/[0-9]{1,}/)
      .equal(Joi.ref('newPass'))
      .messages({
        'any.only': 'Las contraseñas deben coincidir',
      }),
  }),
);

export default resolver;
