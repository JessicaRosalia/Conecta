import { describe, expect, it } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

interface IUsuario {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

const atualizarUsuario = (dados: IUsuario = {}, id = 1) => {
  return testServer
    .patch(`/usuarios/${id}`)
    .send(dados);
};

describe("Usuário - Update", () => {
  it("deve retornar 204 ao atualizar somente o nome", async () => {
    const response = await atualizarUsuario({
      name: "Jéssica Fernandes",
    });

    expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("deve retornar 204 ao atualizar somente o e-mail", async () => {
    const response = await atualizarUsuario({
      email: "novo@gmail.com",
    });

    expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("deve retornar 204 ao atualizar somente a senha", async () => {
    const response = await atualizarUsuario({
      password: "novasenha123",
    });

    expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("deve retornar 204 ao atualizar somente o telefone", async () => {
    const response = await atualizarUsuario({
      phone: "11987654321",
    });

    expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("deve retornar 204 ao receber vários campos válidos", async () => {
    const response = await atualizarUsuario({
      name: "Jéssica Fernandes",
      email: "novo@gmail.com",
    });

    expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("deve retornar 400 quando o corpo estiver vazio", async () => {
    const response = await atualizarUsuario();

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it("deve retornar 400 quando o nome tiver menos de 3 caracteres", async () => {
    const response = await atualizarUsuario({
      name: "Je",
    });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.name");
  });

  it("deve retornar 400 quando o e-mail for inválido", async () => {
    const response = await atualizarUsuario({
      email: "email-invalido",
    });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.email");
  });

  it("deve retornar 400 quando a senha tiver menos de 8 caracteres", async () => {
    const response = await atualizarUsuario({
      password: "1234567",
    });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.password");
  });

  it("deve retornar 400 quando o ID for inválido", async () => {
    const response = await atualizarUsuario(
      { name: "Jéssica Fernandes" },
      0,
    );

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it("deve retornar 404 quando o registro não for encontrado", async () => {
    const response = await atualizarUsuario(
        { name: "Jéssica Fernandes" },
        9999,
    );

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toHaveProperty(
        "errors.default",
        "Registro não encontrado",
    );
    });
});