import { parseConfig, parseConfigError } from "./parse"

it('should parse file', () => {
  const file = `
[foo]
bar = 1`
  const config = parseConfig(file)
  expect(config).toMatchInlineSnapshot(`
Object {
  "foo": Object {
    "bar": 1,
  },
}
`)
})

it('should parse file with comments', () => {
  const file = `
[foo]
bar = 1
# dummy`
  const config = parseConfig(file)
  expect(config).toMatchInlineSnapshot(`
Object {
  "foo": Object {
    "bar": 1,
  },
}
`)
})

it('should parse with newline between values', () => {
  const file = `
[foo]
bar = 1

baz = 2`
  const config = parseConfig(file)
  expect(config).toMatchInlineSnapshot(`
Object {
  "foo": Object {
    "bar": 1,
    "baz": 2,
  },
}
`)
})

it('should parse file with invalid syntax (no error symbol in object)', () => {
  const file = `
helloooo
[foo]
bar = 1`
  const config = parseConfig(file)
  expect(config).toMatchInlineSnapshot(`
Object {
  "foo": Object {
    "bar": 1,
  },
}
`)
})

it('should get parse error', () => {
  const file = `
helloooo
[foo]
bar = 1`
  const errors = parseConfigError(file)
  expect(errors).toMatchInlineSnapshot(`
Array [
  [Error: Unsupported type of line: [2]"helloooo"],
]
`)
})
