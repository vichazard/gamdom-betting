import { Request, Response } from "express";
import { getAllEventsHandler } from "./get-all-events";
import { eventService } from "../../services";

jest.mock("../../services");

describe("getAllEventsHandler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
    };
  });

  it("should return 200 and the list of events", async () => {
    const mockEvents = [
      { id: 1, name: "Event 1" },
      { id: 2, name: "Event 2" },
    ];
    (eventService.getEvents as jest.Mock).mockResolvedValue(mockEvents);

    await getAllEventsHandler(req as Request, res as Response);

    expect(eventService.getEvents).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockEvents);
  });

  it("should handle errors", async () => {
    const error = new Error("Something went wrong");
    (eventService.getEvents as jest.Mock).mockRejectedValue(error);

    await expect(
      getAllEventsHandler(req as Request, res as Response)
    ).rejects.toThrow(error);
  });
});
