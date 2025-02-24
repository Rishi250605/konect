import { Router } from "express";

import { authRouter } from "./login.js";
import { postRouter }from "./post.js";
// import { tagsRouter } from "./tags.js";
import { communityRouter } from "./community.js";
export const rootRouter = Router();
rootRouter.use("/user/signup", authRouter);
rootRouter.use("/post", postRouter);
rootRouter.use("/community", communityRouter);
// rootRouter.use("/tags", tagsRouter);
console.log("hello 2")
