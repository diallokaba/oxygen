export interface INotification {
    _id?: string;
    senderId?: string;
    receiverId?: string;
    message?: string;
    read?: boolean;
    date?: Date;
}

export class Notification implements INotification {
    constructor(
        public _id?: string,
        public senderId?: string,
        public receiverId?: string,
        public message?: string,
        public read?: boolean,
        public createdAt?: Date,
    ) {}
}