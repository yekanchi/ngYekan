import {InjectionToken} from '@angular/core';
import * as MonacoEditor from 'monaco-editor'
import CompletionItemKind = MonacoEditor.languages.CompletionItemKind;
import ProviderResult = MonacoEditor.languages.ProviderResult;

export const NGX_MONACO_EDITOR_CONFIG = new InjectionToken<NgxMonacoEditorConfig>('NGX_MONACO_EDITOR_CONFIG');
export type EditorOptions = { [key: string]: any; }
export type IMonaco = typeof MonacoEditor;
// Monaco Types:
export type Position = MonacoEditor.Position;
export type IDisposable = MonacoEditor.IDisposable;
export type CancellationToken = MonacoEditor.CancellationToken;
// Editor Types:
export type ITextModel = MonacoEditor.editor.ITextModel;
// Language Types:
export type CompletionContext = MonacoEditor.languages.CompletionContext;
export type CompletionItem = MonacoEditor.languages.CompletionItem;
export type CompletionList = MonacoEditor.languages.CompletionList;
export type CompletionItemProvider = MonacoEditor.languages.CompletionItemProvider;
export {CompletionItemKind as CompletionItemKind}
export {ProviderResult as ProviderResult}

export class NgxMonacoEditorConfig {
	baseUrl?: string;
	requireConfig?: { [key: string]: any; };
	defaultOptions?: EditorOptions;
	monacoRequire?: Function;
	onMonacoLoad?: Function;
}

export interface BpaAutoCompleteConfig {
	trigger: string;
	tokens: BpaAutoCompleteToken[];
}

export interface BpaAutoCompleteToken {
	label: string,
	detail: string,
	documentation: string,
	insertText: string,
}
