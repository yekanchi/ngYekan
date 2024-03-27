import {EditorOptions} from "./monaco-types";

export class NgxMonacoEditorConfig {
	baseUrl?: string;
	requireConfig?: { [key: string]: any; };
	defaultOptions?: EditorOptions;
	monacoRequire?: Function;
	onMonacoLoad?: Function;
}