import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Group } from 'src/interfaces/entities/group';

const resolverGroup = joiResolver(
  Joi.object<Group>({
    name: Joi.string()
      .pattern(/^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()-]+$/)
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.pattern.base': 'Nombre inválido, no debe empezar ni terminar con espacios.',
        'string.min': 'Nombre inválido, debe contener más de 3 caracteres.',
        'string.max': 'Nombre inválido, no debe contener más de 50 caracteres.',
        'string.empty': 'Nombre es un campo requerido.',
      }),
    type: Joi.string().messages({
      'string.empty': 'Tipo es un campo requerido',
    }),
  }),
);

export { resolverGroup };
