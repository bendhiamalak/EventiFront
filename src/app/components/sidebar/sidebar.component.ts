import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = false;
  activeItem = 'dashboard';

  @Output() toggle = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);
  }

  navigate(route: string) {
    this.activeItem = route;
    // Tu peux ici router : this.router.navigate([route])
  }

  logout() {
    // Logique de déconnexion
  }
}
