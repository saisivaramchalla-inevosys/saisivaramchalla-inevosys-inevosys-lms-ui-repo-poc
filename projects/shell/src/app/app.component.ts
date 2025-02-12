import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'shell';
  
  // Inject KeycloakService for authentication and authorization
  keyclockser = inject(KeycloakService);
  
  // Initialize Flowbite components on component initialization
  ngOnInit(): void {
    initFlowbite();
  }
  
  // Logout function to call KeycloakService's logout method
  logout = () => {
    this.keyclockser.logout();
  }
}
