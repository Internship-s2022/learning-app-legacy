import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { emailValidation } from 'src/utils/validation-rules';

const resolver = joiResolver(
  Joi.object({
    email: emailValidation,
    password: Joi.string().required().messages({
      'string.empty': 'La contraseña es requerida',
    }),
  }),
);

export default resolver;
