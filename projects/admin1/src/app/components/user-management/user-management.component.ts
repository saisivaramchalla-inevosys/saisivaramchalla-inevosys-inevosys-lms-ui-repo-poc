import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateManagementService } from '../services/state-management.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  // Array to hold user data
  userData: any[] = [];

  // Injecting the StateManagementService
  private state = inject(StateManagementService);

  constructor() {
    // Subscribing to the users$ observable to get user data
    this.state.users$.subscribe(data => {
      console.log(data);
      this.userData = data;
    });
  }
}
