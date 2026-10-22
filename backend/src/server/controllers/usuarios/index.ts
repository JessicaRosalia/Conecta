import * as create from './Create.js';
import * as getById from './GetById.js';
import * as deleteById from './DeleteById.js';
import * as updateById from './UpdateById.js';
import * as getAll from './GetAll.js';

type TUsersController = typeof create & typeof getAll & typeof getById & typeof updateById & typeof deleteById;

export const UsersController: TUsersController = {
    ...create,
    ...getById,
    ...deleteById,
    ...getAll,
    ...updateById
};