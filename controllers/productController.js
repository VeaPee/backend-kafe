// const asyncHandler = require("express-async-handler");
// const Product = require("../models/productModel");
// const { fileSizeFormatter } = require("../utils/fileUpload");
// const uploadFile = require("../utils/fileUpload");
// const { Storage } = require("@google-cloud/storage");
// const storage = new Storage({
//   projectId: "tabebuya-cafe",
// });
// const bucket = storage.bucket("kafe-tabebuya");

// // Create Prouct
// const createProduct = asyncHandler(async (req, res) => {
//   const { name, sku, category, quantity, price, description } = req.body;

//   //   Validation
//   if (!name || !category || !quantity || !price || !description) {
//     res.status(400);
//     throw new Error("Please fill in all fields");
//   }

//   // Handle Image upload
//   let fileData = "https://storage.googleapis.com/kafe-tabebuya/Placeholder.png";

//   if (req.file) {
//     // Save image to Google Cloud Storage
//     await uploadFile(req, res);

//     const fileExt = req.file.originalname.split('.').pop();

//     if (fileExt !== 'png' && fileExt !== 'jpg' && fileExt !== 'jpeg' && fileExt !== 'PNG' && fileExt !== 'JPG' && fileExt !== 'JPEG') {
//       const response = new Response.Error(400, 'Only image(PNG, JPG, and JPEG) is allowed' );
//       return res.status(httpStatus.BAD_REQUEST).json(response);
//     }

//     try {
//       const blob = bucket.file(
//         `product-images/${accountId}/` +
//           req.file.originalname
//             .toLowerCase()
//             .split(" ")
//             .join("-" + Date.now() + ".")
//       );
//       const blobStream = blob.createWriteStream({
//         resumable: false,
//       });

//       blobStream.on("error", (err) => {
//         const response = new Response.Error(500, err.message);
//         return res.status(httpStatus.BAD_REQUEST).json(response);
//       });

//       blobStream.on("uploaded", async (data) => {
//         const uploadUrl = format(
//           `https://storage.googleapis.com/${
//             bucket.name
//           }/${blob.name.toLowerCase()}`
//         );
//       });

//       fileData = `https://storage.googleapis.com/${bucket.name}/${blob.name
//         .toLowerCase()
//         .split(" ")
//         .join("-")}`;

//       blobStream.end(req.file.buffer);
//     } catch (error) {
//       // res.status(500);
//       // throw new Error("Image could not be uploaded");
//       const response = new Response.Error(true, error.message);
//       res.status(httpStatus.BAD_REQUEST).json(response);
//     }
//   }

//   // Create Product
//   const product = await Product.create({
//     user: req.user.id,
//     name,
//     sku,
//     category,
//     quantity,
//     price,
//     description,
//     image: fileData,
//   });

//   res.status(201).json(product);
// });

// // Get all Products
// const getProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({ user: req.user.id }).sort("-createdAt");
//   res.status(200).json(products);
// });

// // Get single product
// const getProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   // if product doesnt exist
//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }
//   // Match product to its user
//   if (product.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("User not authorized");
//   }
//   res.status(200).json(product);
// });

// // Delete Product
// const deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   // if product doesnt exist
//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }
//   // Match product to its user
//   if (product.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("User not authorized");
//   }
//   await product.remove();
//   res.status(200).json({ message: "Product deleted." });
// });

// // Update Product
// const updateProduct = asyncHandler(async (req, res) => {
//   const { name, category, quantity, price, description } = req.body;
//   const { id } = req.params;

//   const product = await Product.findById(id);

//   // if product doesnt exist
//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }
//   // Match product to its user
//   if (product.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("User not authorized");
//   }

//   // Handle Image upload
//   let fileData = {};
//   if (req.file) {
//     // Save image to cloudinary
//     let uploadedFile;
//     try {
//       uploadedFile = await cloudinary.uploader.upload(req.file.path, {
//         folder: "Pinvent App",
//         resource_type: "image",
//       });
//     } catch (error) {
//       res.status(500);
//       throw new Error("Image could not be uploaded");
//     }

//     fileData = {
//       fileName: req.file.originalname,
//       filePath: uploadedFile.secure_url,
//       fileType: req.file.mimetype,
//       fileSize: fileSizeFormatter(req.file.size, 2),
//     };
//   }

//   // Update Product
//   const updatedProduct = await Product.findByIdAndUpdate(
//     { _id: id },
//     {
//       name,
//       category,
//       quantity,
//       price,
//       description,
//       image: Object.keys(fileData).length === 0 ? product?.image : fileData,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).json(updatedProduct);
// });

// module.exports = {
//   createProduct,
//   getProducts,
//   getProduct,
//   deleteProduct,
//   updateProduct,
// };



//ENV
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  //   Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Tabebuya",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Tabebuya",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};