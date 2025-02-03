import { Request, Response } from "express";
import { getEventByIdHandler } from "./get-event";
import { eventService } from "../../services";

jest.mock("../../services");
type Params = {
  id: string;
};
describe("getEventByIdHandler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {
      params: { id: "1" },
    };
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it("should return event data when event is found", async () => {
    const mockEvent = { id: 1, name: "Test Event" };
    (eventService.getEventById as jest.Mock).mockResolvedValue(mockEvent);

    await getEventByIdHandler(req as Request<Params>, res as Response);

    expect(eventService.getEventById).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(mockEvent);
  });

  it("should return 404 when event is not found", async () => {
    (eventService.getEventById as jest.Mock).mockResolvedValue(null);

    await getEventByIdHandler(req as Request<Params>, res as Response);

    expect(eventService.getEventById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Event not found");
  });
});
