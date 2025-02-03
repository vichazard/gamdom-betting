import { getPoolInstance } from "db";
import { CreateBetProps } from "interfaces";

export const createBet = async (data: CreateBetProps) => {
  const pool = await getPoolInstance();
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO bets (user_id, event_id, odd, result, value) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [data.userId, data.eventId, data.odd, data.result, data.value]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
