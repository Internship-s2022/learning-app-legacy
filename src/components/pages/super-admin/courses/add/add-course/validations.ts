import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Course } from 'src/interfaces/entities/course';

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
    }),
    inscriptionEndDate: Joi.date().greater(Joi.ref('inscriptionStartDate')).required().messages({
      'date.greater': 'Debe ser posterior a la fecha de inicio de inscripción',
      'date.base': 'La fecha es un campo requerido',
    }),
    startDate: Joi.date().greater(Joi.ref('inscriptionEndDate')).required().messages({
      'date.greater': 'Debe ser posterior a la fecha de finalización de la inscripción',
      'date.base': 'La fecha es un campo requerido',
    }),
    endDate: Joi.date().greater(Joi.ref('startDate')).messages({
      'date.greater': 'Debe ser posterior a la fecha de inicio del curso',
      'date.base': 'La fecha es un campo requerido',
    }),
    isInternal: Joi.string().messages({
      'string.empty': 'Debe elegir entre Externo o Interno',
    }),
    type: Joi.string().messages({
      'string.empty': 'Debe elegir entre Express o Full',
    }),
    isActive: Joi.boolean(),
    courseUsers: Joi.array().items(
      Joi.object({
        course: Joi.string(),
        user: Joi.string(),
        role: Joi.string(),
        isActive: Joi.boolean(),
      }),
    ),
  }),
);

export { resolverCourse };
