import {
  compressConfig,
  decompressConfig,
} from './gzip';

it('should compress/decompress config', () => {
  const config = `
[foo]
bar = 123456789101
baz = Hello World

[bar]
bar = 123456789101
baz = Hello World

[baz]
bar = 123456789101
baz = Hello World`;

  // compress
  const compressed = compressConfig(config);
  expect(compressed).toEqual(expect.any(String));
  expect(compressed)
    .toMatchInlineSnapshot(
      `"eJzjik7Lz4/lSkosUrBVMDQyNjE1M7ewNDQwBApVAYU8UnNy8hXC84tyUri4ooHKSFBbRZxaACjLJDI="`
    );

  // decompress
  const decompressed = decompressConfig(compressed);
  expect(decompressed).toEqual(expect.any(String));
  expect(decompressed).toEqual(config);
});
