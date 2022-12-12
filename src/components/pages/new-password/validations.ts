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
        'string.min': 'Constraseña invalida, debe como minimo 8 caracteres',
        'string.max': 'Constraseña invalida, debe como max 24 caracteres',
        'string.pattern.base':
          'Constraseña invalida, debe contener una minuscula, una mayuscula y un numero',
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
