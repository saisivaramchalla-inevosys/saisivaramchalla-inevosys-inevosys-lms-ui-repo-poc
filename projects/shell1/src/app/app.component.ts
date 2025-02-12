import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root', // Component selector
  standalone: true, // Indicates that this component is standalone
  imports: [RouterOutlet, RouterLink], // Imported modules
  templateUrl: './app.component.html', // Template URL
  styleUrl: './app.component.scss' // Style URL
})
export class AppComponent implements OnInit {
  title = 'shell1'; // Component title

  // Inject KeycloakService
  keyclockser = inject(KeycloakService);

  // Lifecycle hook that is called after the component is initialized
  ngOnInit(): void {
    initFlowbite(); // Initialize Flowbite
  }

  // Method to log out using KeycloakService
  logout = () => {
    this.keyclockser.logout();
  }
}