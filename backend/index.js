import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://192.168.155.172:3000",
      "http://192.168.43.39:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeader: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  return res
    .status(234)
    .send(
      "Welcome to MERN Book store (Developer -> Abdullah)<br><a href='https://linkedin.com/in/abdullahsalahuddin/'>My Linkedin</a><br><a href='https://github.com/AbdullahSheikh7/'>My GitHub</a>"
    );
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to the database");

    app.listen(PORT, () => {
      console.log(`App is listening to PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
