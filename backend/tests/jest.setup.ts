import supertest from "supertest";
import { server } from "../src/server/Server.js";

export const testServer = supertest(server);