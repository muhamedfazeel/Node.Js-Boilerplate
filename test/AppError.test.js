const { AppError } = require("../src/utils/errorHandler");

describe('AppError', () => {
  test('should create an instance of AppError', () => {
    const error = new AppError('Custom Error', 400);

    expect(error instanceof AppError).toBe(true);
    expect(error.message).toBe('Custom Error');
    expect(error.statusCode).toBe(400);
    expect(error.status).toBe('error');
    expect(error.stack).toBeDefined();
  });
});