import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { ModuleType } from 'src/interfaces/entities/module';

const resolverModule = joiResolver(
  Joi.object<ModuleType>({
    name: Joi.string()
      .pattern(/^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()-]+$/)
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.pattern.base': 'No debe empezar o terminar con un espacio ni contener símbolos.',
        'string.min': 'Nombre invalido, debe tener al menos 3 caracteres.',
        'string.max': 'Nombre invalido, debe tener no mas de 50 caracteres.',
        'string.empty': 'Nombre no puede estar vacio.',
        'any.required': 'Nombre es un campo requerido.',
      }),
    description: Joi.string()
      .pattern(/^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()!@#$%^&*()_+={};':",.<>/?-]+$/)
      .min(3)
      .max(200)
      .required()
      .messages({
        'string.pattern.base': 'No debe empezar o terminar con un espacio.',
        'string.min': 'Descripcion invalida, debe tener al menos 3 caracteres.',
        'string.max': 'Descripcion invalida, debe tener no mas de 200 caracteres.',
        'string.empty': 'Descripcion no puede estar vacia.',
        'any.required': 'Descripcion es un campo requerido.',
      }),
    status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').required().messages({
      'string.valid': 'Invalid status, should be one of the valids status.',
      'any.required': 'Status is a required field.',
      'any.only': 'Debe si o si elegir una de las opciones',
    }),
    type: Joi.string().valid('DEV', 'QA', 'UIUX', 'GENERAL').required().messages({
      'string.valid': 'Invalid type, should be one of the valids types.',
      'any.required': 'Type is a required field.',
      'any.only': 'Debe si o si elegir una de las opciones',
    }),
    groups: Joi.array().max(200).optional().unique(),
    contents: Joi.array()
      .items(
        Joi.string()
          .pattern(/^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()!@#$%^&*()_+={};':",.<>/?-]+$/)
          .min(2)
          .max(24)
          .required()
          .messages({
            'string.pattern.base': 'No debe empezar con un espacio.',
            'string.min': 'Contenido invalido, debe tener al menos 2 caracteres.',
            'string.max': 'Contenido invalido, debe tener no mas de 24 caracteres.',
            'any.required': 'Contenido es un campo requerido.',
          }),
      )
      .optional()
      .min(1)
      .max(200)
      .messages({
        'array.includesRequiredUnknowns': 'Debe contener al menos 3 elementos.',
      }),
    isActive: Joi.boolean().required().messages({
      'any.required': 'Is active is a required field.',
    }),
  }),
);

export { resolverModule };
