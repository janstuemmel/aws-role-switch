const Tokens = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
  IDENT: 'IDENT',
  EQUAL: 'EQUAL',
  NEWLINE: 'NEWLINE',
  EOF: 'EOF',
  ILLEGAL: 'ILLEGAL',
} as const;

type Values<T> = T[keyof T];
type TokenKind = Values<typeof Tokens>;

type Token = {
  row: number
  from: number
  to: number
  kind: Values<typeof Tokens>
  value: string | null
}

export class Lexer {
  private pos = 0;
  private row = 0;
  constructor(private readonly file: string) {}

  buildToken(kind: TokenKind, value: string, pos: number): Token {
    return {
      kind,
      value,
      row: this.row,
      from: pos,
      to: pos,
    };
  }

  lexIdent(breakFor: string[] = []): Token {
    let key = '';
    let i = 0;
    for(;;) {
      const pos = i+this.pos;
      const char = this.file[pos];
      
      if ([...breakFor, undefined, '\n'].includes(char)) {
        break;
      }

      key = key + char;
      i++;
    }
    this.pos = i + this.pos;
    return this.buildToken(Tokens.IDENT, key.trim(), this.pos);
  }

  lex(): Token {
    const pos = this.pos;
    const char = this.file[this.pos];
    const lastChar = this.file[pos-1];
    const nextChar = this.file[pos+1];
    
    if (char === '\n') {
      this.pos++;
      this.row++;
      return this.buildToken(Tokens.NEWLINE, char, pos);
    }

    if (lastChar === '[') {
      return this.lexIdent([']']);
    }
    
    if (lastChar === '\n' && nextChar && char !== '[' && char !== '\n' && char !== '=') {
      return this.lexIdent(['=']);
    }

    if (lastChar === '=') {
      return this.lexIdent();
    }

    this.pos++;

    switch (char) {
      case undefined:
        return this.buildToken(Tokens.EOF, char, pos);
      case '[':
        return this.buildToken(Tokens.OPEN, char, pos);
      case ']':
        return this.buildToken(Tokens.CLOSE, char, pos);
      case '=':
        return this.buildToken(Tokens.EQUAL, char, pos);
      default:
        return this.buildToken(Tokens.ILLEGAL, char, pos);
    }
  }
}


// const lexIdent = () => {};

// const lex = () => {};

// export const lexer = (file: string): Token[] => {
//   const token: Token[] = [];
//   let pos = 0;
//   const row = 0;

//   for (let i=0; i < file.length; i++) {
    
//     let value = file[i];



//     token.push({
//       row,
//       from: i,
//       to: i,
//       kind: TokenType.OPEN,
//       value: file[i] 
//     });

//     console.log(file[i]);
//   }

//   return token;
// };

// export const parser = (file: string) => {
//   return file;
// };
