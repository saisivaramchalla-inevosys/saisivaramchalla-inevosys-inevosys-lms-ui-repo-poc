var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = value => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = value => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = x => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/keycloak-angular/fesm2022/keycloak-angular.mjs
import * as i0 from "@angular/core";
import { Injectable, NgModule } from "@angular/core";
import { HttpHeaders, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Subject, from, combineLatest, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import Keycloak from "keycloak-js";
import { CommonModule } from "@angular/common";
var KeycloakEventType;
(function (KeycloakEventType2) {
  KeycloakEventType2[KeycloakEventType2["OnAuthError"] = 0] = "OnAuthError";
  KeycloakEventType2[KeycloakEventType2["OnAuthLogout"] = 1] = "OnAuthLogout";
  KeycloakEventType2[KeycloakEventType2["OnAuthRefreshError"] = 2] = "OnAuthRefreshError";
  KeycloakEventType2[KeycloakEventType2["OnAuthRefreshSuccess"] = 3] = "OnAuthRefreshSuccess";
  KeycloakEventType2[KeycloakEventType2["OnAuthSuccess"] = 4] = "OnAuthSuccess";
  KeycloakEventType2[KeycloakEventType2["OnReady"] = 5] = "OnReady";
  KeycloakEventType2[KeycloakEventType2["OnTokenExpired"] = 6] = "OnTokenExpired";
  KeycloakEventType2[KeycloakEventType2["OnActionUpdate"] = 7] = "OnActionUpdate";
})(KeycloakEventType || (KeycloakEventType = {}));
var KeycloakAuthGuard = class {
  constructor(router, keycloakAngular) {
    this.router = router;
    this.keycloakAngular = keycloakAngular;
  }
  canActivate(route, state) {
    return __async(this, null, function* () {
      try {
        this.authenticated = yield this.keycloakAngular.isLoggedIn();
        this.roles = yield this.keycloakAngular.getUserRoles(true);
        return yield this.isAccessAllowed(route, state);
      } catch (error) {
        throw new Error("An error happened during access validation. Details:" + error);
      }
    });
  }
};
var KeycloakService = class _KeycloakService {
  constructor() {
    this._keycloakEvents$ = new Subject();
  }
  bindsKeycloakEvents() {
    this._instance.onAuthError = errorData => {
      this._keycloakEvents$.next({
        args: errorData,
        type: KeycloakEventType.OnAuthError
      });
    };
    this._instance.onAuthLogout = () => {
      this._keycloakEvents$.next({
        type: KeycloakEventType.OnAuthLogout
      });
    };
    this._instance.onAuthRefreshSuccess = () => {
      this._keycloakEvents$.next({
        type: KeycloakEventType.OnAuthRefreshSuccess
      });
    };
    this._instance.onAuthRefreshError = () => {
      this._keycloakEvents$.next({
        type: KeycloakEventType.OnAuthRefreshError
      });
    };
    this._instance.onAuthSuccess = () => {
      this._keycloakEvents$.next({
        type: KeycloakEventType.OnAuthSuccess
      });
    };
    this._instance.onTokenExpired = () => {
      this._keycloakEvents$.next({
        type: KeycloakEventType.OnTokenExpired
      });
    };
    this._instance.onActionUpdate = state => {
      this._keycloakEvents$.next({
        args: state,
        type: KeycloakEventType.OnActionUpdate
      });
    };
    this._instance.onReady = authenticated => {
      this._keycloakEvents$.next({
        args: authenticated,
        type: KeycloakEventType.OnReady
      });
    };
  }
  loadExcludedUrls(bearerExcludedUrls) {
    const excludedUrls = [];
    for (const item of bearerExcludedUrls) {
      let excludedUrl;
      if (typeof item === "string") {
        excludedUrl = {
          urlPattern: new RegExp(item, "i"),
          httpMethods: []
        };
      } else {
        excludedUrl = {
          urlPattern: new RegExp(item.url, "i"),
          httpMethods: item.httpMethods
        };
      }
      excludedUrls.push(excludedUrl);
    }
    return excludedUrls;
  }
  initServiceValues({
    enableBearerInterceptor = true,
    loadUserProfileAtStartUp = false,
    bearerExcludedUrls = [],
    authorizationHeaderName = "Authorization",
    bearerPrefix = "Bearer",
    initOptions,
    updateMinValidity = 20,
    shouldAddToken = () => true,
    shouldUpdateToken = () => true
  }) {
    this._enableBearerInterceptor = enableBearerInterceptor;
    this._loadUserProfileAtStartUp = loadUserProfileAtStartUp;
    this._authorizationHeaderName = authorizationHeaderName;
    this._bearerPrefix = bearerPrefix.trim().concat(" ");
    this._excludedUrls = this.loadExcludedUrls(bearerExcludedUrls);
    this._silentRefresh = initOptions ? initOptions.flow === "implicit" : false;
    this._updateMinValidity = updateMinValidity;
    this.shouldAddToken = shouldAddToken;
    this.shouldUpdateToken = shouldUpdateToken;
  }
  init() {
    return __async(this, arguments, function* (options = {}) {
      this.initServiceValues(options);
      const {
        config,
        initOptions
      } = options;
      this._instance = new Keycloak(config);
      this.bindsKeycloakEvents();
      const authenticated = yield this._instance.init(initOptions);
      if (authenticated && this._loadUserProfileAtStartUp) {
        yield this.loadUserProfile();
      }
      return authenticated;
    });
  }
  login() {
    return __async(this, arguments, function* (options = {}) {
      yield this._instance.login(options);
      if (this._loadUserProfileAtStartUp) {
        yield this.loadUserProfile();
      }
    });
  }
  logout(redirectUri) {
    return __async(this, null, function* () {
      const options = {
        redirectUri
      };
      yield this._instance.logout(options);
      this._userProfile = void 0;
    });
  }
  register() {
    return __async(this, arguments, function* (options = {
      action: "register"
    }) {
      yield this._instance.register(options);
    });
  }
  isUserInRole(role, resource) {
    let hasRole;
    hasRole = this._instance.hasResourceRole(role, resource);
    if (!hasRole) {
      hasRole = this._instance.hasRealmRole(role);
    }
    return hasRole;
  }
  getUserRoles(realmRoles = true, resource) {
    let roles = [];
    if (this._instance.resourceAccess) {
      Object.keys(this._instance.resourceAccess).forEach(key => {
        if (resource && resource !== key) {
          return;
        }
        const resourceAccess = this._instance.resourceAccess[key];
        const clientRoles = resourceAccess["roles"] || [];
        roles = roles.concat(clientRoles);
      });
    }
    if (realmRoles && this._instance.realmAccess) {
      const realmRoles2 = this._instance.realmAccess["roles"] || [];
      roles.push(...realmRoles2);
    }
    return roles;
  }
  isLoggedIn() {
    if (!this._instance) {
      return false;
    }
    return this._instance.authenticated;
  }
  isTokenExpired(minValidity = 0) {
    return this._instance.isTokenExpired(minValidity);
  }
  updateToken() {
    return __async(this, arguments, function* (minValidity = this._updateMinValidity) {
      if (this._silentRefresh) {
        if (this.isTokenExpired()) {
          throw new Error("Failed to refresh the token, or the session is expired");
        }
        return true;
      }
      if (!this._instance) {
        throw new Error("Keycloak Angular library is not initialized.");
      }
      try {
        return yield this._instance.updateToken(minValidity);
      } catch (error) {
        return false;
      }
    });
  }
  loadUserProfile(forceReload = false) {
    return __async(this, null, function* () {
      if (this._userProfile && !forceReload) {
        return this._userProfile;
      }
      if (!this._instance.authenticated) {
        throw new Error("The user profile was not loaded as the user is not logged in.");
      }
      return this._userProfile = yield this._instance.loadUserProfile();
    });
  }
  getToken() {
    return __async(this, null, function* () {
      return this._instance.token;
    });
  }
  getUsername() {
    if (!this._userProfile) {
      throw new Error("User not logged in or user profile was not loaded.");
    }
    return this._userProfile.username;
  }
  clearToken() {
    this._instance.clearToken();
  }
  addTokenToHeader(headers = new HttpHeaders()) {
    return from(this.getToken()).pipe(map(token => token ? headers.set(this._authorizationHeaderName, this._bearerPrefix + token) : headers));
  }
  getKeycloakInstance() {
    return this._instance;
  }
  get excludedUrls() {
    return this._excludedUrls;
  }
  get enableBearerInterceptor() {
    return this._enableBearerInterceptor;
  }
  get keycloakEvents$() {
    return this._keycloakEvents$;
  }
  static {
    this.ɵfac = function KeycloakService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _KeycloakService)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
      token: _KeycloakService,
      factory: _KeycloakService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KeycloakService, [{
    type: Injectable
  }], null, null);
})();
var KeycloakBearerInterceptor = class _KeycloakBearerInterceptor {
  constructor(keycloak) {
    this.keycloak = keycloak;
  }
  conditionallyUpdateToken(req) {
    return __async(this, null, function* () {
      if (this.keycloak.shouldUpdateToken(req)) {
        return yield this.keycloak.updateToken();
      }
      return true;
    });
  }
  isUrlExcluded({
    method,
    url
  }, {
    urlPattern,
    httpMethods
  }) {
    const httpTest = httpMethods.length === 0 || httpMethods.join().indexOf(method.toUpperCase()) > -1;
    const urlTest = urlPattern.test(url);
    return httpTest && urlTest;
  }
  intercept(req, next) {
    const {
      enableBearerInterceptor,
      excludedUrls
    } = this.keycloak;
    if (!enableBearerInterceptor) {
      return next.handle(req);
    }
    const shallPass = !this.keycloak.shouldAddToken(req) || excludedUrls.findIndex(item => this.isUrlExcluded(req, item)) > -1;
    if (shallPass) {
      return next.handle(req);
    }
    return combineLatest([from(this.conditionallyUpdateToken(req)), of(this.keycloak.isLoggedIn())]).pipe(mergeMap(([_, isLoggedIn]) => isLoggedIn ? this.handleRequestWithTokenHeader(req, next) : next.handle(req)));
  }
  handleRequestWithTokenHeader(req, next) {
    return this.keycloak.addTokenToHeader(req.headers).pipe(mergeMap(headersWithBearer => {
      const kcReq = req.clone({
        headers: headersWithBearer
      });
      return next.handle(kcReq);
    }));
  }
  static {
    this.ɵfac = function KeycloakBearerInterceptor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _KeycloakBearerInterceptor)(i0.ɵɵinject(KeycloakService));
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
      token: _KeycloakBearerInterceptor,
      factory: _KeycloakBearerInterceptor.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KeycloakBearerInterceptor, [{
    type: Injectable
  }], () => [{
    type: KeycloakService
  }], null);
})();
var CoreModule = class _CoreModule {
  static {
    this.ɵfac = function CoreModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CoreModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
      type: _CoreModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
      providers: [KeycloakService, {
        provide: HTTP_INTERCEPTORS,
        useClass: KeycloakBearerInterceptor,
        multi: true
      }],
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CoreModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      providers: [KeycloakService, {
        provide: HTTP_INTERCEPTORS,
        useClass: KeycloakBearerInterceptor,
        multi: true
      }]
    }]
  }], null, null);
})();
var KeycloakAngularModule = class _KeycloakAngularModule {
  static {
    this.ɵfac = function KeycloakAngularModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _KeycloakAngularModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
      type: _KeycloakAngularModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
      imports: [CoreModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KeycloakAngularModule, [{
    type: NgModule,
    args: [{
      imports: [CoreModule]
    }]
  }], null, null);
})();
export { CoreModule, KeycloakAngularModule, KeycloakAuthGuard, KeycloakBearerInterceptor, KeycloakEventType, KeycloakService };