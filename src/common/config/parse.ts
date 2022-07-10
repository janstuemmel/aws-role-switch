import {
  stringify as stringifyIni,
  parse as parseIni,
  $Errors,
} from 'js-ini';
import { IIniObject } from 'js-ini/lib/interfaces/ini-object';
import get from 'lodash/get';
import omit from 'lodash/omit';

import { StoredConfig } from '../../types';

function parse(config: string) {
  return parseIni(config, {
    comment: '#',
    nothrow: true,
    autoTyping: false,
  }) as StoredConfig;
}

export function parseConfig(config: string): StoredConfig {
  return omit(parse(config), $Errors) as StoredConfig;
}

export function parseConfigError(config: string) {
  return get(parse(config), $Errors);
}

export function stringifyConfig(data: IIniObject) {
  return stringifyIni(data, {
    blankLine: true,
    spaceAfter: true,
    spaceBefore: true,
  });
}
