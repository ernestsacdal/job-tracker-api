class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ValidationError extends CustomError {
  constructor(message = "Validation failed") {
    super(message, 400);
  }
}

export class AuthError extends CustomError {
  constructor(message = "Invalid Credentials") {
    super(message, 401);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ServerError extends CustomError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}
