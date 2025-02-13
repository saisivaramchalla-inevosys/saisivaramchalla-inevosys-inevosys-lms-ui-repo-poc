// node_modules/@ngx-translate/http-loader/fesm2022/ngx-translate-http-loader.mjs
import * as i0 from "@angular/core";
import { Injectable, Inject } from "@angular/core";
import * as i1 from "@angular/common/http";
var TranslateHttpLoader = class _TranslateHttpLoader {
  http;
  prefix;
  suffix;
  constructor(http, prefix = "/assets/i18n/", suffix = ".json") {
    this.http = http;
    this.prefix = prefix;
    this.suffix = suffix;
  }
  /**
   * Gets the translations from the server
   */
  getTranslation(lang) {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
  static ɵfac = function TranslateHttpLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslateHttpLoader)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(String), i0.ɵɵinject(String));
  };
  static ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
    token: _TranslateHttpLoader,
    factory: _TranslateHttpLoader.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TranslateHttpLoader, [{
    type: Injectable
  }], () => [{
    type: i1.HttpClient
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [String]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [String]
    }]
  }], null);
})();
export { TranslateHttpLoader };