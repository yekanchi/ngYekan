import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, ControlValueAccessor, ValidationErrors, Validator} from '@angular/forms';

@Component({selector: 'bpas-control-base', template: ``, standalone: false})
// ControlValueAccessor: این اینترفیس برای ایجاد یک کنترل با قابلیت دریافت یک مقدار از نوع دلخواه و برگرداندن آن پیاده‌سازی می شود.
// Validator: این اینترفیس برای داشتن قابلیت
export class BpasControlBaseComponent<T> implements ControlValueAccessor, Validator, AfterViewInit {
	@Input() enableRtl = true;
	@Input() disabled = false;//disabled by @angular/forms?
	@Input() value?: T;
	@Output() valueChange = new EventEmitter<T | any>();
	protected controlIsSet = false; // این مقدار در برخی کنترل‌ها پس از رویداد ViewInit به مقدار true تغییر داده می‌شود.

	// Model -> View changes
	// این متد هنگام نوشتن اطلاعات از مدل به فرم جهت ثبت مقدار کنترل صدا زده می‌شود.
	// در بیشتر موارد بهتر است این متد در کلاس فرزند (ارث بری شده) مجددا بر اساس نیاز پیاده‌سازی شود.
	public writeValue(obj: T): void {
		this.value = obj;
	}

	// این متد هنگام اعتبارسنجی (IsValid) توسط Reactive Forms صدا زده می‌شود.
	validate(control: AbstractControl): ValidationErrors | null {
		return null;
	}

	// متد های زیر این قسمت در 90 درصد موارد در کلاس فرزند نیازی به تغییر یا استفاده ندارند
	// ولی متدهای بالا در اکثر موارد ممکن است در کلاس فرزند نیاز به پیاده‌سازی مجدد (override) داشته باشند

	//  Call This Method When Ever Control Value Has Changed
	// هنگامی که مقادیر کنترل عوض می شود باید این متد صدا زده شود تا تغییرات در مقدار کنترل به فرم اطلاع داده شوند.
	ngAfterViewInit(): void {
		this.controlIsSet = true;
	}

	// محل نگهداری متد کالبک تغییر مقدار

	public controlOnChange(_: T): void {
		//the input of this method is the new value after changed, here it's omitted
	}

	// محل نگهداری متد کالبک برای اطلاع به فرم که کنترل دست خورده است (برای اعتبار سنجی)
	public controlOnTouch(_?: any): void {
	}

	// ثبت متد کالبک تغییرات.
	public registerOnChange(fn: any): void {
		this.controlOnChange = fn;
	}

	// ثبت متد کالبک تاچ.
	public registerOnTouched(fn: any): void {
		this.controlOnTouch = fn;
	}

	// این متد به صورت خودکار توسط Reactive Forms هنگامی که کنترل غیر فعال شده باشد صدا زده می‌شود.
	public setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
