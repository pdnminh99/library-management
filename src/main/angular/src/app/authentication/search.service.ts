import { Injectable } from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _value = '';

  public get value(): string {
    return this._value;
  }

  public set value(newValue: string) {
    this._value = newValue;
  }

  public get isSearchActive(): boolean {
    return this.value.trim().length > 0;
  }
}
