import { Request, Response } from "express";
import { deleteEventHandler } from "./delete-event";
import { eventService } from "../../services";

jest.mock("../../services");
type Params = {
  id: string;
};
describe("deleteEventHandler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: {
        id: "1",
      },
    };
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it("should return 404 if event is not found", async () => {
    (eventService.getEventById as jest.Mock).mockResolvedValue(null);

    await deleteEventHandler(
      req as Request<Params, unknown, unknown, unknown>,
      res as Response
    );

    expect(eventService.getEventById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith("Event not found");
  });

  it("should delete the event and return the result", async () => {
    const mockEvent = { id: 1, name: "Test Event" };
    const mockDeleteResult = { success: true };
    (eventService.getEventById as jest.Mock).mockResolvedValue(mockEvent);
    (eventService.deleteEvent as jest.Mock).mockResolvedValue(mockDeleteResult);

    await deleteEventHandler(
      req as Request<Params, unknown, unknown, unknown>,
      res as Response
    );

    expect(eventService.getEventById).toHaveBeenCalledWith(1);
    expect(eventService.deleteEvent).toHaveBeenCalledWith(1);
    expect(jsonMock).toHaveBeenCalledWith(mockDeleteResult);
  });
});
