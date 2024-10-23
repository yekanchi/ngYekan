import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	inject,
	Input,
	NgZone,
	OnDestroy,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {
	BuiltinTheme,
	EditorOptions,
	IStandaloneCodeEditor,
	IStandaloneEditorConstructionOptions
} from './type/monaco-types';
import {BpasControlBaseComponent} from "./bpas-control-base.component";
import {MonacoService} from "./monaco.service";
import {EditorInstanceService} from "./services/editor-instance.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {SqlEditorInstanceService} from "./services/sql-editor-instance.service";
import {DefaultEditorInstanceService} from "./services/default-editor-instance.service";
import {NGX_MONACO_EDITOR_CONFIG} from "./type/NGX_MONACO_EDITOR_CONFIG";

@Component({
	selector: 'ngx-monaco-editor',
	styles: [`
    :host {
      display: block;
      height: 300px;
      max-width: 800px;
    }

    .editor-container {
      width: 100%;
      height: 98%;
    }
	`],
	template: '<div class="editor-container" #editorContainer></div>',
	providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EditorComponent), multi: true}],
})
export class EditorComponent extends BpasControlBaseComponent<string> implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('editorContainer', {static: true}) _editorContainer!: ElementRef;
	protected _editorValue: string = '';
	protected _editor?: IStandaloneCodeEditor;
	protected _options: IStandaloneEditorConstructionOptions = {};
	protected _windowResizeSubscription!: Subscription;
	@Output() onInit = new EventEmitter<any>();
	//injected:
	protected config = inject(NGX_MONACO_EDITOR_CONFIG);
	protected zone = inject(NgZone)
	protected monacoService = inject(MonacoService);
	protected editorService!: EditorInstanceService;


	//Inputs:
	@Input() language: 'sql' | 'javascript' | 'json' = 'sql';
	@Input() baseTheme: BuiltinTheme = 'vs-dark';
	@Input() theme: BuiltinTheme | 'vs-bpa' = 'vs-bpa';

	@Input() code: string | null = '';
	@Output() codeChange = new EventEmitter<string>();

	@Input() fontSize = 20;
	@Input() height = 400;
	@Input() width = 1200;


	setService() {
		if (this.language === 'sql') {
			this.editorService = new SqlEditorInstanceService(this.monacoService);
		} else {
			this.editorService = new DefaultEditorInstanceService(this.monacoService);
		}
	}

	ngOnInit(): void {
		this.setService();
		this._options = {
			theme: this.theme,
			language: this.language,
			fontSize: this.fontSize,
			fontFamily: `'Consolas', 'SEGOE UI'`,
			maxTokenizationLineLength: 200000,
			mouseWheelZoom: true,
			minimap: {enabled: false},
			tabSize: 2,
			insertSpaces: false,
			autoClosingBrackets: "never"
		}
		this.monacoService.onMonacoLoaded.subscribe(_monaco => {
			if (_monaco) {
				this.initMonaco(this._options)
			} else {
				console.log("Fatal Monaco Load");
			}

		})
	}

	override ngAfterViewInit(): void {
		this.monacoService.loadMonacoEditor()
	}

	protected initMonaco(options: any): void {
		this.editorService.setDefaults(this);
		this.setEditorModel(options);
		this.createMonacoEditor(options);
		this.setEditorEvents();
		this._editor?.setValue(this.value ?? '')
	};

	private setEditorModel(options: any) {
		const hasModel = !!options.model;
		if (hasModel) {
			const model = this.monacoService.Monaco?.editor.getModel(options.model.uri || '');
			if (model) {
				options.model = model;
				options.model.setValue(this._editorValue);
			} else {
				options.model = this.monacoService.Monaco?.editor.createModel(options.model.value, options.model.language, options.model.uri);
			}
		}
	}

	private createMonacoEditor(options: EditorOptions) {
		if (this._editor) return;

		const insideNg = true;
		if (insideNg) {
			this._editor = this.monacoService.Monaco?.editor.create(this._editorContainer.nativeElement, options);
		} else {
			this.zone.runOutsideAngular(() => {
				this._editor = this.monacoService.Monaco?.editor.create(this._editorContainer.nativeElement, options);
			})
		}
	}

	private setEditorEvents() {
		if (!this._editor) return;
		this._editor.onDidChangeModelContent((e: any) => {
			const value = this._editor ? this._editor.getValue() : '';
			// value is not propagated to parent when executing outside zone.
			this.zone.run(() => {
				this.controlOnChange(value);
				this._editorValue = value;
			});
		});
		this._editor.onDidBlurEditorWidget(() => {
			this.controlOnTouch();
		});
		// refresh layout on resize event.
		if (this._windowResizeSubscription) {
			this._windowResizeSubscription.unsubscribe();
		}
		this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => this._editor?.layout());
		this.onInit.emit(this._editor);
	}

	ngOnDestroy() {
		if (this._windowResizeSubscription) {
			this._windowResizeSubscription.unsubscribe();
		}
		if (this._editor) {
			this.editorService.dispose();
			this._editor.dispose();
			this._editor = undefined;
		}
	}
}
