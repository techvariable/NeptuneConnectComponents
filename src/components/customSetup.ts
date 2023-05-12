import { highlightSpecialChars, drawSelection, dropCursor, highlightActiveLine, keymap } from '@codemirror/view';
export { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
export { EditorState } from '@codemirror/state';
import { history, historyKeymap } from '@codemirror/history';
import { foldGutter, foldKeymap } from '@codemirror/fold';
import { indentOnInput } from '@codemirror/language';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { defaultKeymap } from '@codemirror/commands';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { commentKeymap } from '@codemirror/comment';
import { rectangularSelection } from '@codemirror/rectangular-selection';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { lintKeymap } from '@codemirror/lint';

const settingsGetterFun = () => {
  const isLineNumberEnabled = JSON.parse(localStorage.getItem('isLineNumberEnabled'));
  const isHigglightActiveLine = JSON.parse(localStorage.getItem('isHigglightActiveLine'));
  const isAutoCloseBracket = JSON.parse(localStorage.getItem('isAutoCloseBracket'));
  const ishighlightSelectionMatches = JSON.parse(localStorage.getItem('highlightSelectionMatches'));
  const isbracketMatchingEnabled = JSON.parse(localStorage.getItem('isbracketMatchingEnabled'));

  return {
    isLineNumberEnabled: isLineNumberEnabled === null ? true : isLineNumberEnabled,
    isHigglightActiveLine: isHigglightActiveLine === null ? true : isHigglightActiveLine,
    isAutoCloseBracket: isAutoCloseBracket === null ? true : isAutoCloseBracket,
    ishighlightSelectionMatches: ishighlightSelectionMatches === null ? true : ishighlightSelectionMatches,
    isbracketMatchingEnabled: isbracketMatchingEnabled === null ? true : isbracketMatchingEnabled,
  };
};

const settings = settingsGetterFun();

const customSetup = [
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  defaultHighlightStyle.fallback,
  autocompletion(),
  rectangularSelection(),
  keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, ...foldKeymap, ...commentKeymap, ...completionKeymap, ...lintKeymap]),
];

if (settings.isLineNumberEnabled) customSetup.push(lineNumbers());
if (settings.ishighlightSelectionMatches) customSetup.push(highlightSelectionMatches());
if (settings.isAutoCloseBracket) customSetup.push(closeBrackets());
if (settings.isHigglightActiveLine) customSetup.push(highlightActiveLine());
if (settings.isLineNumberEnabled) customSetup.push(lineNumbers());
if (settings.isbracketMatchingEnabled) customSetup.push(bracketMatching());

export { customSetup };
