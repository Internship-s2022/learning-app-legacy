import Joi from 'joi';

// TO-DO: Create a function to generate dynamic messages
export const firstNameMessages: Joi.LanguageMessages = {
  'string.pattern.base': 'Nombre inválido, debe contener sólo letras.',
  'string.min': 'Nombre inválido, debe contener más de una letra.',
  'string.max': 'Nombre inválido, no debe contener más de 50 letras.',
  'string.empty': 'Nombre es requerido.',
};

export const lastNameMessages: Joi.LanguageMessages = {
  'string.pattern.base': 'Apellido inválido, debe contener sólo letras.',
  'string.min': 'Apellido inválido, debe contener más de una letra.',
  'string.max': 'Apellido inválido, no debe contener más de 50 letras.',
  'string.empty': 'Apellido es requerido.',
};

export const countryMessages: Joi.LanguageMessages = {
  'string.valid': 'País inválido, debe ser uno de los valores posibles.',
  'any.only': 'País es requerido.',
};

export const titleMessages: Joi.LanguageMessages = {
  'string.pattern.base': 'Enunciado inválido, no debe empezar ni terminar en espacios.',
  'string.min': 'Enunciado inválido, debe contener más de un carácter.',
  'string.max': 'Enunciado inválido, no debe contener más de 50 caracteres.',
  'string.empty': 'El enunciado es un campo requerido.',
  'any.required': 'El enunciado es un campo requerido.',
};

export const contentNameMessages: Joi.LanguageMessages = {
  'string.pattern.base': 'No debe empezar con un espacio.',
  'string.min': 'Contenido inválido, debe tener al menos 2 caracteres.',
  'string.max': 'Contenido inválido, debe tener no mas de 50 caracteres.',
  'any.required': 'Contenido es un campo requerido.',
};

export const nameMessages: Joi.LanguageMessages = {
  'string.pattern.base': 'No debe empezar o terminar con un espacio ni contener símbolos.',
  'string.min': 'Nombre inválido, debe tener al menos un carácter.',
  'string.max': 'Nombre inválido, no debe contener más de 50 caracteres.',
  'string.empty': 'Nombre no puede estar vacío.',
  'any.required': 'Nombre es un campo requerido.',
};

export const descriptionMessages: Joi.LanguageMessages = {
  'string.pattern.base':
    'Descripción inválida, no debe empezar o terminar con espacios ni contener símbolos determinados.',
  'string.max': 'Descripción inválida, no debe contener más de 1000 caracteres.',
  'string.min': 'Descripción inválida, debe contener más de 3 caracteres.',
  'string.empty': 'Descripción es un campo requerido.',
  'any.required': 'Descripción es un campo requerido.',
};

export const longStringMessages: Joi.LanguageMessages = {
  'string.pattern.base':
    'Respuesta inválida, no debe empezar o terminar con espacios ni contener símbolos determinados.',
  'string.max': 'Respuesta inválida, no debe contener más de 1000 caracteres.',
  'string.min': 'Respuesta inválida, debe contener más de 3 caracteres.',
  'string.empty': 'Respuesta es un campo requerido.',
  'any.required': 'Respuesta es un campo requerido.',
};

export const emailMessages: Joi.LanguageMessages = {
  'string.empty': 'El email es requerido',
  'string.pattern.base': 'Formato de email no valido',
  'string.max': 'El email debe tener como máximo 256 caracteres.',
};

export const dniMessages: Joi.LanguageMessages = {
  'string.pattern.base': 'DNI inválido, debe contener sólo números.',
  'string.min': 'DNI inválido, debe contener más de 6 números.',
  'string.max': 'DNI inválido, no debe contener más de 8 números.',
  'string.empty': 'DNI es requerido.',
};

export const phoneMessages: Joi.LanguageMessages = {
  'string.pattern.base': 'Número de teléfono inválido, debe contener sólo números.',
  'string.min': 'Número de teléfono inválido, debe contener 10 u 11 números.',
  'string.max': 'Número de teléfono inválido, debe contener 10 u 11 números.',
  'string.empty': 'Número de teléfono requerido.',
};

export const moduleTypesMessages = {
  'string.valid': 'Tipo invalido, debe ser uno de los válidos.',
  'any.required': 'Tipo es un campo requerido.',
  'any.only': 'Debe si o si elegir una de las opciones',
};

export const birthDateMessages = {
  'date.max': 'Fecha de nacimiento inválida, debe ser mayor de 18 años.',
  'date.min': 'Fecha de nacimiento inválida, debe ser menor de 100 años.',
  'date.base': 'Fecha de nacimiento es requerida.',
};
