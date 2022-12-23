import express from "express";
import productsRouter from "./api/products/index.js";
import listEndpoints from "list-endpoints-express";
import { badRequest } from "./errorsHandler.js";
import productImageRouter from "./api/files/index.js";
import reviewsRouter from "./api/reviews/index.js";
import { join } from "path";

const server = express();
const port = 3003;
const publicPATH = join(process.cwd(), "./public");

server.use(express.static(publicPATH));

server.use(express.json());

server.use("/products", productsRouter);
server.use("/product", productImageRouter);
server.use("/products", reviewsRouter);

server.use(badRequest);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.table(listEndpoints(server));
});
