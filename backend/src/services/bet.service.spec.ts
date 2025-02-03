import { createBet } from "./bet.service";
import { getPoolInstance } from "db";
import { BetResult } from "enums/bet";
import { CreateBetProps } from "interfaces";

jest.mock("db");

describe("createBet", () => {
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

  it("should insert a bet and return the created bet", async () => {
    const mockData: CreateBetProps = {
      userId: 1,
      eventId: 2,
      odd: 1.5,
      result: BetResult.WIN,
      value: 100,
    };

    const mockResult = {
      rows: [
        {
          id: 1,
          user_id: 1,
          event_id: 2,
          odd: 1.5,
          result: BetResult.WIN,
          value: 100,
        },
      ],
    };

    mockClient.query.mockResolvedValueOnce(mockResult);

    const result = await createBet(mockData);

    expect(mockClient.query).toHaveBeenCalledWith(
      "INSERT INTO bets (user_id, event_id, odd, result, value) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        mockData.userId,
        mockData.eventId,
        mockData.odd,
        mockData.result,
        mockData.value,
      ]
    );
    expect(mockClient.release).toHaveBeenCalled();
    expect(result).toEqual(mockResult.rows[0]);
  });

  it("should throw an error if the query fails", async () => {
    const mockData: CreateBetProps = {
      userId: 1,
      eventId: 2,
      odd: 1.5,
      result: BetResult.WIN,
      value: 100,
    };

    const error = new Error("Query failed");
    mockClient.query.mockRejectedValueOnce(error);

    await expect(createBet(mockData)).rejects.toThrow(error);
    expect(mockClient.release).toHaveBeenCalled();
  });
});
