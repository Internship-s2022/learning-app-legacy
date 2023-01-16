import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { contentNameMessages } from 'src/constants/validation-messages';
import { ModuleType } from 'src/interfaces/entities/module';
import {
  containSpecialCharactersRegex,
  descriptionValidation,
  moduleTypesValidation,
  nameValidation,
  shortStringValidation,
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
    type: moduleTypesValidation,
    groups: Joi.array().max(200).optional().unique(),
    contents: Joi.array()
      .items(
        shortStringValidation(containSpecialCharactersRegex).min(2).messages(contentNameMessages),
      )
      .min(1)
      .max(200)
      .messages({
        'array.includesRequiredUnknowns': 'Debe contener al menos 1 contenido.',
      }),
    isActive: Joi.boolean().optional(),
  }),
);

export { resolverModule };
