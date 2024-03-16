import {Component} from '@angular/core';

@Component({
	selector: 'bpa-root',
	template: `
      <h1>Welcome to {{ title }}!</h1>

      <ngx-monaco-editor value="SELECT * FROM users where id ={userId} " language="sql" [fontSize]="16"/>
      <ngx-monaco-editor [value]="jsonCode" language="json" baseTheme="vs" theme="vs-bpa" [fontSize]="16"/>
	`,
	styles: []
})
export class AppComponent {
	title = 'ngYekan';
	jsonCode = `
{
	"user_id": 5,
	"user_name": "January"
}
	`
}
