const express = require("express");
const { errorHandler } = require("./middleWares/error");
require('express-async-errors')
morgan = require("morgan");
const cors = require('cors')
require("dotenv").config();
require('./db');
const userRouter = require("./routes/user");
const { handleNotFound } = require("./utils/helper");

const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);

app.use('/*', handleNotFound)

app.use(errorHandler);

// app.post("/sign-in",(req,res,next)=>{
//   const {email,password} = req.body;
//   if(!email || !password)
//     return res.json({error:"email/password missing!"});
//     next();
//   },
//   (req,res)=>{
//     res.send("<h1>Hello I am from your backend about</h1>");
//     console.log("<h1>Hello I am from your backend about</h1>");
//   }
// );



app.listen(8000, () => {
  console.log("The port is listening on port 8000");
});
