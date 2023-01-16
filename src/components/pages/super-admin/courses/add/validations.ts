import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Course } from 'src/interfaces/entities/course';
import { descriptionValidation, maxValidDate, nameValidation } from 'src/utils/validation-rules';

const DAY_MS = 24 * 60 * 60 * 1000;

const resolverCourse = joiResolver(
  Joi.object<Course>({
    name: nameValidation,
    description: descriptionValidation,
    inscriptionStartDate: Joi.date().greater('2017/01/11').max(maxValidDate).required().messages({
      'date.base': 'Fecha es un campo requerido.',
      'date.greater': 'La fecha mínima permitida es 11/01/2017.',
      'date.max': 'La fecha máxima permitida es 11/01/2100.',
      'any.ref': 'La fecha no debe ser menor a la fecha actual',
    }),
    inscriptionEndDate: Joi.date()
      .greater(Joi.ref('inscriptionStartDate'))
      .max(maxValidDate)
      .required()
      .messages({
        'date.greater': 'Debe ser posterior a la fecha de inicio de inscripción.',
        'date.base': 'Fecha es un campo requerido.',
        'date.max': 'La fecha máxima permitida es 11/01/2100.',
        'any.ref': 'Debe ser posterior a la fecha de inicio de inscripción.',
      }),
    startDate: Joi.date()
      .min(
        Joi.ref('inscriptionEndDate', {
          adjust: (field) => {
            return new Date(field).getTime() + DAY_MS;
          },
        }),
      )
      .max(
        Joi.ref('inscriptionEndDate', {
          adjust: (field) => {
            return new Date(field).getTime() + DAY_MS;
          },
        }),
      )
      .required()
      .messages({
        'date.base': 'Fecha es un campo requerido.',
        'date.max': 'La fecha debe ser un dia posterior al fin de inscripción.',
        'date.min': 'La fecha debe ser un dia posterior al fin de inscripción.',
        'any.ref': 'La fecha debe ser un dia posterior al fin de inscripción',
      }),
    endDate: Joi.date().greater(Joi.ref('startDate')).max(maxValidDate).messages({
      'date.greater': 'Debe ser posterior a la fecha de inicio del curso.',
      'date.base': 'Fecha es un campo requerido.',
      'date.max': 'La fecha máxima permitida es 11/01/2100.',
      'any.ref': 'Debe ser posterior a la fecha de inicio del curso.',
    }),
    isInternal: Joi.boolean().messages({
      'string.empty': 'Debe elegir entre Externo o Interno.',
    }),
    type: Joi.string().messages({
      'string.empty': 'Debe elegir entre Express o Full.',
    }),
    isActive: Joi.boolean(),
  }),
);

export { resolverCourse };
