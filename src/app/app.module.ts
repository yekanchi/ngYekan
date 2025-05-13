import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MonacoEditorModule} from "./modules/monaco-editor/monacoEditor.module";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
	MatDatepicker,
	MatDatepickerInput,
	MatDatepickerModule,
	MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {TestCodeEditorComponent} from './components/test-code-editor.component';
import {TestDatePickerComponent} from "./components/test-date-picker.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {TestDividerComponent} from './components/test-divider.component';
import {TestGridListComponent} from './components/test-grid-list.component';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {TestBaseComponent} from "./components/test-base.component";

@NgModule({
	declarations: [AppComponent, TestCodeEditorComponent, TestDatePickerComponent, TestDividerComponent, TestGridListComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		MatFormField,
		MatLabel,
		MatDatepickerInput,
		MatDatepickerToggle,
		MatDatepicker,
		MatCardHeader,
		MatCardTitle,
		MatFormField,
		MatCard,
		MatDatepickerModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatCardContent,
		MonacoEditorModule.forRoot(),
		MatList,
		MatListItem,
		MatDivider,
		MatGridTile,
		MatGridList,
		CdkDrag,
		TestBaseComponent,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
