import express from "express";
import { readProducts, writeProducts } from "../../library/fs-tools.js";
import { checkReviewSchema, detectBadRequest } from "../products/validators.js";
import uniqid from "uniqid";

const reviewsRouter = express.Router();

reviewsRouter.post("/:id/reviews", checkReviewSchema, detectBadRequest, async (req, res, next) => {
  try {
    const newReview = { ...req.body, date: new Date(), productId: req.params.id, reviewId: uniqid() };
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

reviewsRouter.get("/:id/reviews", async (req, res, next) => {
  try {
    const productsArray = await readProducts();
    const product = productsArray.find((product) => product.id === req.params.id);
    const productReview = product.reviews;
    res.status(200).send(productReview);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/:id/review/:reviewId", async (req, res, next) => {
  try {
    const productsArray = await readProducts();
    const product = productsArray.find((product) => product.id === req.params.id);
    const productReview = product.reviews;
    const review = productReview.find((review) => review.reviewId === req.params.reviewId);
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.put("/:id/review/:reviewId", async (req, res, next) => {
  const productsArray = await readProducts();
  const product = productsArray.find((product) => product.id === req.params.id);
  const productReview = product.reviews;
  console.log(productReview);
  const editedIndex = productReview.findIndex((review) => review.reviewId === req.params.reviewId);
  const oldReview = productReview[editedIndex];
  const newReview = { ...oldReview, ...req.body, updatedAt: new Date() };
  productReview[editedIndex] = newReview;
  console.log("INDEX:", editedIndex);
  console.log(productReview);
  await writeProducts(productsArray);
  res.status(200).send(newReview);
});

reviewsRouter.delete("/:id/review/:reviewId", async (req, res, next) => {
  const productsArray = await readProducts();
  const product = productsArray.find((product) => product.id === req.params.id);
  const productReview = product.reviews;
  const remainingReview = productReview.filter((review) => review.reviewId !== req.params.reviewId);
  product.reviews = remainingReview;
  await writeProducts(productsArray);
  res.status(200).send(remainingReview);
});
export default reviewsRouter;
