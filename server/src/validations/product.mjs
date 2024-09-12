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
  photo: {
    notEmpty: { errorMessage: "No picture attatched" },
    isString: { errorMessage: "photo link it is null" },
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
