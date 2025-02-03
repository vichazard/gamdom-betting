import { register, getUserByEmail } from "./auth.service";
import { getPoolInstance } from "db";

jest.mock("db");

describe("Auth Service", () => {
  let mockClient: any;
  let mockPool: any;

  beforeEach(() => {
    mockClient = {
      query: jest.fn(),
      release: jest.fn(),
    };
    mockPool = {
      connect: jest.fn().mockResolvedValue(mockClient),
    };
    (getPoolInstance as jest.Mock).mockResolvedValue(mockPool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should insert a new user and return the user", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "password",
      };
      mockClient.query.mockResolvedValueOnce({ rows: [mockUser] });

      const result = await register("test@example.com", "password");

      expect(mockClient.query).toHaveBeenCalledWith(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        ["test@example.com", "password"]
      );
      expect(mockClient.release).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it("should throw error if query fails", async () => {
      const error = new Error("Database error");
      mockClient.query.mockRejectedValueOnce(error);

      await expect(register("test@example.com", "password")).rejects.toThrow(
        error
      );
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe("getUserByEmail", () => {
    it("should return a user by email", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "password",
      };
      mockClient.query.mockResolvedValueOnce({ rows: [mockUser] });

      const result = await getUserByEmail("test@example.com");

      expect(mockClient.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1",
        ["test@example.com"]
      );
      expect(mockClient.release).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it("should return undefined if no user is found", async () => {
      mockClient.query.mockResolvedValueOnce({ rows: [] });

      const result = await getUserByEmail("nonexistent@example.com");

      expect(mockClient.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1",
        ["nonexistent@example.com"]
      );
      expect(mockClient.release).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it("should throw error if query fails", async () => {
      const error = new Error("Database error");
      mockClient.query.mockRejectedValueOnce(error);

      await expect(getUserByEmail("test@example.com")).rejects.toThrow(error);
      expect(mockClient.release).toHaveBeenCalled();
    });
  });
});
