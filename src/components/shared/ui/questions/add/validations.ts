import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { descriptionRegex, stringValidation } from 'src/utils/validation-rules';

export const questionResolver = joiResolver(
  Joi.object({
    questions: Joi.array().items(
      Joi.object({
        _id: Joi.string(),
        registrationForm: Joi.string(),
        view: Joi.string(),
        key: Joi.string(),
        title: stringValidation(descriptionRegex).messages({
          'string.pattern.base': 'Enunciado inválido, no debe empezar ni terminar en espacios.',
          'string.min': 'Enunciado inválido, debe contener más de 3 caracteres.',
          'string.empty': 'Enunciado inválido, debe contener más de 3 caracteres.',
          'string.max': 'Enunciado inválido, no debe contener más de 50 caracteres.',
          'any.required': 'El enunciado es un campo requerido.',
        }),
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
                value: stringValidation(descriptionRegex),
              }).messages({
                'string.pattern.base': 'Opción inválida, no debe empezar ni terminar en espacios.',
                'string.empty': 'Opción inválida, debe contener al menos un caracter.',
                'string.max': 'Opción inválida, no debe contener más de 24 caracteres.',
                'string.unique': 'La opción debe ser única.',
              }),
            )
            .unique('value')
            .min(1)
            .max(200),
        }).messages({
          'array.unique': 'La opción debe ser única.',
          'any.max': 'No puede agregar más de 200 opciones.',
        }),
        isRequired: Joi.boolean().required().messages({
          'any.required': 'Requerida es un campo requerido.',
        }),
      }),
    ),
  }),
);
