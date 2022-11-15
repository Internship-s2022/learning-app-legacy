import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Course } from 'src/interfaces/entities/course';

const DAY_MS = 24 * 60 * 60 * 1000;
const resolverCourse = joiResolver(
  Joi.object<Course>({
    name: Joi.string().min(3).max(50).required().messages({
      'string.min': 'Nombre de curso inválido, debe contener más de 3 letras.',
      'string.max': 'Nombre de curso inválido, debe contener más de 50 letras.',
      'string.empty': 'Nombre de curso es requerido.',
    }),
    description: Joi.string()
      .pattern(/(.*[a-zA-Z]){4}/)
      .required()
      .max(200)
      .messages({
        'string.pattern.base': 'Descripcion inválida, debe contener mas de 4 letras',
        'string.empty': 'Descripcion es un campo requerido',
        'string.max': 'Descripcion inválida, debe contener menos de 200 caracteres',
      }),
    inscriptionStartDate: Joi.date().greater('now').required().messages({
      'date.greater': 'Debe ser posterior a la fecha actual',
      'date.base': 'La fecha es un campo requerido',
      'any.ref': 'La fecha no debe ser menor a la fecha actual',
    }),
    inscriptionEndDate: Joi.date().greater(Joi.ref('inscriptionStartDate')).required().messages({
      'date.greater': 'Debe ser posterior a la fecha de inicio de inscripción',
      'date.base': 'La fecha es un campo requerido',
      'any.ref': 'La fecha no debe ser menor a la fecha actual',
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
        'date.greater': 'Debe ser posterior a la fecha de finalización de la inscripción',
        'date.base': 'La fecha es un campo requerido',
        'date.max': 'La fecha debe ser un dia posterior al fin de inscripcion',
        'date.min': 'La fecha debe ser un dia posterior al fin de inscripcion',
        'any.ref': 'La fecha no debe ser menor a la fecha actual',
      }),
    endDate: Joi.date().greater(Joi.ref('startDate')).messages({
      'date.greater': 'Debe ser posterior a la fecha de inicio del curso',
      'date.base': 'La fecha es un campo requerido',
      'any.ref': 'La fecha no debe ser menor a la fecha actual',
    }),
    isInternal: Joi.string().messages({
      'string.empty': 'Debe elegir entre Externo o Interno',
    }),
    type: Joi.string().messages({
      'string.empty': 'Debe elegir entre Express o Full',
    }),
    isActive: Joi.boolean(),
  }),
);

export { resolverCourse };
