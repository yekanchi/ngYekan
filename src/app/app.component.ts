import {Component, VERSION, ViewChild} from "@angular/core";
import {TestCodeEditorComponent} from "./components/test-code-editor.component";

@Component({
	selector: "bpa-root",
	template: `
      <h3>Angular v.{{ version.full }}</h3>
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
	version = VERSION;

	constructor() {
		
	}
}
