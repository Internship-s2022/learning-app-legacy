import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Group } from 'src/interfaces/entities/group';
import { moduleTypesValidation, nameValidation } from 'src/utils/validation-rules';

const resolverGroup = joiResolver(
  Joi.object<Group>({
    name: nameValidation,
    type: moduleTypesValidation,
    isActive: Joi.boolean(),
  }),
);

export { resolverGroup };
