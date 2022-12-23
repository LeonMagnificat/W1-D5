import express from "express";
import { readProducts, writeProducts } from "../../library/fs-tools.js";
import uniqid from "uniqid";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const addedProduct = { ...req.body, id: uniqid(), updated: new Date() };
    console.log(addedProduct);
    const productsArray = await readProducts();
    console.log(productsArray);
    productsArray.push(addedProduct);
    writeProducts(productsArray);

    res.status(201).send(addedProduct);
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
