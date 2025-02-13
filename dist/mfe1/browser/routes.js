// projects/mfe1/src/app/app.routes.ts
var routes = [
  {
    // Route for the flight search component
    path: "flightsearch",
    loadComponent: () => import("./flight-search.component-KGKTE2DD.js").then((c) => c.FlightSearchComponent)
  },
  {
    // Route for the flight packages component
    path: "holiday",
    loadComponent: () => import("./flight-packages.component-76BQKKFL.js").then((c) => c.FlightPackagesComponent)
  }
];
export {
  routes
};
//# sourceMappingURL=routes.js.map
