import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { optionMessages, titleMessages } from 'src/constants/validation-messages';
import { mediumStringValidation } from 'src/utils/validation-rules';

export const questionResolver = joiResolver(
  Joi.object({
    questions: Joi.array().items(
      Joi.object({
        _id: Joi.string(),
        registrationForm: Joi.string(),
        view: Joi.string(),
        key: Joi.string(),
        title: mediumStringValidation().messages(titleMessages),
        type: Joi.string()
          .valid('SHORT_ANSWER', 'PARAGRAPH', 'DROPDOWN', 'CHECKBOXES', 'MULTIPLE_CHOICES')
          .required()
          .messages({
            'string.valid': 'Debe seleccionar un tipo de pregunta.',
            'any.required': 'Debe seleccionar un tipo de pregunta.',
            'any.only': 'Debe seleccionar un tipo de pregunta.',
          }),
        options: Joi.when('type', {
          is: Joi.string().valid('SHORT_ANSWER', 'PARAGRAPH'),
          then: Joi.array().max(0),
          otherwise: Joi.array()
            .items(
              Joi.object({
                _id: Joi.string(),
                value: mediumStringValidation().messages(optionMessages),
              }).messages({
                'string.pattern.base': 'Opción inválida, no debe empezar ni terminar en espacios.',
                'string.empty': 'Opción inválida, debe contener al menos un carácter.',
                'string.max': 'Opción inválida, no debe contener más de 50 caracteres.',
              }),
            )
            .min(1)
            .max(200),
        }).messages({
          'any.max': 'No puede agregar más de 200 opciones.',
        }),
        isRequired: Joi.boolean().required().messages({
          'any.required': 'Requerida es un campo requerido.',
        }),
      }),
    ),
  }),
);
