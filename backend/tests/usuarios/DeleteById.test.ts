
import { describe, expect, it } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Usuário - DeleteById", () => {
  it("deve apagar registro por id", async () => {
    const res1 = await testServer
      .post("/usuarios")
      .send({
        name: "Jéssica Rosália",
        email: "jessica@gmail.com",
        password: "12345678",
      });

    expect(res1.statusCode).toBe(StatusCodes.CREATED);

    const resApagado = await testServer
      .delete(`/usuarios/${res1.body}`)
      .send();

    expect(resApagado.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("deve retornar erro ao tentar apagar registro inexistente", async () => {
    const idInexistente = 9999;

    const response = await testServer
      .delete(`/usuarios/${idInexistente}`)
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
        .delete(`/usuarios/${id}`)
        .send();

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    },
  );
});
