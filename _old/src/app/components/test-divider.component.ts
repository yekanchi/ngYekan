import {Component, HostBinding} from '@angular/core';

@Component({
	selector: 'test-divider',
	standalone: false,
	template: `
      <div [style.width.px]="700">
          <mat-card appearance="outlined">
              <mat-list>
                  <mat-list-item>Item 1</mat-list-item>
                  <mat-divider></mat-divider>
                  <mat-list-item>Item 2</mat-list-item>
                  <mat-divider></mat-divider>
                  <mat-list-item>Item 3</mat-list-item>
              </mat-list>
          </mat-card>
      </div>
	`,
	styles: ``
})
export class TestDividerComponent {
	@HostBinding('class.test-component') _test_comp_class = true;
}
