import {Component, HostBinding} from '@angular/core';

@Component({
	selector: 'test-grid-list',
	standalone: false,
	template: `
      <div [style.width.px]="600">
          <mat-card appearance="outlined" cdkDrag>
              <mat-card-content>
                  <mat-grid-list cols="12" rowHeight="30px"
                                 gutterSize="1px" dir="ltr"
                                 [style.border-radius.px]="5">
                      <mat-grid-tile [colspan]="1" [rowspan]="2">1</mat-grid-tile>
                      <mat-grid-tile [colspan]="2" [rowspan]="1">2</mat-grid-tile>
                      <mat-grid-tile [colspan]="9" [rowspan]="2">3</mat-grid-tile>

                      <mat-grid-tile [colspan]="2" [rowspan]="1">4</mat-grid-tile>
                  </mat-grid-list>
              </mat-card-content>
          </mat-card>
      </div>
	`,
	styles: `
    mat-grid-tile {
      background-color: antiquewhite;
    }

	`
})
export class TestGridListComponent {
	@HostBinding('class.test-component') _test_comp_class = true;
}
