import express from "express"
import userRouter from './routes/userRoutes.js';
import postRouter from "./routes/postRoutes.js";
import followerRoute from "./routes/followerRoutes.js"

const app = express();

app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', followerRoute);

app.listen('8080', () => {
  console.log('app i running on port 8080');
})
