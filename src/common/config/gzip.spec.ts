import Pako from "pako";

it('', () => {
  const text = 'hellohellohellohello';
  
  // set config
  const compressed = Pako.deflate(text);
  console.log(compressed);
    
  // const compressedString = new TextDecoder('utf-8').decode(compressed);
  const compressedString = Buffer.from(compressed).toString('base64');
  console.log(compressedString);

  // get conffig
  const buf = Buffer.from(compressedString, 'base64');
  const compresstUInt8Array = Uint8Array.from(buf);
  const uncompressed = Pako.inflate(compresstUInt8Array, { to: 'string' });

  console.log(buf.byteLength, Buffer.byteLength(compressedString, 'utf-8'));
  console.log(uncompressed);
});
