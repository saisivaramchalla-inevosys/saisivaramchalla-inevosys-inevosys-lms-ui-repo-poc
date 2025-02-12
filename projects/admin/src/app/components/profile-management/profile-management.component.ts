import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateManagementService } from '../services/state-management.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss'],
})
export class ProfileManagementComponent {
  firstname: string = ''; // Holds the first name of the user
  secondname: string = ''; // Holds the second name of the user
  userData: any[] = []; // Array to store user data

  // Injecting StateManagementService to manage state
  private state = inject(StateManagementService);
  // Injecting Router to navigate between routes
  private route = inject(Router);

  constructor() {
    // Subscribing to the users$ observable to get user data
    this.state.users$.subscribe(data => {
      console.log(data);
      this.userData = data;
    });
  }

  // Method to submit user data
  SubmitData = () => {
    const data = {
      firstname: this.firstname,
      secondname: this.secondname
    };
    // Adding user data to the state
    this.state.addUser(data);
    // Navigating to the user page
    this.route.navigate(['/admin/user']);
    this.route.navigate(['/user']);
  }
}
