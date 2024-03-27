import {EventEmitter, inject} from '@angular/core';
import {IMonaco} from "./type/monaco-types";
import {NGX_MONACO_EDITOR_CONFIG} from "./type/NGX_MONACO_EDITOR_CONFIG";

declare var monaco: IMonaco;

export class MonacoService {
	public onMonacoLoaded: EventEmitter<IMonaco> = new EventEmitter<IMonaco>();
	private config = inject(NGX_MONACO_EDITOR_CONFIG);
	private hasLoadedMonaco = false;
	private monacoLoadPromise?: Promise<void>;
	public Monaco?: IMonaco;


	private onMonacoReady() {
		this.Monaco = monaco;
		this.onMonacoLoaded.emit(monaco);
	}

	loadMonacoEditor(): void {
		if (this.hasLoadedMonaco && this.monacoLoadPromise) {
			this.monacoLoadPromise.then(() => {
				this.onMonacoLoaded.emit(monaco);
			});
		} else {
			this.hasLoadedMonaco = true;
			this.monacoLoadPromise = new Promise<void>((resolve: any) => {
				// const baseUrl = this.config.baseUrl || "./assets/monaco";
				const baseUrl = this.config.baseUrl;
				if (typeof ((<any>window).monaco) === 'object') {
					this.onMonacoReady();
					resolve();
					return;
				}
				const onGotAmdLoader: any = (require?: any) => {
					let usedRequire = require || (<any>window).require;
					let requireConfig = {paths: {vs: `${baseUrl}/min/vs`}};
					Object.assign(requireConfig, this.config.requireConfig || {});
					// Load monaco
					usedRequire.config(requireConfig);
					usedRequire([`vs/editor/editor.main`], () => {
						if (typeof this.config.onMonacoLoad === 'function') {
							this.config.onMonacoLoad();
						}
						this.onMonacoReady()
						resolve();
					});
				};

				if (this.config.monacoRequire) {
					onGotAmdLoader(this.config.monacoRequire);
					// Load AMD loader if necessary
				} else if (!(<any>window).require) {
					const loaderScript: HTMLScriptElement = document.createElement('script');
					loaderScript.type = 'text/javascript';
					loaderScript.src = `${baseUrl}/min/vs/loader.js`;
					loaderScript.addEventListener('load', () => {
						onGotAmdLoader();
					});
					document.body.appendChild(loaderScript);
					// Load AMD loader without over-riding node's `require`
				} else if (!(<any>window).require.config) {
					const src = `${baseUrl}/monaco/min/vs/loader.js`;

					const loaderRequest = new XMLHttpRequest();
					loaderRequest.addEventListener("load", () => {
						let scriptElem = document.createElement('script');
						scriptElem.type = 'text/javascript';
						scriptElem.text = [
							// Monaco uses a custom amd loader that over-rides node's require.
							// Keep a reference to node's `require`, so we can restore it after executing the amd loader file.
							'var nodeRequire = require;',
							loaderRequest.responseText.replace('"use strict";', ''),
							// Save Monaco's amd require and restore Node's require
							'var monacoAmdRequire = require;',
							'require = nodeRequire;',
							'require.nodeRequire = require;'
						].join('\n');
						document.body.appendChild(scriptElem);
						onGotAmdLoader((<any>window).monacoAmdRequire);
					});
					loaderRequest.open("GET", src);
					loaderRequest.send();

				} else {
					onGotAmdLoader();
				}
			});
		}
	}
}
