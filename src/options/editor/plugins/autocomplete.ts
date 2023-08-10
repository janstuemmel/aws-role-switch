import {
  closeCompletion,
  Completion,
  CompletionContext,
  CompletionResult,
  startCompletion,
} from '@codemirror/autocomplete';
import { EditorView } from '@codemirror/view';

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
        { label: 'aws_account_id', apply: 'aws_account_id = ', type: 'keyword' },
        { label: 'role_name', apply: 'role_name = ', type: 'keyword' },
        { label: 'target_role_name', apply: 'target_role_name = ', type: 'keyword' },
        { label: 'source_profile', apply: 'source_profile = ', type: 'keyword' },
        { label: 'role_arn', apply: 'role_arn = ', type: 'keyword' },
        { label: 'color', apply: 'color = ', type: 'keyword' },
        { label: 'group', apply: 'group = ', type: 'keyword' },
        { label: 'region', apply: 'region = ', type: 'keyword' },
      ] as Completion[];
    default:
      return [];
  }
};

// fixes the codemirror behaviour when a completion is applied
// the next completion dialog is not shown 
export const showCompletionForCompletedKey = EditorView.updateListener.of(({ state, view, docChanged }) => {
  const currentLineNumber = state.doc.lineAt(state.selection.main.head).number;
  const line = state.doc.line(currentLineNumber).text;
  const match = line.match(/^(region|color)\s*=\s$/);
  if (docChanged && match) {
    closeCompletion(view);
    startCompletion(view);
  }
});

export const completeValue = (
  context: CompletionContext
): CompletionResult | null => {
  const re = /^(region|color)\s*=\s*([\w-]*)$/;
  const word = context.matchBefore(re);
  const match = word?.text.match(re);
  if (!word || !match || word.from == word.to) return null;
  return {
    from: word.to - match[2].length,
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
