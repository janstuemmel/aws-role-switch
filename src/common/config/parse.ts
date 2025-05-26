import {$Errors, parse as parseIni, stringify as stringifyIni} from 'js-ini';
import type {IIniObject} from 'js-ini/lib/interfaces/ini-object';

const errorsSymbol = $Errors as unknown as string;

function parse(config: string) {
  return parseIni(config, {
    comment: '#',
    nothrow: true,
    autoTyping: false,
  }) as StoredConfig;
}

export function parseConfig(config: string | undefined): StoredConfig {
  const {[errorsSymbol]: _, ...rest} = parse(config || '');
  return rest;
}

export function parseConfigError(config: string) {
  return parse(config)[errorsSymbol];
}

export function stringifyConfig(data: IIniObject) {
  return stringifyIni(data, {
    blankLine: true,
    spaceAfter: true,
    spaceBefore: true,
  });
}
