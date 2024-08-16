import { putTask } from "../controllers/putTask";
import express from "express";

const router = express.Router();
export const putTaskRoute = router.put("/put_task", putTask);
