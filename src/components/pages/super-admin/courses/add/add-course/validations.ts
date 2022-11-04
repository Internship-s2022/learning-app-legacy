import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { CourseTypes } from './types';

const resolverCourse = joiResolver(
  Joi.object<CourseTypes>({
    name: Joi.string().min(3).max(50).required().messages({
      'string.min': 'Invalid course name, it must contain more than 3 letters',
      'string.max': 'Invalid course name, it must not contain more than 50 letters',
      'any.required': 'Name is a required field',
    }),
    description: Joi.string()
      .pattern(/(.*[a-zA-Z]){4}/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid description, it must contain at least 4 letters',
        'any.required': 'Description is a required field',
      }),
    inscriptionStartDate: Joi.date().greater('now').required().messages({
      'date.greater': 'Invalid inscription start date, it must be after the current date',
      'any.required': 'Inscription start date is a required field',
    }),
    inscriptionEndDate: Joi.date().greater(Joi.ref('inscriptionStartDate')).required().messages({
      'date.greater': 'Invalid inscription end date, it must be after the inscription start date',
      'any.required': 'Inscription end date is a required field',
    }),
    startDate: Joi.date().greater(Joi.ref('inscriptionEndDate')).required().messages({
      'date.greater': 'Invalid start date, it must be after the inscription end date',
      'any.required': 'Start date is a required field',
    }),
    endDate: Joi.date().greater(Joi.ref('startDate')).messages({
      'date.greater': 'Invalid end date, it must be after the course start date',
    }),
    type: Joi.string().max(15).messages({
      'string.max': 'Invalid type, it must not contain more than 15 letters',
    }),
    isInternal: Joi.boolean(),
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
