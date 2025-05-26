// helper to cast mocks correctly
export const mock = <ReturnValue, Arguments extends unknown[]>(
  fn: (...args: Arguments) => ReturnValue,
): jest.Mock<ReturnValue, Arguments> => fn as jest.Mock<ReturnValue, Arguments>;
