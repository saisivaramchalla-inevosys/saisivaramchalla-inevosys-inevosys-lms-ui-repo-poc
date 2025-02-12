import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

/**
 * Factory function to create a new TranslateHttpLoader instance.
 * @param http - The HttpClient instance used to make HTTP requests.
 * @returns A new TranslateHttpLoader instance configured to load translation files from the './assets/i18n/' directory with a '.json' extension.
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
