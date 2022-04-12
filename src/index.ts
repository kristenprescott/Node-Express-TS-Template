import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const mongoDbURI = process.env.MONGODB_URI;

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
// const allowedOrigins = ["http://localhost:3000", "*"];
// const options: cors.CorsOptions = {
//   origin: "*",
// };
const corsOptions = {
  // TODO: whitelist here:
  // origin: "https://safe-site.netlify.app/*"
  origin: "*",
  optionsSuccessStatus: 200 /* For legacy browser support */,
};

app.use(cors(corsOptions));

app.use(express.json);

app.use((req, res, next) => {
  console.log("req.body: ", req.body);
  console.log({ res });
  next();
});

app.use((req, res, next) => {
  console.log({ req });
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("https://*", (req, res) => {
  console.log({ req });
  res.send();
});

const start = async () => {
  if (!mongoDbURI) {
    throw new Error("auth MONGODB_URI has not been defined");
  }
  try {
    await mongoose.connect(mongoDbURI, {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
  } catch (err) {
    console.error(err);
    // throw new DbConnectionError();
  }

  app.listen(port, () => {
    console.log("╭────────────────────────────────────╮");
    console.log("│               *ʕ•ᴥ•ʔ*              │");
    console.log("│------------------------------------│");
    console.log("│           ╭------------╮           │");
    console.log("│           |    PORT    |           │");
    console.log("│           |------------|           │");
    console.log(`│           |    ${port}    |           │`);
    console.log("│           ╰------------╯           │");
    console.log("╰────────────────────────────────────╯");
  });
};

start();
