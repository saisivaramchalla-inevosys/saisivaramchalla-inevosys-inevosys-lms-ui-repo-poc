const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

// Export the module configuration using withNativeFederation
module.exports = withNativeFederation({

  // Define shared dependencies
  shared: {
    // Share all dependencies with singleton and strict versioning
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
