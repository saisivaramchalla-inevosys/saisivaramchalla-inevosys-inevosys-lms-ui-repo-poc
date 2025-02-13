// projects/admin1/src/app/components/services/state-management.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
var StateManagementService = class _StateManagementService {
  constructor() {
  }
  // BehaviorSubject to hold the list of users
  usersSubject = new BehaviorSubject([]);
  // Observable to expose the list of users
  users$ = this.usersSubject.asObservable();
  // Method to add a new user to the list
  addUser(user) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }
  static \u0275fac = function StateManagementService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StateManagementService)();
  };
  static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({ token: _StateManagementService, factory: _StateManagementService.\u0275fac, providedIn: "root" });
};

export {
  StateManagementService
};
//# sourceMappingURL=chunk-KG5T3L6K.js.map
