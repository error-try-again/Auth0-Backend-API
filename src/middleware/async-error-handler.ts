import { NextFunction, Request, Response } from 'express';
import { AxiosError } from 'axios';

// Handles errors from Axios requests
function handleAxiosError(error: AxiosError, response: Response) {
  const status = error.response?.status || 500;
  const message =
    error.response?.data || 'An unexpected external API error occurred';
  console.error(`Axios error - Status: ${status}, Message: ${message}`, {
    endpoint: response.req?.originalUrl,
    method: response.req?.method
  });

  response.status(status).json({ error: message });
}

// Handles generic application errors
function handleApplicationError(error: Error, response: Response) {
  console.error(`Application error - Message: ${error.message}`, {
    endpoint: response.req?.originalUrl,
    method: response.req?.method
  });

  if (error.message.startsWith('Missing Content')) {
    response.status(423).json({ error: error.message });
  } else {
    response.status(400).json({ error: error.message });
  }
}

// Handles cases where the error format is not recognized (e.g., thrown primitives)
function handleUnknownError(error: unknown, response: Response) {
  console.error('Unhandled error', {
    error,
    endpoint: response.req?.originalUrl,
    method: response.req?.method
  });
  response.status(500).json({ error: 'An unexpected error occurred' });
}

// Unified error handler middleware
export const asyncErrorHandler = (
  handler: (
    request: Request,
    response: Response,
    next: NextFunction
  ) => Promise<void>
) => {
  // Allow inconsistent return points due to branching logic
  // noinspection FunctionWithInconsistentReturnsJS
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (response && response.headersSent) {
        return next(error);
      }

      if (error instanceof AxiosError) {
        handleAxiosError(error, response);
      } else if (error instanceof Error) {
        handleApplicationError(error, response);
      } else {
        handleUnknownError(error, response);
      }
    }
  };
};