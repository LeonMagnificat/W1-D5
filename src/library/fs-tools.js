import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { writeFile, readJSON, writeJSON } = fs;

const dataPATH = join(dirname(fileURLToPath(import.meta.url)), "../data");
const productsPATH = join(dataPATH, "products.json");

console.log(productsPATH);

export const readProducts = () => {
  return readJSON(productsPATH);
};

export const writeProducts = (products) => {
  return writeJSON(productsPATH, products);
};
