import {Component, VERSION, ViewChild} from "@angular/core";
import {TestCodeEditorComponent} from "./components/test-code-editor.component";

@Component({
	selector: "bpa-root",
	standalone: false,
	template: `


      <!--      @switch (version) {-->
      <!--          @case (1) {-->

      <!--          }-->
      <!--      }-->
      alas = s
      <!--      @let x = 25;-->
      @defer (on timer(25)) {
          y = x + 253;
          z= x + 1;
      }
      <h3>Angular v.{{ version.full }}</h3>
      <h3>Current Angular Version: v.{{ version.full }}</h3>
      <!--      <test-code-editor/>-->
      <!--      <test-date-picker/>-->

      <!--      <test-grid-list/>-->
      <!--      <test-divider/>-->
      <test-base></test-base>
	`,
	styles: [],
})
export class AppComponent {
	@ViewChild(TestCodeEditorComponent) testCodeEditor?: TestCodeEditorComponent;
	version = VERSION;

	constructor() {
		console.log("this is a log")
	}
}
