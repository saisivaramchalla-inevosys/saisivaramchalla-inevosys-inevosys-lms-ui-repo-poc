// projects/admin1/src/app/app.routes.ts
var routes = [
  {
    // Route for profile management
    path: "profile",
    loadComponent: () => import("./profile-management.component-DZ57D5LU.js").then((c) => c.ProfileManagementComponent)
  },
  {
    // Route for user management
    path: "user",
    loadComponent: () => import("./user-management.component-EUBJ62AX.js").then((c) => c.UserManagementComponent)
  }
];
export {
  routes
};
//# sourceMappingURL=routes.js.map
