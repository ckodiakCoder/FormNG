import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-card',
  template: `
    <div class="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-5 flex flex-col gap-2 mb-7">
      <ng-container #fieldComponent></ng-container>
    </div>
  `,
})
export class FormlyWrapperCard extends FieldWrapper {}
