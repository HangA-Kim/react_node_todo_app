// package.json 에서 main 으로 설정된 파일임.
import express, { Express, Request, Response } from "express";

import cors from "cors";
import { getTaskRoute } from "./routes/getRoutes";
import { postTaskFromStateRoute, postTaskRoute } from "./routes/postRoutes";
import { putTaskRoute } from "./routes/putRoutes";
import { deleteTaskRoute } from "./routes/deleteRoutes";

/**================================================================================ */
const PORT = 8080;
const app: Express = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
/**================================================================================ */

app.use(getTaskRoute);
app.use(postTaskRoute);
app.use(postTaskFromStateRoute);
app.use(putTaskRoute);
app.use(deleteTaskRoute);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World");
// });

// app.get("/test_db", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query("SELECT * FROM task");
//     return res.status(200).json(result.rows);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// });

/**================================================================================ */
app
  .listen(PORT, () => {
    console.log(`[server]: Server is running at <http://localhost>:${PORT}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
