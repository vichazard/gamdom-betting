import { initPool } from "db";

const databaseSetup = async (next: () => void) => {
  try {
    await initPool();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default databaseSetup;
