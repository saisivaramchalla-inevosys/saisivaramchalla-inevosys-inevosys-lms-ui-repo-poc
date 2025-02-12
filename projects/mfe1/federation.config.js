// Import necessary functions from the native federation config
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

// Export the module configuration using withNativeFederation
module.exports = withNativeFederation({
  // Name of the module federation
  name: 'mfe1',

  // Expose components and routes for other modules to consume
  exposes: {
    './MfeComponent': 'projects/mfe1/src/app/app.component.ts',
    './routes': 'projects/mfe1/src/app/app.routes.ts',
  },

  // Share all dependencies with singleton and strict versioning
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  // Skip certain packages that are not needed at runtime
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
  
});