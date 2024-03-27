import {Component, Inject} from '@angular/core';
import {Moment} from 'moment';
import {JALAALI_DATE_PROVIDERS} from "../modules/mat-moment-date-module/mat-jalaali-moment-date.module";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";

@Component({
	selector: 'test-date-picker',
	providers: [JALAALI_DATE_PROVIDERS],
	styles: ``,
	template: `
      <div dir="rtl">
          <mat-card>
              <mat-card-header>
                  <mat-card-title> Multi locale sample</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                  <div style="margin-top: 1rem">
                      <mat-form-field appearance="fill">
                          <mat-label>Choose a date</mat-label>
                          <input
                                  matInput
                                  [matDatepicker]="picker"
                                  [value]="date"
                          />
                          <mat-datepicker-toggle
                                  matSuffix
                                  [for]="picker"
                          ></mat-datepicker-toggle>
                          <mat-datepicker #picker></mat-datepicker>
                      </mat-form-field>
                  </div>
              </mat-card-content>
          </mat-card>
      </div>
	`
})
export class TestDatePickerComponent {
	date: Date | Moment = new Date();

	constructor(private _adapter: DateAdapter<any>,
	            @Inject(MAT_DATE_LOCALE) public _locale: any) {
		this._locale = 'fa-IR';
		this._adapter.setLocale(this._locale);
	}
}

