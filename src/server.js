import express from "express";
import productsRouter from "./api/products/index.js";
import listEndpoints from "list-endpoints-express";

const server = express();
const port = 3003;

server.use(express.json());

server.use("/products", productsRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.table(listEndpoints(server));
});
