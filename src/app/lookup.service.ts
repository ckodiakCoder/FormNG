import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LookupService {
  private emailsTaken = ['test@example.com', 'user@domain.com'];

  getCountries() {
    return of([
      { label: 'USA', value: 'US' },
      { label: 'India', value: 'IN' },
    ]).pipe(delay(500));
  }

  getStates(country: string) {
    const states: { [key: string]: { label: string; value: string }[] } = {
      US: [
        { label: 'California', value: 'CA' },
        { label: 'New York', value: 'NY' },
      ],
      IN: [
        { label: 'Delhi', value: 'DL' },
        { label: 'Maharashtra', value: 'MH' },
      ],
    };
    return of(states[country] || []).pipe(delay(500));
  }

  checkEmailUnique(email: string) {
    return of(this.emailsTaken.includes(email)).pipe(
      delay(1000),
      map(isTaken => (isTaken ? { uniqueEmail: true } : null))
    );
  }

  getAddressByPincode(pincode: string) {
    // Mock API
    const data: { [key: string]: string } = {
      '110001': 'Connaught Place, Delhi',
      '400001': 'Fort, Mumbai',
    };
    return of(data[pincode] || 'Unknown').pipe(delay(800));
  }
}
