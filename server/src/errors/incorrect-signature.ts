import { CustomError } from 'errors/custom-error';

export class IncorrectSignatureError extends CustomError {
    statusCode = 411;
    reason = 'Incorrect signature';
    
    constructor() {
        super('Incorrect signature');
        Object.setPrototypeOf(this, IncorrectSignatureError.prototype);
    }
    
    serializeErrors(): { message: string; field?: string | undefined }[] {
        return [{ message: this.reason }];
    }
}
