import { getPoolInstance } from "db";

export const register = async (email: string, password: string) => {
  const pool = await getPoolInstance();
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, password]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

export const getUserByEmail = async (email: string) => {
  const pool = await getPoolInstance();
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
