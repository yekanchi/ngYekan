import {Component} from '@angular/core';

@Component({
	selector: 'test-code-editor',
	template: `
      <ngx-monaco-editor value="SELECT * FROM users where id ={userId} " language="sql" [fontSize]="16"/>
      <ngx-monaco-editor [value]="jsonCode" language="json" baseTheme="vs" theme="vs-bpa" [fontSize]="16"/>
      @if (true) {

      }
			
	`,
	styles: ``
})
export class TestCodeEditorComponent {
	title = 'ng_demo';
	jsonCode = `
{
	"user_id": 5,
	"user_name": "January"
}
	`
}

