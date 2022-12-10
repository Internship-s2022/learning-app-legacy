import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const resolver = joiResolver(
  Joi.object({
    newPass: Joi.string()
      .pattern(/[a-z]{1,}/)
      .pattern(/[A-Z]{1,}/)
      .pattern(/[0-9]{1,}/)
      .min(8)
      .max(24)
      // .valid(Joi.ref('repeatNewPass'))
      .messages({
        'string.min': 'Constraseña invalida, debe como minimo 8 caracteres',
        'string.max': 'Constraseña invalida, debe como max 24 caracteres',
        'string.pattern.base':
          'Constraseña invalida, debe contener una minuscula, una mayuscula y un numero',
      }),
    repeatNewPass: Joi.string()
      .valid(Joi.ref('newPass'))
      .required()

      .messages({
        'any.only': 'Las contraseñas deben coincidir',
      }),
  }),
);

export default resolver;
