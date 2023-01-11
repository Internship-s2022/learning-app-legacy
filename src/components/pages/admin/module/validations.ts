import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { ModuleType } from 'src/interfaces/entities/module';
import {
  descriptionValidation,
  moduleTypeValidation,
  nameValidation,
} from 'src/utils/validation-rules';

const resolverModule = joiResolver(
  Joi.object<ModuleType>({
    name: nameValidation,
    description: descriptionValidation,
    status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').required().messages({
      'string.valid': 'Invalid status, should be one of the valids status.',
      'any.required': 'Status is a required field.',
      'any.only': 'Debe si o si elegir una de las opciones',
    }),
    type: moduleTypeValidation,
    groups: Joi.array().max(200).optional().unique(),
    contents: Joi.array()
      .items(
        nameValidation.messages({
          'string.pattern.base': 'No debe empezar con un espacio.',
          'string.min': 'Contenido inválido, debe tener al menos 3 caracteres.',
          'string.max': 'Contenido inválido, debe tener no mas de 24 caracteres.',
          'any.required': 'Contenido es un campo requerido.',
        }),
      )
      .min(1)
      .max(200)
      .messages({
        'array.includesRequiredUnknowns': 'Debe contener al menos 1 contenido.',
      }),
  }),
);

export { resolverModule };
