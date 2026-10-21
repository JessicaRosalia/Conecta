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
    console.log(req.params);
    return res.status(StatusCodes.NOT_IMPLEMENTED).send("getById de usuário ainda não implementado!");
}