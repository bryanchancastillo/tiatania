
import { MessageType } from '../enums/MessageType'

export interface notificationMessage {
    type: string;
    messageType: MessageType;
    message: string;
    title: string;
}