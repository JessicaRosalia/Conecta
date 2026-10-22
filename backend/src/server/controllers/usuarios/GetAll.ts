import type { Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes.js";
import { Validation } from "../../shared/middlewares/Validation.js";

interface IQueryProps {
  page?: number | undefined;
  limit?: number | undefined;
  filter?: string | undefined;
}

const queryValidation: yup.ObjectSchema<IQueryProps> = yup.object().shape({
  page: yup.number().notRequired().nonNullable().moreThan(0),
  limit: yup.number().notRequired().nonNullable().moreThan(0),
  filter: yup.string().notRequired().nonNullable(),
});

export const getAllValidator = Validation({
  query: queryValidation,
});

export const getAll = async (
  req: Request<ParamsDictionary, string, string, IQueryProps>, res: Response
) => {
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", 1);

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      name: "Jéssica Rosália",
      email: "jessica@gmail.com",
      phone: "84999234580"
    }
  ]);
};