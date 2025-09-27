import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {
  @Input() userName: string = '';
  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}

