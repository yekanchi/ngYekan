import {Component, VERSION, ViewChild} from "@angular/core";
import {TestCodeEditorComponent} from "./components/test-code-editor.component";

@Component({
	selector: "bpa-root",
	template: `
      @switch (version) {
          @case (1) {

          }
      }
      alas = s
      @let x = 25;
      y = x + 253;
      z= x + 1;
      @defer (on timer(25)) {

      }
      <h3>Angular v.{{ version.full }}</h3>
      <test-code-editor/>
      <test-date-picker/>
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
