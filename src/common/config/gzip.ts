import Pako from 'pako';

import { Buffer } from 'buffer';

export const compressConfig = (configFile: string): string => {
  const compressed = Pako.deflate(configFile, { level: 9 });
  // TODO: get rid of Buffer with btoa
  // https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
  return Buffer.from(compressed).toString('base64');
};

export const decompressConfig = (configFileCompressed: string) => {
  const buf = Buffer.from(configFileCompressed, 'base64');
  const compresstUInt8Array = Uint8Array.from(buf);
  return Pako.inflate(compresstUInt8Array, { to: 'string' });
};
