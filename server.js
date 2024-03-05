const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const secretmanagerClient = new SecretManagerServiceClient();

const callAccessSecretVersion = async () => {
  // Construct request
  const request = {
    name: 'projects/829904945155/secrets/MONGO_URI/versions/latest',
  };

  // Run request
  const [response] = await secretmanagerClient.accessSecretVersion(request);
  const secretValue = response.payload.data.toString();
  return secretValue;
}

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.MONGO_URI)
  // .then(() => {
  //   app.listen(PORT, () => {
  //     console.log(`Server Running on port ${PORT}`);
  //   });
  // })
  // .catch((err) => console.log(err));

const connectToDatabase = async () => {
  try {
    const secretValue = await callAccessSecretVersion();
    mongoose.connect(secretValue).then(() => {
      app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
      });
    })
    .catch((err) => console.log(err));
    // console.log('Database Connected and Server Running on port ${PORT}');
  } catch (error) {
    console.log(error.message);
  }
}

connectToDatabase();