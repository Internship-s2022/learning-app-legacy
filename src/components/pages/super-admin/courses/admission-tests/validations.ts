import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { descriptionRegex, stringValidation } from 'src/utils/validation-rules';

export const admissionTestResolver = joiResolver(
  Joi.object({
    name: stringValidation(descriptionRegex).messages({
      'string.pattern.base': 'Nombre inválido, no debe empezar ni terminar en espacios.',
      'string.min': 'Nombre inválido, debe contener más de 1 carácter.',
      'string.empty': 'Nombre inválido, debe contener más de 1 carácter.',
      'string.max': 'Nombre inválido, no debe contener más de 50 caracteres.',
    }),
  }),
);
