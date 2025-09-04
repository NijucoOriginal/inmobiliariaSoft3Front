import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Inmobiliaria edén';


}
