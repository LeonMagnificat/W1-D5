import express from "express";
import multer from "multer";
import { saveImages, readProducts, writeProducts } from "../../library/fs-tools.js";

const productImageRouter = express.Router();

productImageRouter.post("/:id/upload", multer().single("image"), async (req, res, next) => {
  try {
    const productImagename = req.file.originalname;
    await saveImages(productImagename, req.file.buffer);

    const linkUrl = `localhost:3003/images/products/${productImagename}`;

    const productsArray = await readProducts();
    const productIndex = productsArray.findIndex((product) => product.id === req.params.id);
    if (productIndex !== -1) {
      const oldProduct = productsArray[productIndex];
      const newProduct = { ...oldProduct, imageUrl: linkUrl, updated: new Date() };
      productsArray[productIndex] = newProduct;
      await writeProducts(productsArray);
      res.status(200).send(newProduct);
    }
  } catch (error) {
    next(error);
  }
});

export default productImageRouter;
