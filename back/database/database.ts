import { Pool } from "pg";
require("dotenv").config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: 5432,
  database: process.env.DB_NAME,
});
