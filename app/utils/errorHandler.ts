import { toast } from 'react-hot-toast';

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: any;
}

export class AppError extends Error {
  code: string;
  details?: any;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', details?: any) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown, fallbackMessage: string = 'An unexpected error occurred'): ErrorResponse => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    toast.error(error.message);
    return {
      message: error.message,
      code: error.code,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    const message = error.message || fallbackMessage;
    toast.error(message);
    return {
      message,
      code: 'UNKNOWN_ERROR',
    };
  }

  toast.error(fallbackMessage);
  return {
    message: fallbackMessage,
    code: 'UNKNOWN_ERROR',
  };
};

export const isAuthError = (error: unknown): boolean => {
  if (error instanceof AppError) {
    return error.code === 'AUTH_ERROR';
  }
  return false;
};

export const throwAuthError = (message: string = 'Authentication required') => {
  throw new AppError(message, 'AUTH_ERROR');
};

export const throwValidationError = (message: string, details?: any) => {
  throw new AppError(message, 'VALIDATION_ERROR', details);
};

export const throwNotFoundError = (message: string = 'Resource not found') => {
  throw new AppError(message, 'NOT_FOUND');
}; 