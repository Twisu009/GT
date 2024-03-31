class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class AuthenticationError extends CustomError {
  constructor(message = "Authentication failed") {
    super(message, 401);
  }
}

class PermissionError extends CustomError {
  constructor(message = "Permission denied") {
    super(message, 403);
  }
}

class NotFoundError extends CustomError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class InternalServerError extends CustomError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}

export {
  CustomError,
  InternalServerError,
  NotFoundError,
  PermissionError,
  AuthenticationError,
};
