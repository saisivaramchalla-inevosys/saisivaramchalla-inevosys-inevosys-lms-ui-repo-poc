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
  static \u0275fac = function TranslateHttpLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslateHttpLoader)(i0.\u0275\u0275inject(i1.HttpClient), i0.\u0275\u0275inject(String), i0.\u0275\u0275inject(String));
  };
  static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({
    token: _TranslateHttpLoader,
    factory: _TranslateHttpLoader.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(TranslateHttpLoader, [{
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
export {
  TranslateHttpLoader
};
//# sourceMappingURL=_ngx_translate_http_loader.g3pFVpNv2F-dev.js.map
