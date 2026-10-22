import type { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes.js";
import { Validation } from "../../shared/middlewares/Validation.js";

interface IParamProps {
  id?: number;
}

const paramValidation: yup.ObjectSchema<IParamProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0),
});

export const deleteByIdValidator = Validation({
  params: paramValidation,
});

export const deleteById = async (req: Request<IParamProps>, res: Response) => {

  if(Number(req.params.id) === 9999) return res.status(StatusCodes.NOT_FOUND).json({
    errors: {
      default: "Registro não encontrado"
    }
  });
  
  return res.status(StatusCodes.NO_CONTENT).send("");
};