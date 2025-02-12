import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  constructor() { }

  // BehaviorSubject to hold the list of users
  private usersSubject = new BehaviorSubject<any[]>([]);

  // Observable to expose the list of users
  users$ = this.usersSubject.asObservable();

  // Method to add a new user to the list
  addUser(user: any) {
    // Get the current list of users
    const currentUsers = this.usersSubject.value;
    // Add the new user to the list and emit the updated list
    this.usersSubject.next([...currentUsers, user]);
  }
}
