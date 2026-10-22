
import { describe, expect, it } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Usuário - GetById", () => {
  it("Buscar registro por id", async () => {

    const res1 = await testServer
      .post("/usuarios")
      .send({
        name: "Jéssica Rosália",
        email: "jessica@gmail.com",
        password: "12345678",
      });

    expect(res1.statusCode).toBe(StatusCodes.CREATED);

    const resBuscado = await testServer
      .get(`/usuarios/${res1.body}`)
      .send();

    expect(resBuscado.statusCode).toBe(StatusCodes.OK);
    expect(resBuscado.body).toHaveProperty("id");
    expect(resBuscado.body).toHaveProperty("name");
    expect(resBuscado.body).toHaveProperty("email");
    expect(resBuscado.body).toHaveProperty("phone");

    expect(resBuscado.body).not.toHaveProperty("password");
    expect(resBuscado.body).not.toHaveProperty("passwordHash");
  });

  it("Tenta buscar registro que não existe", async () => {
    const idDoesnotExist = 9999;

    const response = await testServer
      .get(`/usuarios/${idDoesnotExist}`)
      .send();

    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");
  });

  it.each([
    { id: "abc" },
    { id: "1.5" },
    { id: "0" },
    { id: "-1" },
  ])(
    "deve retornar 400 quando o id for '$id'",
    async ({ id }) => {
      const response = await testServer
        .get(`/usuarios/${id}`)
        .send();

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    },
  );
});
