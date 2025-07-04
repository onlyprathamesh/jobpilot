require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/db");
const jobRouter = require("./routers/jobRouters");
const userRouter = require("./routers/userRouters");
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use("/api", jobRouter);
app.use("/user", userRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`);
  });
});
