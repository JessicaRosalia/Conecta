
import { describe, expect, it } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

const criarUsuario = (dados = {}) => {
  return testServer
    .post("/usuarios")
    .send({
      name: "Jéssica Rosália",
      email: "jessica@gmail.com",
      password: "12345678",
      ...dados,
    });
};

describe("Usuário - Create", () => {

  it("deve retornar 201 ao receber dados válidos", async () => {
    const response = await criarUsuario();

    expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(response.body).toBe(1);
  });

  it("deve retornar 400 quando o nome tiver menos de 3 caracteres", async () => {
    const response = await criarUsuario({ name: "Je" });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.name");
  });

  it("deve retornar 400 quando o e-mail for inválido", async () => {
    const response = await criarUsuario({
      email: "jessica@.gmail.com",
    });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.email");
  });

  it("deve retornar 400 quando a senha tiver menos de 8 caracteres", async () => {
    const response = await criarUsuario({ password: "1234567" });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.password");
  });

  it.each([
    {
      campo: "name",
      dados: {
        name: undefined,
      },
    },
    {
      campo: "email",
      dados: {
        email: undefined,
      },
    },
    {
      campo: "password",
      dados: {
        password: undefined,
      },
    },
  ])(
    "deve retornar 400 quando o campo $campo estiver ausente",
    async ({ campo, dados }) => {
      const response = await criarUsuario(dados);

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty(`errors.body.${campo}`);
    },
  );
});
