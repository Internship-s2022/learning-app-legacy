import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Course } from 'src/interfaces/entities/course';

const DAY_MS = 24 * 60 * 60 * 1000;

const resolverCourse = joiResolver(
  Joi.object<Course>({
    name: Joi.string()
      .pattern(/^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()-]+$/)
      .min(3)
      .max(25)
      .required()
      .messages({
        'string.pattern.base':
          'Nombre de curso inválido, no debe empezar o terminar con espacios ni contener símbolos.',
        'string.min': 'Nombre de curso inválido, debe contener más de 3 caracteres.',
        'string.max': 'Nombre de curso inválido, no debe contener más de 25 caracteres.',
        'string.empty': 'Nombre de curso es requerido.',
      }),
    description: Joi.string()
      .pattern(/^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()!@#$%^&*()_+={};':",.<>/?-]+$/)
      .min(3)
      .max(1000)
      .required()
      .messages({
        'string.pattern.base':
          'Descripción inválida, no debe empezar o terminar con espacios ni contener símbolos determinados.',
        'string.max': 'Descripción inválida, no debe contener más de 1000 caracteres.',
        'string.min': 'Descripción inválida, debe contener más de 3 caracteres.',
        'string.empty': 'Descripción es un campo requerido.',
      }),
    inscriptionStartDate: Joi.date().greater('11-1-2017').max('11-1-2100').required().messages({
      'date.base': 'Fecha es un campo requerido.',
      'date.greater': 'La fecha mínima permitida es 11/01/2017.',
      'date.max': 'La fecha máxima permitida es 11/01/2100.',
      'any.ref': 'La fecha no debe ser menor a la fecha actual',
    }),
    inscriptionEndDate: Joi.date()
      .greater(Joi.ref('inscriptionStartDate'))
      .max('11-1-2100')
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
        'any.ref': 'La fecha debe ser un dia posterior al fin de inscripción.',
      }),
    endDate: Joi.date().greater(Joi.ref('startDate')).max('11-1-2100').messages({
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
