import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes.js";
import { Validation } from "../../shared/middlewares/Validation.js";

interface IParamProps {
  id?: number;
}

interface IBodyProps {
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  phone?: string | undefined;
}

const paramValidation: yup.ObjectSchema<IParamProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0),
});

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup
  .object()
  .shape({
    name: yup.string().optional().min(3),
    email: yup.string().optional().email(),
    password: yup.string().optional().min(8),
    phone: yup.string().optional().nonNullable(),
  })
  .test(
    "at-least-one-field",
    "Informe pelo menos um campo para atualizar",
    (value) => value !== undefined && Object.keys(value).length > 0,
  );

export const updateByIdValidator = Validation({
  params: paramValidation,
  body: bodyValidation,
});

export const updateById = async (
  req: Request<IParamProps, string, IBodyProps>,
  res: Response,
) => {
  if (Number(req.params.id) === 9999) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: "Registro não encontrado",
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};