import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-accueil',
  templateUrl: './admin-accueil.component.html',
  styleUrl: './admin-accueil.component.css'
})
export class AdminAccueilComponent {
  isSidebarCollapsed = false;

  onSidebarToggle(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
}
