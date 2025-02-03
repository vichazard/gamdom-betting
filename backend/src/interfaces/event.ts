export interface SportEvent {
  event_id: number;
  event_name: string;
  odds: number[];
}

export interface CreateEventDTO {
  event_name: string;
  odds: number[];
}

export interface UpdateEventDTO {
  event_name?: string;
  odds?: number[];
}
