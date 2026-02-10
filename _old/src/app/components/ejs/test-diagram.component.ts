import {Component} from '@angular/core';
import {DiagramModule} from "@syncfusion/ej2-angular-diagrams";

@Component({
	selector: 'bpa-test-diagram',
	imports: [DiagramModule],
	standalone: true,
	template: `
      <ejs-diagram id="diagram" width="100%" height="580px"></ejs-diagram>
	`,
	styles: ``
})
export class TestDiagramComponent {

}
