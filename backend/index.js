import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from './routers/tours.js';
import userRoute from './routers/users.js';
import authRoute from './routers/auth.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,
      // {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // }
    );

    console.log("MongoDB database connected.");
  } catch (err) {
    console.log("MongoDB database connected failed.");
  }
};

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/auth', authRoute);
app.use('/tours', tourRoute);
app.use('/users', userRoute);
// app.get('/', (req, res, next)=>{
//   res.send('<h1>Hello World</h1>');
// })

app.listen(port, () => {
  connect();
  console.log("Sever listening on port ", port);
});



