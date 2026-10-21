import * as create from './Create.js';
import * as getById from './GetById.js';

export const UsersController: typeof create & typeof getById = {
    ...create,
    ...getById,
};