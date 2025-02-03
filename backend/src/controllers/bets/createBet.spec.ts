import { Request, Response } from "express";
import { createBetHandler } from "./createBet";
import { betService, eventService } from "../../services";
import { BetResult } from "enums/bet";
import { getOddFromEvent } from "utils/event";

jest.mock("../../services");
jest.mock("utils/event");

describe("createBetHandler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    req = {
      body: {
        eventId: 1,
        result: BetResult.WIN,
        value: 100,
      },
      user: {
        user_id: 123,
      },
    };

    res = {
      status: statusMock,
    };
  });

  it("should create a bet and return 201 status", async () => {
    const event = { id: 1, homeOdd: 2.5 };
    const betResult = {
      id: 1,
      eventId: 1,
      odd: 2.5,
      result: BetResult.WIN,
      value: 100,
      userId: 123,
    };

    (eventService.getEventById as jest.Mock).mockResolvedValue(event);
    (getOddFromEvent as jest.Mock).mockReturnValue(2.5);
    (betService.createBet as jest.Mock).mockResolvedValue(betResult);

    await createBetHandler(req as Request, res as Response);

    expect(eventService.getEventById).toHaveBeenCalledWith(1);
    expect(getOddFromEvent).toHaveBeenCalledWith(event, BetResult.WIN);
    expect(betService.createBet).toHaveBeenCalledWith({
      userId: 123,
      eventId: 1,
      odd: 2.5,
      result: BetResult.WIN,
      value: 100,
    });
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(betResult);
  });

  it("should handle errors", async () => {
    const error = new Error("Something went wrong");
    (eventService.getEventById as jest.Mock).mockRejectedValue(error);

    await expect(
      createBetHandler(req as Request, res as Response)
    ).rejects.toThrow(error);
  });
});
