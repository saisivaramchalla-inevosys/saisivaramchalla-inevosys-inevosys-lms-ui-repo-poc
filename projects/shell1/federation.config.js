// Import the necessary functions from the '@angular-architects/native-federation/config' package
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

// Export the configuration using the withNativeFederation function
module.exports = withNativeFederation({

  // Define shared dependencies with specific options
  shared: {
    // Share all dependencies with singleton, strict version, and auto required version
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  // List of packages to skip (not needed at runtime)
  skip: [
    'rxjs/ajax',       // Skip rxjs/ajax package
    'rxjs/fetch',      // Skip rxjs/fetch package
    'rxjs/testing',    // Skip rxjs/testing package
    'rxjs/webSocket',  // Skip rxjs/webSocket package
    // Add further packages you don't need at runtime
  ]

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
  
});
