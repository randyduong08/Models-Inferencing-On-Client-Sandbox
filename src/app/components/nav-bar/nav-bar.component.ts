import { Component, HostListener } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  isDropdownOpen: boolean = false;

  @HostListener('mousehover')
  openDropdown(): void {
    this.isDropdownOpen = true;
  }

  @HostListener('mouseleave')
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
