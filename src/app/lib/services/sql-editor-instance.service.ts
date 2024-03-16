import {MonacoService} from "../monaco.service";
import {
	BpaAutoCompleteConfig,
	CancellationToken,
	CompletionContext,
	CompletionItem,
	CompletionItemKind,
	CompletionItemProvider,
	CompletionList,
	IDisposable,
	ITextModel,
	Position,
	ProviderResult
} from "../types";
import {EditorComponent} from "../editor.component";
import {EditorInstanceService} from "./editor-instance.service";


export class SqlEditorInstanceService implements EditorInstanceService {
	private toke_name_01 = 'simple-param';
	private toke_name_02 = 'simple-param-list';
	private autoComProvider?: IDisposable;
	private customTokens = [
		[/{.*}/, this.toke_name_01],
		[/#.*/, this.toke_name_02]
	];

	constructor(private monacoService: MonacoService) {
	}

	setDefaults(component: EditorComponent) {
		if (component.language == "sql") {
			console.log("setting sql");
			this.setCustomTokens();
			this.setCustomTheme('vs');
		}

		const ac: BpaAutoCompleteConfig = {
			trigger: '{',
			tokens: [
				{
					label: '{processInstanceId}',
					detail: 'تست',
					insertText: 'processInstanceId}',
					documentation: '{processInstanceId}',
				}
			]
		};
		this.setSqlAutoCompleteTokens(ac);
	}

	setCustomTheme(baseTheme: 'vs' | 'vs-dark') {
		this.monacoService.Monaco?.editor.defineTheme('vs-bpa', {
			base: baseTheme,
			inherit: true,
			rules: [
				{
					token: this.toke_name_01,
					foreground: '#ff0000',
					background: '#ff0060',
					fontStyle: 'bold'
				},
				{
					token: this.toke_name_02,
					foreground: '#1d6b70',
					background: '#ff0060',
					fontStyle: 'bold'
				}
			],
			colors: {}
		})
	}

	setCustomTokens() {
		const monaco = this.monacoService.Monaco as any;
		monaco.languages.getLanguages().find(({id}: any) => id === 'sql').loader()
		      .then((resp: any) => {
			      const sqlLanguage = resp.language;
			      sqlLanguage.tokenizer.root = [
				      ...this.customTokens,
				      ...sqlLanguage.tokenizer.root
			      ];
		      });
	}

	setSqlAutoCompleteTokens(ac: BpaAutoCompleteConfig): void {
		const monaco = this.monacoService.Monaco;
		const sqlAutoCompleteItems: CompletionItem[] = [];
		const sqlCompletionProvider: CompletionItemProvider = {
			provideCompletionItems(_: ITextModel, pos: Position, __: CompletionContext, ___: CancellationToken):
				ProviderResult<CompletionList> {
				// const last_chars = tModel.getValueInRange({
				// 	startLineNumber: pos.lineNumber,
				// 	startColumn: 0,
				// 	endLineNumber: pos.lineNumber,
				// 	endColumn: pos.column
				// });

				sqlAutoCompleteItems.length = 0;
				ac.tokens.forEach(token => {
					const kind = CompletionItemKind.Variable;
					sqlAutoCompleteItems.push({
						label: token.label ?? 'Name Not Found',
						detail: token.detail ?? 'title Not Found',
						documentation: token.documentation ?? 'description Not Found',
						kind,
						insertText: token.insertText ?? '',
						range: {
							startLineNumber: pos.lineNumber,
							startColumn: pos.column,
							endLineNumber: pos.lineNumber,
							endColumn: pos.column,
						}
					});
				});
				return {suggestions: sqlAutoCompleteItems};
			},
			triggerCharacters: [ac.trigger ?? '{']
		};
		this.autoComProvider = monaco?.languages.registerCompletionItemProvider('sql', sqlCompletionProvider);
	}

	dispose(): void {
		this.autoComProvider?.dispose();
	}
}