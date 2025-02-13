import {
  StateManagementService
} from "./chunk-KG5T3L6K.js";

// projects/admin1/src/app/components/profile-management/profile-management.component.ts
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function ProfileManagementComponent_li_15_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "li");
    i0.\u0275\u0275text(1);
    i0.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r1 = ctx.$implicit;
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate2(" ", user_r1.firstname, " ", user_r1.secondname, " ");
  }
}
var ProfileManagementComponent = class _ProfileManagementComponent {
  firstname = "";
  // Holds the first name of the user
  secondname = "";
  // Holds the second name of the user
  userData = [];
  // Array to store user data
  // Injecting StateManagementService to manage state
  state = inject(StateManagementService);
  // Injecting Router to navigate between routes
  route = inject(Router);
  constructor() {
    this.state.users$.subscribe((data) => {
      console.log(data);
      this.userData = data;
    });
  }
  // Method to submit user data
  SubmitData = () => {
    const data = {
      firstname: this.firstname,
      secondname: this.secondname
    };
    this.state.addUser(data);
    this.route.navigate(["/admin1/user"]);
    this.route.navigate(["/user"]);
  };
  static \u0275fac = function ProfileManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _ProfileManagementComponent, selectors: [["app-profile-management"]], standalone: true, features: [i0.\u0275\u0275StandaloneFeature], decls: 16, vars: 3, consts: [[1, "text-lg"], [1, "flex", "flex-col", "gap-4", "mb-6", "border-blue-500"], ["for", "first_name", 1, "block", "mb-2", "text-sm", "font-medium", "dark:text-white"], ["type", "text", "id", "first_name", "placeholder", "Username", "required", "", 1, "border", "border-gray-300", "text-sm", "rounded-lg", "focus:ring-blue-500", "focus:border-blue-500", "block", "w-full", "p-2.5", 3, "ngModelChange", "ngModel"], ["for", "second_name", 1, "block", "mb-2", "text-sm", "font-medium", "dark:text-white"], ["type", "text", "id", "second_name", "placeholder", "Password", "required", "", 1, "border", "border-gray-300", "text-sm", "rounded-lg", "focus:ring-blue-500", "focus:border-blue-500", "block", "w-full", "p-2.5", 3, "ngModelChange", "ngModel"], [1, "text-center", "w-100"], ["type", "button", 1, "text-white", "bg-gradient-to-r", "from-blue-500", "via-blue-600", "to-blue-700", "hover:bg-gradient-to-br", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "me-2", "mb-2", 3, "click"], [4, "ngFor", "ngForOf"]], template: function ProfileManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "p", 0);
      i0.\u0275\u0275text(1, "profile-management works!");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(2, "div", 1)(3, "div")(4, "label", 2);
      i0.\u0275\u0275text(5, "First name");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(6, "input", 3);
      i0.\u0275\u0275twoWayListener("ngModelChange", function ProfileManagementComponent_Template_input_ngModelChange_6_listener($event) {
        i0.\u0275\u0275twoWayBindingSet(ctx.firstname, $event) || (ctx.firstname = $event);
        return $event;
      });
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(7, "div")(8, "label", 4);
      i0.\u0275\u0275text(9, "Second Name");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(10, "input", 5);
      i0.\u0275\u0275twoWayListener("ngModelChange", function ProfileManagementComponent_Template_input_ngModelChange_10_listener($event) {
        i0.\u0275\u0275twoWayBindingSet(ctx.secondname, $event) || (ctx.secondname = $event);
        return $event;
      });
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(11, "div", 6)(12, "button", 7);
      i0.\u0275\u0275listener("click", function ProfileManagementComponent_Template_button_click_12_listener() {
        return ctx.SubmitData();
      });
      i0.\u0275\u0275text(13, "Submit");
      i0.\u0275\u0275elementEnd()()();
      i0.\u0275\u0275elementStart(14, "ul");
      i0.\u0275\u0275template(15, ProfileManagementComponent_li_15_Template, 2, 2, "li", 8);
      i0.\u0275\u0275elementEnd();
    }
    if (rf & 2) {
      i0.\u0275\u0275advance(6);
      i0.\u0275\u0275twoWayProperty("ngModel", ctx.firstname);
      i0.\u0275\u0275advance(4);
      i0.\u0275\u0275twoWayProperty("ngModel", ctx.secondname);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275property("ngForOf", ctx.userData);
    }
  }, dependencies: [CommonModule, i1.NgForOf, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.RequiredValidator, i2.NgModel] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(ProfileManagementComponent, { className: "ProfileManagementComponent", filePath: "projects/admin1/src/app/components/profile-management/profile-management.component.ts", lineNumber: 13 });
})();
export {
  ProfileManagementComponent
};
//# sourceMappingURL=profile-management.component-T2ESF5I6.js.map
