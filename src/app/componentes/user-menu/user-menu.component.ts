import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RedireccionService } from '../../servicios/redireccion.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {
  @Input() userName: string = '';
  @Output() logout = new EventEmitter<void>();

  constructor(protected redireccionamiento:RedireccionService) {}

  onLogout() {
    this.logout.emit();
  }

}

