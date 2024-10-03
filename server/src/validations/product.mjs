import { body, check } from "express-validator";

export const productValidation = {
  name: {
    notEmpty: { errorMessage: "name is empty" },
    isString: true,
  },
  price: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "must be at least one",
    },
  },
  description: {
    isString: { errorMessage: "must be string" },
    notEmpty: { errorMessage: "the descrpition is empty" },
    isLength: {
      options: {
        max: 500,
        errorMessage: "description must be at least 100",
      },
    },
  },

  quantity: {
    isInt: { errorMessage: "no quantitiy had been sent" },
  },
  companyName: {
    notEmpty: { errorMessage: "invalid company name" },
  },
  brand: {
    notEmpty: { errorMessage: "invalid company name" },
  },
  shippingExpenses: {
    isInt: { errorMessage: "invalid shipping expenses" },
  },
  evaluation: {
    isInt: {
      errorMessage: "error evaluation number",
    },
  },
  evaluatorNumber: {
    isInt: {
      errorMessage: "error evaluation number",
    },
  },
};

// export const productValidation = [
//   body("name").notEmpty().withMessage("name is empty").isString(),
//   body("price").isInt({ min: 1 }).withMessage("must be at least one"),
//   body("description")
//     .isString()
//     .withMessage("must be string")
//     .notEmpty()
//     .withMessage("the description is empty")
//     .isLength({ max: 500 })
//     .withMessage("description must be at least 100"),
//   body("quantity").isInt().withMessage("no quantity had been sent"),
//   body("companyName").notEmpty().withMessage("invalid company name"),
//   body("brand").notEmpty().withMessage("invalid company name"),
//   body("shippingExpenses").isInt().withMessage("invalid shipping expenses"),
//   body("evaluation").isInt().withMessage("error evaluation number"),
//   body("evaluatorNumber").isInt().withMessage("error evaluation number"),

//   // Check if the image is present
// ];
