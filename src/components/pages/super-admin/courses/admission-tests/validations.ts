import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

export const admissionTestResolver = joiResolver(
  Joi.object({
    name: Joi.string()
      .pattern(/^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()!@#$%^&*()_+={};':",.<>/?]+$/)
      .min(3)
      .max(50)
      .messages({
        'string.pattern.base': 'Nombre inválido, no debe empezar ni terminar en espacios.',
        'string.min': 'Nombre inválido, debe contener más de 3 caracteres.',
        'string.empty': 'Nombre inválido, debe contener más de 3 caracteres.',
        'string.max': 'Nombre inválido, no debe contener más de 50 caracteres.',
      }),
  }),
);
