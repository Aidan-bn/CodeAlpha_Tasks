import express from "express";
import { allPosts } from "../controller/postController.js";

const postRouter = express.Router();

postRouter.get("/posts", allPosts);

export default postRouter;
