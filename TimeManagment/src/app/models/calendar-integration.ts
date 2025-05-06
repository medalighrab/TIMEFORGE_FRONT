export interface CalendarIntegration {
    id?: number;
    eventTitle: string;
    eventDate: string;        // Format: 'YYYY-MM-DD'
    startTime: string;        // Format: 'HH:mm:ss'
    endTime: string;          // Format: 'HH:mm:ss'
    location: string;
    description: string;
  }
  