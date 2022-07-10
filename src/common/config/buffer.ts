const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8');

export const encode = (str: string) => {
  return encoder.encode(str);
};

export const decode = (arr: Uint8Array) => {
  return decoder.decode(arr);
};
