import fastify from "fastify";
import * as dotenv from "dotenv";
dotenv.config({});
import homeRoutes from "./routes/index";

const server = fastify();
const PORT: number = parseInt(`${process.env.PORT}`, 10) || 8080;

server.register(homeRoutes);

server.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});
