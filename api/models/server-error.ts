export class ServerError extends Error {
    code: number;
    message: string;
    stack?: string;

    constructor(message: string) {
        super(message);
    }
    
}