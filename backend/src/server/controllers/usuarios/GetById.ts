import type { Request, Response } from "express";
import * as yup from 'yup';
import { Validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";

interface IParam {
    id?: number;
}

const paramValidation: yup.ObjectSchema<IParam> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

export const getByIdValidator = Validation({
    params: paramValidation,
});

export const getById = (req: Request<IParam>, res: Response) => {
    if(Number(req.params.id) === 9999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: "Registro não encontrado"
        }
    });

    return res.status(StatusCodes.OK).send({
        id: req.params.id,
        name: "Jéssica Rosália",
        email: "jessicaf@gmail.com",
        password: "12345678"
    });
}