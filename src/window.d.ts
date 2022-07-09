export {};

declare global {
  interface Window {
    wrappedJSObject: {
      AWSC: {
        Auth: {
          getMbtc: () => number
        }
      }
    }
  }
};