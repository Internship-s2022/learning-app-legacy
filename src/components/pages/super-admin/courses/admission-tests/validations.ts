import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { nameMessages } from 'src/constants/validation-messages';
import { longStringRegex, shortStringValidation } from 'src/utils/validation-rules';

export const admissionTestResolver = joiResolver(
  Joi.object({
    name: shortStringValidation(longStringRegex).messages(nameMessages),
  }),
);
