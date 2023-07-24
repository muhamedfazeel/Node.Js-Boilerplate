const { errorHandler } = require('../src/middlewares/errorHandler');
const { AppError } = require('../src/utils/errorHandler');
const { HTTP_INTERNAL_SERVER_ERROR } = require('../src/utils/httpStatusCodes');

describe('errorHandler', () => {
  test('should handle AppError and return the corresponding response', () => {
    const appError = new AppError('Custom Error', 400);
    const jsonMock = jest.fn();
    const statusMock = jest.fn(() => ({ json: jsonMock }));
    const res = { status: statusMock };

    errorHandler(appError, {}, res, {});

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ status: 'error', message: 'Custom Error' });
  });

  test('should handle other errors and return a generic response', () => {
    const unknownError = new Error('Unknown Error');
    const jsonMock = jest.fn();
    const statusMock = jest.fn(() => ({ json: jsonMock }));
    const res = { status: statusMock };

    errorHandler(unknownError, {}, res, {});

    expect(statusMock).toHaveBeenCalledWith(HTTP_INTERNAL_SERVER_ERROR);
    expect(jsonMock).toHaveBeenCalledWith({
      status: 'error',
      message: 'Unknown Error',
    });
  });
});