import { CreateEventDTO, UpdateEventDTO } from "interfaces/event";
import { getPoolInstance } from "db";

export const getEvents = async () => {
  const pool = await getPoolInstance();
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM sports_events ORDER BY event_id"
    );
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

export const getEventById = async (id: number) => {
  const pool = await getPoolInstance();
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM sports_events WHERE event_id = $1",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

export const createEvent = async ({ event_name, odds }: CreateEventDTO) => {
  const pool = await getPoolInstance();
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO sports_events (event_name, odds) VALUES ($1, $2) RETURNING *",
      [event_name, odds]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

export const updateEvent = async (
  id: number,
  { event_name, odds }: UpdateEventDTO
) => {
  const pool = await getPoolInstance();
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE sports_events SET event_name = $1, odds = $2 WHERE event_id = $3 RETURNING *",
      [event_name, odds, id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

export const deleteEvent = async (id: number) => {
  const pool = await getPoolInstance();
  const client = await pool.connect();
  try {
    const result = await client.query(
      "DELETE FROM sports_events WHERE event_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
