const { error404 } = require('../src/middlewares/404');
const { AppError } = require('../src/utils/errorHandler');

describe('404 Error Handler', () => {
  test('should call next with a 404 error', () => {
    const nextMock = jest.fn();
    error404({}, {}, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith(expect.any(AppError));
    expect(nextMock.mock.calls[0][0].statusCode).toBe(404);
    expect(nextMock.mock.calls[0][0].message).toBe('Not Found');
  });
});