export interface ChatMessage {
    message: string;
    user: string;
    senderId?: string;
    file?: File; // Property to store the selected file
    fileContent?: ArrayBuffer | string | null; // For storing file content (ArrayBuffer or base64 string)
    fileType?: string;
    imageUrl?: string; // URL for the image file stored on the server
}