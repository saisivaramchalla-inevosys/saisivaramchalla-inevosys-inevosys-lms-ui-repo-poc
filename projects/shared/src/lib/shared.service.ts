import { Injectable } from '@angular/core';

// This decorator marks the class as one that participates in the dependency injection system
@Injectable({
  providedIn: 'root' // This specifies that the service should be provided at the root level
})
export class SharedService {

  // Constructor for the SharedService class
  constructor() { }
}
