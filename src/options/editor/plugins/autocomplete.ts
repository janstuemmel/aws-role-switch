import type {
  Completion,
  CompletionContext,
  CompletionResult,
} from '@codemirror/autocomplete';

import { availableRegions } from '../../../common/config/availableRegions';
import colors from '../../../common/const/cssColors';

const getOptions = (key: string): Completion[] => {
  switch (key) {
    case 'region':
      return availableRegions.map((r): Completion => ({ 
        label: r, 
        type: 'constant',
      }));
    case 'color':
      return Object.keys(colors).map((c): Completion => ({ 
        label: c, 
        type: 'constant',
        info: () => {
          const color = document.createElement('div');
          color.style.backgroundColor = c;
          color.style.width = '40px';
          color.style.height = '20px';
          return color;
        } 
      }));
    case 'key':
      return [
        { label: 'aws_account_id', apply: 'aws_account_id =', type: 'keyword' },
        { label: 'role_name', apply: 'role_name =', type: 'keyword' },
        { label: 'role_arn', apply: 'role_arn =', type: 'keyword' },
        { label: 'color', apply: 'color =', type: 'keyword' },
        { label: 'group', apply: 'group =', type: 'keyword' },
        { label: 'region', apply: 'region =', type: 'keyword' },
      ] as Completion[];
    default:
      return [];
  }
};

export const completeValue = (
  context: CompletionContext
): CompletionResult | null => {
  const re = /^(region|color) =(\s*)([\w-]*)$/;
  const word = context.matchBefore(re);
  const match = word?.text.match(re);
  if (!word || !match || word.from == word.to) return null;
  return {
    from: word.to - match[3].length,
    options: getOptions(match[1]),
    filter: true,
  };
};

export const completeKey = (
  context: CompletionContext
): CompletionResult | null => {
  const word = context.matchBefore(/^\w+/);
  if (!word) return null;
  return {
    from: word.from,
    options: getOptions('key'),
    filter: true,
  };
};
