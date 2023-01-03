import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Group } from 'src/interfaces/entities/group';

const resolverGroupTypeName = joiResolver(
  Joi.object<Group>({
    name: Joi.string()
      .pattern(/^(?!\s)(?![\s\S]*\s$)[a-zA-Z0-9\s()-]+$/)
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.pattern.base': 'Invalid name, it must not start nor end with whitespaces.',
        'string.min': 'Invalid name, it must contain more than 3 characters.',
        'string.max': 'Invalid name, it must not contain more than 50 characters.',
        'any.required': 'Name is a required field.',
      }),
    type: Joi.string().valid('DEV', 'QA', 'UXUI', 'GENERAL').required().messages({
      'string.valid': 'Invalid type, should be one of the valids types.',
      'any.required': 'Type is a required field.',
    }),
  }),
);

export { resolverGroupTypeName };
