// dist/shared/fesm2022/shared.mjs
import * as i0 from "@angular/core";
import { Injectable, Component } from "@angular/core";
var SharedService = class _SharedService {
  // Constructor for the SharedService class
  constructor() {
  }
  static \u0275fac = function SharedService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedService)();
  };
  static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({
    token: _SharedService,
    factory: _SharedService.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(SharedService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
      // This specifies that the service should be provided at the root level
    }]
  }], () => [], null);
})();
var SharedComponent = class _SharedComponent {
  static \u0275fac = function SharedComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({
    type: _SharedComponent,
    selectors: [["lib-shared"]],
    standalone: true,
    features: [i0.\u0275\u0275StandaloneFeature],
    decls: 2,
    vars: 0,
    template: function SharedComponent_Template(rf, ctx) {
      if (rf & 1) {
        i0.\u0275\u0275elementStart(0, "p");
        i0.\u0275\u0275text(1, " shared works! ");
        i0.\u0275\u0275elementEnd();
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(SharedComponent, [{
    type: Component,
    args: [{
      selector: "lib-shared",
      standalone: true,
      imports: [],
      template: `
    <p>
      shared works!
    </p>
  `
    }]
  }], null, null);
})();
export {
  SharedComponent,
  SharedService
};
//# sourceMappingURL=shared.js.map
