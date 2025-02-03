import { Request, Response } from "express";
import { createEventHandler } from "./create-event";
import { eventService } from "../../services";

jest.mock("../../services");

describe("createEventHandler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        event_name: "Test Event",
        odds: "1.5",
      },
    };
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it("should create an event and return 201 status", async () => {
    const mockEvent = { id: 1, event_name: "Test Event", odds: "1.5" };
    (eventService.createEvent as jest.Mock).mockResolvedValue(mockEvent);

    await createEventHandler(req as Request, res as Response);

    expect(eventService.createEvent).toHaveBeenCalledWith({
      event_name: "Test Event",
      odds: "1.5",
    });
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(mockEvent);
  });

  it("should handle errors", async () => {
    const error = new Error("Something went wrong");
    (eventService.createEvent as jest.Mock).mockRejectedValue(error);

    await expect(
      createEventHandler(req as Request, res as Response)
    ).rejects.toThrow(error);
  });
});
