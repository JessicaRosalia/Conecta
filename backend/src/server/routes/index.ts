import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsersController } from '../controllers/index.js';
const router = Router();

router.get('/', (req, res) => {
    return res.status(StatusCodes.OK).send('Endpoint de teste funcionando!');
});

router.post('/usuarios', UsersController.createValidator, UsersController.create);
router.get('/usuarios/:id', UsersController.getByIdValidator, UsersController.getById);
router.patch('/usuarios/:id', UsersController.updateByIdValidator, UsersController.updateById);
router.delete('/usuarios/:id', UsersController.deleteByIdValidator, UsersController.deleteById);

export { router };