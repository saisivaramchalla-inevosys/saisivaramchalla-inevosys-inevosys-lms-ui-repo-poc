import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  title = 'shell1';
  keyclockser = inject(KeycloakService);
  ngOnInit(): void {
    initFlowbite();
  }
  logout = ()=>{
    this.keyclockser.logout();
  }
}