
import { Lexer } from './parser';

const TEST_INPUT = `

[profile fooo]
=
`;

it('', () => {
  const lexer = new Lexer(TEST_INPUT);

  console.log([
    lexer.lex(),
    lexer.lex(),
    lexer.lex(),
    lexer.lex(),
    lexer.lex(),
    lexer.lex(),
    lexer.lex(),
    lexer.lex(),
    lexer.lex(),
    lexer.lex(),
  ].map(({ value, kind, row }) => ({ value, kind, row })));
});
