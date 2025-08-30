// ...existing code continues below...
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormGroup, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { LookupService } from './lookup.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  FormlyModule,
    FormlyPrimeNGModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
  ],
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  constructor(private lookup: LookupService, private router: Router) {
    this.fields = [
      // All fields will use the 'card' wrapper for a professional answer box look
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Full Name',
          required: true,
          inputClass: 'w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#101E8A] focus:border-[#101E8A] bg-white text-[#1d1d1f] placeholder-gray-400',
          labelClass: 'block mb-2 text-lg font-semibold text-[#1d1d1f] drop-shadow',
        },
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          type: 'email',
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
          minLength: 5,
          inputClass: 'w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#101E8A] focus:border-[#101E8A] bg-white text-[#1d1d1f] placeholder-gray-400',
          labelClass: 'block mb-2 text-lg font-semibold text-[#1d1d1f] drop-shadow',
        },
      },
      {
        key: 'gender',
        type: 'select',
        templateOptions: {
          label: 'Gender',
          required: true,
          options: [
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' },
            { label: 'Other', value: 'O' },
          ],
          selectClass: 'w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#101E8A] focus:border-[#101E8A] bg-white text-[#1d1d1f]',
          labelClass: 'block mb-2 text-lg font-semibold text-[#1d1d1f] drop-shadow',
        },
      },
      {
        key: 'qualification',
        type: 'select',
        templateOptions: {
          label: 'Highest Qualification',
          required: true,
          options: [
            { label: 'High School', value: 'HS' },
            { label: 'Graduate', value: 'GR' },
            { label: 'Post Graduate', value: 'PG' },
          ],
          selectClass: 'w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#101E8A] focus:border-[#101E8A] bg-white text-[#1d1d1f]',
          labelClass: 'block mb-2 text-lg font-semibold text-[#1d1d1f] drop-shadow',
        },
      },
      {
        key: 'pincode',
        type: 'input',
        templateOptions: {
          label: 'Pincode',
          required: true,
          inputClass: 'w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#101E8A] focus:border-[#101E8A] bg-white text-[#1d1d1f] placeholder-gray-400',
          labelClass: 'block mb-2 text-lg font-semibold text-[#1d1d1f] drop-shadow',
        },
        hooks: {
          onChanges: field => {
            field.formControl?.valueChanges.pipe(
              switchMap(code =>
                code?.length === 6 ? this.lookup.getAddressByPincode(code) : of('')
              )
            ).subscribe(addr => {
              this.model.address = addr;
            });
          },
        },
      },
      {
        key: 'address',
        type: 'input',
        templateOptions: {
          label: 'Address',
          inputClass: 'w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#101E8A] focus:border-[#101E8A] bg-white text-[#1d1d1f] placeholder-gray-400',
          labelClass: 'block mb-2 text-lg font-semibold text-[#1d1d1f] drop-shadow',
        },
      },
      {
        key: 'country',
        type: 'select',
        templateOptions: {
          label: 'Country',
          required: true,
          options: [],
          selectClass: 'w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#101E8A] focus:border-[#101E8A] bg-white text-[#1d1d1f]',
          labelClass: 'block mb-2 text-lg font-semibold text-[#1d1d1f] drop-shadow',
        },
        hooks: {
          onInit: field => {
            this.lookup.getCountries().subscribe(data => {
              field.templateOptions!.options = data;
            });
          },
        },
      },
      {
        key: 'state',
        type: 'select',
        templateOptions: {
          label: 'State',
          required: true,
          options: [],
          selectClass: 'w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#101E8A] focus:border-[#101E8A] bg-white text-[#1d1d1f]',
          labelClass: 'block mb-2 text-lg font-semibold text-[#1d1d1f] drop-shadow',
        },
        hideExpression: (model: any) => !model.country,
        hooks: {
          onInit: field => {
            const form = field.form as FormGroup;
            form?.get('country')?.valueChanges.pipe(
              switchMap(c => c ? this.lookup.getStates(c) : of([]))
            ).subscribe(data => {
              field.templateOptions!.options = data;
            });
          },
        },
      },
    ];
  }

  getFieldControl(key: any) {
    return typeof key === 'string' ? this.form.get(key) : null;
  }

  getFieldErrors(key: any) {
    const control = this.getFieldControl(key);
    return control ? control.errors : null;
  }

  submit() {
    console.log('Form Errors:', this.form.errors);
    console.log('Form Value:', this.form.value);
    if (this.form.valid) {
      console.log('Form Submitted:', this.model);
      this.router.navigate(['/thanks']);
    } else {
      console.log('Form Invalid');
    }
  }
}
