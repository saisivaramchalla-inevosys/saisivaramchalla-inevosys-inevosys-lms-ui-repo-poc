// projects/mfe1/src/app/app.component.ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { RouterLink } from "@angular/router";
import * as i0 from "@angular/core";
var AppComponent = class _AppComponent {
  // The title of the application
  title = "mfe1";
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [i0.\u0275\u0275StandaloneFeature], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "h1");
      i0.\u0275\u0275text(1, "Microfrontend - 1");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275element(2, "router-outlet");
    }
  }, dependencies: [RouterOutlet] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "projects/mfe1/src/app/app.component.ts", lineNumber: 24 });
})();
export {
  AppComponent
};
//# sourceMappingURL=MfeComponent.js.map
