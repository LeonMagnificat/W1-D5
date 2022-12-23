import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { writeFile, readJSON, writeJSON } = fs;

const dataPATH = join(dirname(fileURLToPath(import.meta.url)), "../data");
const productsPATH = join(dataPATH, "products.json");

const publicPATH = join(process.cwd(), "./public/images/products");

console.log(productsPATH);

export const readProducts = () => {
  return readJSON(productsPATH);
};

export const writeProducts = (products) => {
  return writeJSON(productsPATH, products);
};

export const saveImages = (imageName, image) => {
  writeFile(join(publicPATH, imageName), image);
};
