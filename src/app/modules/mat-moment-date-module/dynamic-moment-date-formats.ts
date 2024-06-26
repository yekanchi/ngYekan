import {MatDateFormats} from '@angular/material/core';

export const MOMENT_JALAALI_DATE_FORMATS: MatDateFormats = {
	parse: {
		dateInput: 'l',
	},
	display: {
		dateInput: 'l',
		// monthLabel: 'short',
		monthYearLabel: 'my',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'my',
	},
};
