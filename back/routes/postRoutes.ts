import { postTask, postTaskFromState } from "../controllers/postTasks";
import express, { Router } from "express";

const router: Router = express.Router();
export const postTaskRoute = router.post("/post_task", postTask);
export const postTaskFromStateRoute = router.post(
  "/post_state_tasks/:userId",
  postTaskFromState
);
