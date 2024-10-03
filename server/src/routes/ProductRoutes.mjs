import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";
import { Product } from "../mongoos/Schema/productSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { productValidation } from "../validations/product.mjs";
const Prouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(dirname(__filename)));

const uploadDir = path.join(__dirname, "uploads");

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|jfif/;
  const fileType = filetypes.test(file.mimetype);
  const fileExt = filetypes.test(file.originalname.toLowerCase());
  if (fileType && fileExt) return cb(null, true);
  cb(new Error("Error: not allowd type"), false);
};

if (!fs.existsSync(uploadDir)) {
  fs.mkdir(uploadDir, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("created successfuly");
    }
  });
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 200000 },
  fileFilter: fileFilter,
});
Prouter.use(cookieParser("hello"));

Prouter.get("/testfile", (request, response) => {
  console.log(uploadDir);
  return response.sendStatus(200);
});

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
  upload.single("photo"),
  checkSchema(productValidation),
  (request, response, next) => {
    console.log(request.file);
    if (!request.file) {
      return response.status(400).json({ error: "Image file is required" });
    }
    next();
  },
  async (request, response) => {
    if (!request.user)
      return response.status(401).send("you are not logged in");
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send(result);
    const imagePath = request.file.path;
    const data = matchedData(request);
    data.photo = imagePath;
    data.userOwner = request.cookies.id;
    console.log(data);
    const newProduct = new Product(data);
    try {
      await newProduct.save();
      return response.status(200).send(data.photo);
    } catch (err) {
      return response.status(400).send(err.errorResponse.errmsg);
    }
  }
);
Prouter.patch(
  "/update/product",
  upload.single("newPhoto"),
  async (request, response) => {
    if (!request.user) return response.status(400).send("not logged in");
    const { body } = request;
    const newData = { ...body };
    delete newData.id;
    if (request.file) {
      newData.photo = request.file.path;
      let oldPhotoName = body.oldPhoto.split("\\");
      const filePath = path.join(
        __dirname,
        "uploads",
        oldPhotoName[oldPhotoName.length - 1]
      );
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          console.log(filePath);
          if (err) return response.status(400).send("file error");
        });
      }
    } else {
      delete newData.photo;
    }
    Product.findOneAndUpdate(
      {
        _id: body.id,
      },
      newData
    ).catch((err) => {
      return response.send(err);
    });
    return response.status(200).send(newData.photo);
  }
);

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

Prouter.post("/delete/product", (request, response) => {
  if (!request.user) return response.status(400).send("must to be logged in");
  const photoName = request.body.photo.split("\\")[1];
  const filepath = path.join(uploadDir, photoName);
  console.log(filepath);
  // return response.sendStatus(200);
  Product.findOneAndDelete({
    _id: request.body.id,
  })
    .then(() => {
      console.log("successfuly");
      if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {
          if (err) return response.status(402).send(err);
        });
      }
      return response.sendStatus(200);
    })
    .catch((err) => {
      return response.status(400).send(err);
    });
});

export default Prouter;
