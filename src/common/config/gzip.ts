import Pako from 'pako';

export const compressConfig = (configFile: string): string => {
  const compressed = Pako.deflate(configFile);
  return Buffer.from(compressed).toString('base64');
};

export const decompressConfig = (configFileCompressed: string) => {
  const buf = Buffer.from(configFileCompressed, 'base64');
  const compresstUInt8Array = Uint8Array.from(buf);
  const uncompressed = Pako.inflate(compresstUInt8Array, { to: 'string' });
  return uncompressed;
};
