require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/db");
const jobRouter = require("./routers/jobRouters");
const userRouter = require("./routers/userRouters");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/api", jobRouter);
app.use("/user", userRouter);
app.use((req, res, next) => {
  const error = new Error(`${req.originalUrl} - Not Found`);
  error.status = 404;
  next(error);
})
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
