import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {NGX_MONACO_EDITOR_CONFIG, NgxMonacoEditorConfig} from './types';
import {EditorComponent} from './editor.component';
import {BpasControlBaseComponent} from "./bpas-control-base.component";
import * as IMonaco from 'monaco-editor'
import {MonacoService} from "./monaco.service";

export function onMonacoLoad() {
	let monaco = ((window as any).monaco as typeof IMonaco);
	const uri = monaco.Uri.parse('a://b/foo.json');
	monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
		validate: true,
		schemas: [{
			uri: 'http://myserver/foo-schema.json',
			fileMatch: [uri.toString()],
			schema: {
				type: 'object',
				properties: {
					p1: {
						enum: ['v1', 'v2']
					},
					p2: {
						$ref: 'http://myserver/bar-schema.json'
					}
				}
			}
		}, {
			uri: 'http://myserver/bar-schema.json',
			fileMatch: [uri.toString()],
			schema: {
				type: 'object',
				properties: {
					q1: {
						enum: ['x1', 'x2']
					}
				}
			}
		}]
	});

}

const monacoConfig: NgxMonacoEditorConfig = {
	// baseUrl: 'assets/monaco',
	baseUrl: 'http://www.unpkg.com/monaco-editor@0.47.0',
	defaultOptions: {
		scrollBeyondLastLine: false,
		theme: "vs-dark"
	},
	onMonacoLoad
};


@NgModule({
	imports: [CommonModule],
	declarations: [EditorComponent, BpasControlBaseComponent],
	exports: [EditorComponent],
	providers: [MonacoService]
})
export class MonacoEditorModule {
	public static forRoot(config?: NgxMonacoEditorConfig): ModuleWithProviders<MonacoEditorModule> {
		if (!config) {
			config = monacoConfig;
			console.log("default options:");
			console.log(config.defaultOptions)
		}
		return {
			ngModule: MonacoEditorModule,
			providers: [{provide: NGX_MONACO_EDITOR_CONFIG, useValue: config}]
		};
	}
}
