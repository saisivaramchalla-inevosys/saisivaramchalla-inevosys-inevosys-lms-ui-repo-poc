import {
  StateManagementService
} from "./chunk-KG5T3L6K.js";

// projects/admin1/src/app/components/user-management/user-management.component.ts
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function UserManagementComponent_li_3_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "li");
    i0.\u0275\u0275text(1);
    i0.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r1 = ctx.$implicit;
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate2(" Name: ", user_r1.firstname, " ", user_r1.secondname, " ");
  }
}
var UserManagementComponent = class _UserManagementComponent {
  // Array to hold user data
  userData = [];
  // Injecting the StateManagementService
  state = inject(StateManagementService);
  constructor() {
    this.state.users$.subscribe((data) => {
      console.log(data);
      this.userData = data;
    });
  }
  static \u0275fac = function UserManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _UserManagementComponent, selectors: [["app-user-management"]], standalone: true, features: [i0.\u0275\u0275StandaloneFeature], decls: 4, vars: 1, consts: [[4, "ngFor", "ngForOf"]], template: function UserManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "p");
      i0.\u0275\u0275text(1, "user-management works!");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(2, "ul");
      i0.\u0275\u0275template(3, UserManagementComponent_li_3_Template, 2, 2, "li", 0);
      i0.\u0275\u0275elementEnd();
    }
    if (rf & 2) {
      i0.\u0275\u0275advance(3);
      i0.\u0275\u0275property("ngForOf", ctx.userData);
    }
  }, dependencies: [CommonModule, i1.NgForOf] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(UserManagementComponent, { className: "UserManagementComponent", filePath: "projects/admin1/src/app/components/user-management/user-management.component.ts", lineNumber: 12 });
})();
export {
  UserManagementComponent
};
//# sourceMappingURL=user-management.component-EUBJ62AX.js.map
