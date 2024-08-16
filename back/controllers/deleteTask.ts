import { Request, Response } from "express";
import { pool } from "../database/database";

export const deleteTask = async (req: Request, res: Response) => {
  console.log("deleteTask call");
  const _id = req.params.taskId;
  console.log("deleteTask : ", _id);
  try {
    await pool.query("DELETE FROM task WHERE _id= $1", [_id]);
    return res.status(201).json({ message: "Task Created Successfully" });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    return res.status(500).json({ error: "An unknown error occurred" });
  }
};
