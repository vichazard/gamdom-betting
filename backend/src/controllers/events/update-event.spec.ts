import { Request, Response } from "express";
import { updateEventHandler } from "./update-event";
import { eventService } from "../../services";

jest.mock("../../services");

type Params = {
  id: string;
};
describe("updateEventHandler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {
      params: { id: "1" },
      body: { event_name: "Updated Event", odds: 2.5 },
    };
    res = {
      status: statusMock,
    };
  });

  it("should return 404 if event is not found", async () => {
    (eventService.getEventById as jest.Mock).mockResolvedValue(null);

    await updateEventHandler(req as Request<Params>, res as Response);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith("Event not found");
  });

  it("should update the event and return 200 with the updated event", async () => {
    const event = { id: 1, event_name: "Original Event", odds: 1.5 };
    const updatedEvent = { id: 1, event_name: "Updated Event", odds: 2.5 };

    (eventService.getEventById as jest.Mock).mockResolvedValue(event);
    (eventService.updateEvent as jest.Mock).mockResolvedValue(updatedEvent);

    await updateEventHandler(req as Request<Params>, res as Response);

    expect(eventService.getEventById).toHaveBeenCalledWith(1);
    expect(eventService.updateEvent).toHaveBeenCalledWith(1, {
      ...event,
      ...req.body,
    });
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(updatedEvent);
  });
});
