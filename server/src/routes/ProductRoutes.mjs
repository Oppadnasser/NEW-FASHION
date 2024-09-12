import { Router } from "express";
import { Products } from "../products.mjs";
import cokkie from "express-session";
import cookieParser from "cookie-parser";
import { Product } from "../mongoos/Schema/productSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { productValidation } from "../validations/product.mjs";
const Prouter = Router();
Prouter.use(cookieParser("hello"));

Prouter.get("/products", (request, response) => {
  // if (!request.user) return response.status(400).send("not logged in");
  const products = Product.find({})
    .then((PS) => {
      return response.status(200).send(PS);
    })
    .catch((err) => {
      console.log(err);
    });
});

Prouter.get("/api/product", async (request, response) => {
  if (!request.user) return response.status(400).send("log-in first");
  const { value } = request.body;
  if (!value) return response.status(400).send("error");
  Product.find({ productName: value })
    .then((products) => {
      if (products.length == 0) return response.status(404).send("not found");
      const update_products = products.map((product) => {
        const productObj = product.toObject();
        delete productObj._id;
        return productObj;
      });
      return response.status(200).send(update_products);
    })
    .catch((err) => {
      return response.status(404).send(err);
    });
});

Prouter.post(
  "/newProduct",
  checkSchema(productValidation),
  async (request, response) => {
    console.log(request.sessionID);
    if (!request.user)
      return response.status(401).send("you are not logged in");
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send(result);
    const data = matchedData(request);
    data.userOwner = request.cookies.id;
    console.log(data);
    const newProduct = new Product(data);
    try {
      await newProduct.save();
      return response.status(200).send(newProduct);
    } catch (err) {
      return response.status(400).send(err.errorResponse.errmsg);
    }
  }
);
Prouter.get("/update", (request, response) => {
  if (!request.user) return response.sendStatus(404);
  response.cookie("productid", "66c342a93c689f4467df8459", {
    maxAge: 60000 * 60,
  });
  response.sendStatus(200);
});
Prouter.patch("/update/product", async (request, response) => {
  if (!request.user) return response.status(400).send("not logged in");
  console.log(request.cookies["productid"]);
  if (!request.cookies["productid"])
    return response.status(404).send("please try again later");
  const { body } = request;
  const theProduct = await Product.findOne({
    userOwner: request.user._id,
    _id: request.cookies["productid"],
  }).catch((err) => {
    console.log(err);
    return response.sendStatus(400);
  });
  console.log(theProduct);
  if (!theProduct)
    return response
      .status(400)
      .send(" failed to update you are not the owner of this product");
  Product.findOneAndUpdate(
    {
      userOwner: request.user._id,
      _id: request.cookies["productid"],
    },
    body
  ).catch((err) => {
    return response.send(err);
  });
  return response.sendStatus(200);
});

Prouter.get("/MYproducts", (request, response) => {
  if (!request.user) return response.status(404).send("not logged in");
  Product.find({ userOwner: request.cookies.id })
    .then((products) => {
      return response.send(products);
    })
    .catch((err) => {
      return response.send(err);
    });
});

Prouter.delete("/delete/product", (request, response) => {
  if (!request.user) return response.status(400).send("must to be logged in");
  if (!request.cookies["productid"])
    return response.status(404).send("please try again later");
  Product.findOneAndDelete({
    _id: request.cookies["productid"],
    userOwner: request.user._id,
  })
    .then(() => {
      return response.sendStatus(200);
    })
    .catch((err) => {
      return response.send(err);
    });
});
export default Prouter;
