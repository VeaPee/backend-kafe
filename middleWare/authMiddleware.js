// const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const jwt = require("jsonwebtoken");
// const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// const secretmanagerClient = new SecretManagerServiceClient();

// const callAccessSecretVersion = async () => {
//   // Construct request
//   const request = {
//     name: 'projects/720009966636/secrets/JWT_SECRET/versions/latest'
//   };

//   // Run request
//   const [response] = await secretmanagerClient.accessSecretVersion(request);
//   const secretValue = response.payload.data.toString();
//   return secretValue;
// }

// const protect = asyncHandler(async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       res.status(401);
//       throw new Error("Not authorized, please login");
//     }

//     // Verify Token
//     const secretValue = await callAccessSecretVersion();

//     const verified = jwt.verify(token, secretValue);
//     // Get user id from token
//     const user = await User.findById(verified.id).select("-password");

//     if (!user) {
//       res.status(401);
//       throw new Error("User not found");
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401);
//     throw new Error("Not authorized, please login");
//   }
// });

// module.exports = protect;

//ENV
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // Verify Token
    const verified = jwt.verify(token, process.env._JWT_SECRET);
    // Get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

module.exports = protect;