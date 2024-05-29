import {Component, ViewChild} from "@angular/core";
import {TestCodeEditorComponent} from "./components/test-code-editor.component";

@Component({
	selector: "bpa-root",
	template: `
      <h1>Welcome to Angular 18.0</h1>
      <test-code-editor></test-code-editor>
      <test-date-picker></test-date-picker>
      @if (true) {
          <div></div>
      }
	`,
	styles: [],
})
export class AppComponent {
	@ViewChild(TestCodeEditorComponent) testCodeEditor?: TestCodeEditorComponent;

	constructor() {
		console.log('Hello World!');
	}
}
