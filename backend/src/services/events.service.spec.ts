import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "./events.service";
import { getPoolInstance } from "db";

jest.mock("db");

describe("Events Service", () => {
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

  describe("getEvents", () => {
    it("should return all events", async () => {
      const mockRows = [
        { event_id: 1, event_name: "Event 1", odds: [2.0, 3.1, 1.3] },
      ];
      mockClient.query.mockResolvedValueOnce({ rows: mockRows });

      const result = await getEvents();

      expect(result).toEqual(mockRows);
      expect(mockClient.query).toHaveBeenCalledWith(
        "SELECT * FROM sports_events ORDER BY event_id"
      );
      expect(mockClient.release).toHaveBeenCalled();
    });

    it("should throw error if query fails", async () => {
      const error = new Error("Database error");
      mockClient.query.mockRejectedValueOnce(error);

      await expect(getEvents()).rejects.toThrow(error);
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe("getEventById", () => {
    it("should return an event by id", async () => {
      const mockRow = {
        event_id: 1,
        event_name: "Event 1",
        odds: [2.0, 3.1, 1.3],
      };
      mockClient.query.mockResolvedValueOnce({ rows: [mockRow] });

      const result = await getEventById(1);

      expect(result).toEqual(mockRow);
      expect(mockClient.query).toHaveBeenCalledWith(
        "SELECT * FROM sports_events WHERE event_id = $1",
        [1]
      );
      expect(mockClient.release).toHaveBeenCalled();
    });

    it("should throw error if query fails", async () => {
      const error = new Error("Database error");
      mockClient.query.mockRejectedValueOnce(error);

      await expect(getEventById(1)).rejects.toThrow(error);
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe("createEvent", () => {
    it("should create a new event", async () => {
      const mockRow = {
        event_id: 1,
        event_name: "Event 1",
        odds: [2.0, 3.1, 1.3],
      };
      const newEvent = {
        event_name: "Event 1",
        odds: [2.0, 3.1, 1.3],
      };
      mockClient.query.mockResolvedValueOnce({ rows: [mockRow] });

      const result = await createEvent(newEvent);

      expect(result).toEqual(mockRow);
      expect(mockClient.query).toHaveBeenCalledWith(
        "INSERT INTO sports_events (event_name, odds) VALUES ($1, $2) RETURNING *",
        [newEvent.event_name, newEvent.odds]
      );
      expect(mockClient.release).toHaveBeenCalled();
    });

    it("should throw error if query fails", async () => {
      const error = new Error("Database error");
      mockClient.query.mockRejectedValueOnce(error);

      await expect(
        createEvent({ event_name: "Event 1", odds: [2.0, 3.1, 1.3] })
      ).rejects.toThrow(error);
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe("updateEvent", () => {
    it("should update an existing event", async () => {
      const mockRow = {
        event_id: 1,
        event_name: "Updated Event",
        odds: [2.0, 3.1, 1.3],
      };
      const updatedEvent = {
        event_name: "Updated Event",
        odds: [2.0, 3.1, 1.3],
      };
      mockClient.query.mockResolvedValueOnce({ rows: [mockRow] });

      const result = await updateEvent(1, updatedEvent);

      expect(result).toEqual(mockRow);
      expect(mockClient.query).toHaveBeenCalledWith(
        "UPDATE sports_events SET event_name = $1, odds = $2 WHERE event_id = $3 RETURNING *",
        [updatedEvent.event_name, updatedEvent.odds, 1]
      );
      expect(mockClient.release).toHaveBeenCalled();
    });

    it("should throw error if query fails", async () => {
      const error = new Error("Database error");
      mockClient.query.mockRejectedValueOnce(error);

      await expect(
        updateEvent(1, { event_name: "Updated Event", odds: [2.0, 3.1, 1.3] })
      ).rejects.toThrow(error);
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe("deleteEvent", () => {
    it("should delete an event by id", async () => {
      const mockRow = {
        event_id: 1,
        event_name: "Event 1",
        odds: [2.0, 3.1, 1.3],
      };
      mockClient.query.mockResolvedValueOnce({ rows: [mockRow] });

      const result = await deleteEvent(1);

      expect(result).toEqual(mockRow);
      expect(mockClient.query).toHaveBeenCalledWith(
        "DELETE FROM sports_events WHERE event_id = $1 RETURNING *",
        [1]
      );
      expect(mockClient.release).toHaveBeenCalled();
    });

    it("should throw error if query fails", async () => {
      const error = new Error("Database error");
      mockClient.query.mockRejectedValueOnce(error);

      await expect(deleteEvent(1)).rejects.toThrow(error);
      expect(mockClient.release).toHaveBeenCalled();
    });
  });
});
