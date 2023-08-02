interface IAppError {
  message: string;
  statusCode: number;
}

class AppError extends Error implements IAppError {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default AppError;
