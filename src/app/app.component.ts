import { Component, ViewChild } from "@angular/core";
import { TestCodeEditorComponent } from "./components/test-code-editor.component";

@Component({
  selector: "bpa-root",
  template: `
    <h1>Welcome to Angular 17.3.1</h1>
    <test-code-editor></test-code-editor>
    <test-date-picker></test-date-picker>
  `,
  styles: [],
})
export class AppComponent {
  @ViewChild(TestCodeEditorComponent) testCodeEditor?: TestCodeEditorComponent;
  constructor() {}
}
