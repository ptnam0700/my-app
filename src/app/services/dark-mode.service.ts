import { Injectable, signal } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private _isDarkMode: boolean = false;

  constructor() {
    // Initialize with system preference or from localStorage
    this._isDarkMode =
      localStorage.getItem('darkMode') === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.updateBodyClass();
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  toggleDarkMode(): void {
    this._isDarkMode = !this._isDarkMode;
    localStorage.setItem('darkMode', String(this._isDarkMode));
    this.updateBodyClass();
  }

  private updateBodyClass(): void {
    if (this._isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
