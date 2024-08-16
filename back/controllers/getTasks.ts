import { Request, Response } from "express";
import { pool } from "../database/database";

export const getTasks = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // params : /address/userId  방식
  // http://localhost:8080/get_tasks/foxbaboo@gmail.com

  // const userId = req.query.userId as string; // 쿼리 문자열로 userId를 가져옴
  // http://localhost:8080/get_tasks?userId=foxbaboo@gmail.com

  try {
    const result = await pool.query(
      "SELECT * FROM task WHERE userId = $1 ORDER BY updated_at DESC",
      [userId]
    ); // $1 : 첫번째 파라미터의 값, $2 : 두번째 파라미터의 값
    // "SELECT * FROM task WHERE userId = $1 AND status = $2 AND createdAt = $3",
    // [userId, status, createdAt]
    // "SELECT * FROM task WHERE userId = $1 OR createdBy = $1 OR assignedTo = $1",
    // [userId]
    return res.status(200).json(result.rows);
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    return res.status(500).json({ error: "An unknown error occurred" });
  }
};
