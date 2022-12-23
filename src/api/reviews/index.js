import express from "express";
import { readProducts, writeProducts } from "../../library/fs-tools.js";
import { checkReviewSchema, detectBadRequest } from "../products/validators.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/:id/reviews", checkReviewSchema, detectBadRequest, async (req, res, next) => {
  try {
    const newReview = { ...req.body, date: new Date(), productId: req.params.id };
    const productsArray = await readProducts();
    const reviewedProduct = productsArray.find((product) => product.id === req.params.id);

    const productWithReview = { ...reviewedProduct, updatedAt: new Date(), reviews: newReview };
    productsArray.push(productWithReview);
    await writeProducts(productsArray);
    res.status(200).send(productWithReview);
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
