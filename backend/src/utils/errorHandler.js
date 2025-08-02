// utils/errorHandler.js

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    // set to default if no message is sent
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    // set to default if no message is sent
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict occurred") {
    // set to default if no message is sent
    super(message, 409);
  }
}

export const errorHandler = (err, req, res, next) => {
  // Default fallback values
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log detailed errors only in development
  if (process.env.NODE_ENV !== "production") {
    console.error("🔥 Error Handler:", err);
  }

  // AppError: use the provided status and message
  if (err instanceof AppError) {
    return res.status(statusCode).json({
      success: false,
      errorType: err.constructor.name,
      message: message,
    });
  }

  // Unknown error: hide stack trace in production
  return res.status(statusCode).json({
    success: false,
    errorType: err.name || "Error",
    message,
  });
};
