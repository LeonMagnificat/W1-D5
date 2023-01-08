import express from "express";
import { readProducts, writeProducts } from "../../library/fs-tools.js";
import uniqid from "uniqid";
import { checkProductSchema, detectBadRequest } from "./validators.js";

const productsRouter = express.Router();

productsRouter.post("/", checkProductSchema, detectBadRequest, async (req, res, next) => {
  try {
    const addedProduct = { ...req.body, id: uniqid(), reviews: [], createdAt: new Date(), updatedAt: new Date() };
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

productsRouter.get("/", async (req, res, next) => {
  try {
    if (Object.keys(req.query).length) {
      const productsArray = await readProducts();
      const categoryProducts = productsArray.filter((product) => product.category === req.query.category);
      res.status(200).send(categoryProducts);
      //console.log(Object.keys(req.query).length);
    } else {
      const productsArray = await readProducts();
      res.status(200).send(productsArray);
      //console.log(req.query);
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const productsArray = await readProducts();
    const product = productsArray.find((product) => product.id === id);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const productsArray = await readProducts();
    const editedIndex = productsArray.findIndex((product) => product.id === id);
    const oldProduct = productsArray[editedIndex];

    const reviewsArray = [];
    reviewsArray.push(req.body);

    const updatedProduct = { ...oldProduct, ...req.body, updatedAt: new Date() };
    productsArray[editedIndex] = updatedProduct;
    writeProducts(productsArray);
    res.status(200).send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const productsArray = await readProducts();
    const remainingProducts = productsArray.filter((product) => product.id !== id);
    writeProducts(remainingProducts);
    res.status(200).send(remainingProducts);
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
