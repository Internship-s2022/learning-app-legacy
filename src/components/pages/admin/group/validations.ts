import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Group } from 'src/interfaces/entities/group';
import { moduleTypeValidation, nameValidation } from 'src/utils/validation-rules';

const resolverGroup = joiResolver(
  Joi.object<Group>({
    name: nameValidation,
    type: moduleTypeValidation,
    isActive: Joi.boolean(),
  }),
);

export { resolverGroup };
