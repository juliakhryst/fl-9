import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  appPrefix = 'hw-15';
  constructor() { }

  setItem(param: string, value: any): void {
    localStorage.setItem(`${this.appPrefix}-${param}`, JSON.stringify(value));
  }

  getItem(param: string): any {
    return JSON.parse(localStorage.getItem(`${this.appPrefix}-${param}`));
  }
}
