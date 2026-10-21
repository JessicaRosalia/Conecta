import type { Request, Response } from "express";
import * as yup from 'yup';
import { Validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";

interface IUser {
    name: string;
    email: string;
    password: string;
    phone?: string | undefined;
}

const bodyValidation: yup.ObjectSchema<IUser> = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    phone: yup.string().optional().nonNullable(),
});

export const createValidator = Validation({
    body: bodyValidation,
});

export const create = (req: Request<{}, {}, IUser>, res: Response) => {
    console.log(req.body);
    return res.status(StatusCodes.NOT_IMPLEMENTED).send("create de usuário ainda não implementado!");
}