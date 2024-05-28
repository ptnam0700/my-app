import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  mobileMenuOpen = false;

  navigation = [
    // { name: 'Home', href: '/', current: true },
    { name: 'Products', href: '/products', current: false },
  ]

  constructor(
    public darkModeService: DarkModeService,
    private router: Router
  ) {}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
