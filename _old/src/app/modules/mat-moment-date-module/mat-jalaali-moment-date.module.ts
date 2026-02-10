import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentJalaliDateAdapter} from "./moment-jalali-date-adapter";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from "@angular/material-moment-adapter";
import {MOMENT_JALAALI_DATE_FORMATS} from "./dynamic-moment-date-formats";

export const JALAALI_DATE_PROVIDERS = [
	{
		provide: DateAdapter, useClass: MomentJalaliDateAdapter,
		deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
	},
	{provide: MAT_DATE_FORMATS, useValue: MOMENT_JALAALI_DATE_FORMATS}];

// @NgModule({
// 	declarations: [],
// 	imports: [CommonModule],
// 	providers: [...DYNAMIC_DATE_PROVIDERS],
// })
// export class MatJalaliMomentDateModule {
// }
