import { ApiRequestInstance } from 'utils/apiRequest';

const baseURL = process.env.VITE_SERVER_URL || 'http://localhost:8000';

export const basicService = new ApiRequestInstance(`${baseURL}`);
