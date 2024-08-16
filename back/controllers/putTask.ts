import { Request, Response } from "express";
import { pool } from "../database/database";

export const putTask = async (req: Request, res: Response) => {
  // const { title, description, date, isCompleted, isImportant } = req.body;
  // console.log(title, description, date, isCompleted, isImportant);
  const keys = Object.keys(req.body);
  console.log(keys);

  try {
    const values = Object.values(req.body);
    console.log(values);
    const taskID = req.query.taskID;
    await pool.query(
      `UPDATE task
      SET ${keys.map((key, idx) => {
        console.log(idx + 2);
        return `${key}=$${idx + 2}`;
      })} WHERE _id=$1`,
      [taskID, ...values]
    );

    return res.status(201).json({ message: "Task Created Successfully" });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    return res.status(500).json({ error: "An unknown error occurred" });
  }
};
