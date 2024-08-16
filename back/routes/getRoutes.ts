import { getTasks } from "../controllers/getTasks";
import express from "express";

const router = express.Router();
export const getTaskRoute = router.get("/get_tasks/:userId", getTasks);
