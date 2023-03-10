import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const productSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name is required & should be a string",
    },
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "Description is required & should be a string",
    },
  },
  brand: {
    in: ["body"],
    isString: {
      errorMessage: "Brand is required & should be a string",
    },
  },
  price: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Price is required & should be a number",
    },
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "Category is required & should be a string",
    },
  },
};

const reviewSchema = {
  comment: {
    in: ["body"],
    isString: {
      errorMessage: "Comment is required & should be a string",
    },
  },
  rate: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Rate is required & should be a number",
    },
  },
  //   productId: {
  //     in: ["body"],
  //     isString: {
  //       errorMessage: "Product is required & should be a string",
  //     },
  //   },
};

export const checkProductSchema = checkSchema(productSchema);
export const checkReviewSchema = checkSchema(reviewSchema);

export const detectBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log("ERRORS:", errors);
  const errorsArray = errors.array();
  console.log("ERRORS WITH ARRAY:", errorsArray);
  if (errors.isEmpty()) {
    next();
  } else {
    next(createHttpError(400, "Something went wrong", { errorsList: errorsArray }));
  }
};
