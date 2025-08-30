import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
	selector: 'formly-wrapper-horizontal',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="flex items-center gap-6 mb-7">
			<label *ngIf="to.label" class="w-1/4 text-lg font-semibold text-[#1d1d1f]">{{ to.label }}</label>
			<div class="flex-1">
				<ng-container #fieldComponent></ng-container>
			</div>
		</div>
	`,
})
export class FormlyWrapperHorizontal extends FieldWrapper {}

