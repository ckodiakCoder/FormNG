import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyWrapperCard } from './formly-card.wrapper';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

export const appProviders = importProvidersFrom(
  BrowserAnimationsModule,
  ReactiveFormsModule,
  InputTextModule,
  SelectModule,
  ButtonModule,
  FormlyModule.forRoot({
    wrappers: [
      { name: 'card', component: FormlyWrapperCard },
      { name: 'form-field', component: FormlyWrapperCard },
    ],
  }),
  FormlyPrimeNGModule
);