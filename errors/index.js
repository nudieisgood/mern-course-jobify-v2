import { StatusCodes } from "http-status-codes";

class BadRequestError extends Error {
  constructor(messag) {
    super(messag);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export { BadRequestError, NotFoundError, UnauthenticatedError };
