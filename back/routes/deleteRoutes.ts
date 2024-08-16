import { deleteTask } from "../controllers/deleteTask";
import express from "express";

const router = express.Router();
export const deleteTaskRoute = router.delete(
  "/delete_task/:taskId",
  deleteTask
);
