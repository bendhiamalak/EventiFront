import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = false;
  activeItem = 'dashboard';

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigate(route: string) {
    this.activeItem = route;
    // Tu peux ici router : this.router.navigate([route])
  }

  logout() {
    // Logique de déconnexion
  }
}
