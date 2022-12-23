import express from "express";
import { readProducts, writeProducts } from "../../library/fs-tools.js";
import { checkReviewSchema, detectBadRequest } from "../products/validators.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/:id/reviews", checkReviewSchema, detectBadRequest, async (req, res, next) => {
  try {
    const newReview = { ...req.body, date: new Date(), productId: req.params.id };
    const productsArray = await readProducts();
    const productIndex = productsArray.findIndex((product) => product.id === req.params.id);

    const oldProduct = productsArray[productIndex];

    oldProduct.reviews.push(newReview);
    productsArray[productIndex] = oldProduct;

    await writeProducts(productsArray);

    console.log(productsArray);

    console.log(productIndex);
    console.log(oldProduct);
    res.status(200).send(oldProduct);
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
