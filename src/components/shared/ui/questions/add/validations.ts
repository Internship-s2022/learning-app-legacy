import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

export const questionResolver = joiResolver(
  Joi.object({
    questions: Joi.array().items(
      Joi.object({
        title: Joi.string()
          .pattern(/^(?!\s)(?![\s\S]*\s$)[a-zA-Z0-9\s()-]+$/)
          .min(3)
          .max(50)
          .required()
          .messages({
            'string.pattern.base': 'Invalid title, it must not start nor end with whitespaces.',
            'string.min': 'Invalid title, it must contain more than 3 characters.',
            'string.max': 'Invalid title, it must not contain more than 50 characters.',
            'any.required': 'Title is a required field.',
          }),
        type: Joi.string()
          .valid('SHORT_ANSWER', 'PARAGRAPH', 'DROPDOWN', 'CHECKBOXES', 'MULTIPLE_CHOICES')
          .required()
          .messages({
            'string.valid': 'Invalid type, should be one of the valids types.',
            'any.required': 'Type is a required field.',
          }),
        options: Joi.when('type', {
          is: Joi.string().valid('SHORT_ANSWER', 'PARAGRAPH'),
          then: Joi.valid(null),
          otherwise: Joi.array()
            .items(
              Joi.object({
                value: Joi.string()
                  .pattern(/^(?!\s)(?![\s\S]*\s$)[a-zA-Z0-9\s()-]+$/)
                  .min(3)
                  .max(24)
                  .required(),
              })
                .required()
                .messages({
                  'string.pattern.base':
                    'Invalid value, it must not start nor end with whitespaces.',
                  'string.max':
                    'Invalid option value, it must not contain more than 24 characters.',
                  'string.min': 'Invalid option value, it must contain more than 3 characters.',
                }),
            )
            .unique('value')
            .max(200)
            .required(),
        }).messages({
          'any.max': 'No more than 200 questions per view in the Registration Form.',
          'any.required': 'Options is a required field.',
        }),
        isRequired: Joi.boolean().required().messages({
          'any.required': 'Is required is a required field.',
        }),
      }),
    ),
  }),
);
