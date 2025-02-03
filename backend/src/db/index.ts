import dbConfig from "config/database";
import { Pool } from "pg";

let poolInstance: Pool | null = null;

const createPool = (): Pool => {
  return new Pool(dbConfig);
};

export const initPool = async () => {
  poolInstance = createPool();
  await poolInstance.connect();
};

export const getPoolInstance = async (): Promise<Pool> => {
  if (!poolInstance) {
    await initPool();
  }
  return poolInstance;
};
