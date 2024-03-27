// import * as MonacoEditor from 'monaco-editor'
// import CompletionItemKind = MonacoEditor.languages.CompletionItemKind;
// import ProviderResult = MonacoEditor.languages.ProviderResult;
// import {Thenable} from "monaco-editor";
//
// export type EditorOptions = { [key: string]: any; }
// export type IMonaco = typeof MonacoEditor;
// // Monaco Types:
// export type Position = MonacoEditor.Position;
// export type IDisposable = MonacoEditor.IDisposable;
// export type CancellationToken = MonacoEditor.CancellationToken;
// export type ITextModel = MonacoEditor.editor.ITextModel;
// export type IStandaloneCodeEditor = MonacoEditor.editor.IStandaloneCodeEditor;
// export type IStandaloneEditorConstructionOptions = MonacoEditor.editor.IStandaloneEditorConstructionOptions;
// export type BuiltinTheme = MonacoEditor.editor.BuiltinTheme;
// export type CompletionContext = MonacoEditor.languages.CompletionContext;
// export type CompletionItem = MonacoEditor.languages.CompletionItem;
// export type CompletionList = MonacoEditor.languages.CompletionList;
// export type CompletionItemProvider = MonacoEditor.languages.CompletionItemProvider;
// export {CompletionItemKind as CompletionItemKind}
// export {ProviderResult as ProviderResult}


// =================================== ~~~~~~~~~~~~~~~~~~~~~~~~ ===================================

interface PromiseLike<T> {
	then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2>;
}
export type Thenable<T> = PromiseLike<T>;

const MonacoEditor: any = {}
export type EditorOptions = { [key: string]: any; }
export type IMonaco = typeof MonacoEditor;
// Monaco Types:
export type Position = any;
export type IDisposable = any;
export type CancellationToken = any;
export type ITextModel = any;
export type IStandaloneCodeEditor = any;
export type IStandaloneEditorConstructionOptions = any;
export type BuiltinTheme = any;
export type CompletionContext = any;
export type CompletionItem = any;
export type CompletionList = any;
export type CompletionItemProvider = any;
export enum CompletionItemKind {
	Variable = 4,
}
export type ProviderResult<T> = T | undefined | null | Thenable<T | undefined | null>;