import { query, Request, Response } from "express";
import { pool } from "../database/database";
import { v4 as uuidv4 } from "uuid";

export const postTask = async (req: Request, res: Response) => {
  const _id = uuidv4();
  console.log("_id", _id);
  console.log("body", req.body);
  const { title, description, date, isCompleted, isImportant, userId } =
    req.body;
  console.log(title, description, date, isCompleted, isImportant, userId);
  try {
    await pool.query(
      "INSERT INTO task ( _id, title, description, date, isCompleted, isImportant, userId) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [_id, title, description, date, isCompleted, isImportant, userId]
    );
    return res.status(201).json({ message: "Task Created Successfully" });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    return res.status(500).json({ error: "An unknown error occurred" });
  }
};

export const postTaskFromState = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { isCompleted, isImportant } = req.body;
  console.log(isCompleted, isImportant, userId);
  const queryText = isCompleted
    ? `isCompleted=${isCompleted}`
    : isImportant
    ? `isImportant=${isImportant}`
    : `isCompleted=false`;
  console.log("query:", queryText);
  try {
    // const result = await pool.query(
    //   "SELECT * FROM task WHERE userId = $1 AND $2 ORDER BY updated_at DESC",
    //   [userId, qauryText]
    // );
    const result = await pool.query(
      `SELECT * FROM task WHERE userId = $1 AND ${queryText} ORDER BY created_at DESC`,
      [userId]
    );
    return res.status(200).json(result.rows);
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    return res.status(500).json({ error: "An unknown error occurred" });
  }
};
