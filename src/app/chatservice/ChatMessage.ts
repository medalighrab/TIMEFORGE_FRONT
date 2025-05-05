export interface ChatMessage {
  message: string;
  user: string;
  senderId?: string;
  file?: File;
  fileContent?: ArrayBuffer | string | null;
  fileType?: string;
  imageUrl?: string;
  timestamp?: Date;
}