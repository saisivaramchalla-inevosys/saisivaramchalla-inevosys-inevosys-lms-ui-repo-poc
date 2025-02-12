import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

// Custom TranslateLoader to load translations from multiple sources
export class MultiTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient, private mfeUrls: string[]) {}

  // Method to get translations for a specific language
  getTranslation(lang: string): Observable<any> {
    // Array of translation requests: one for the shell and one for each microfrontend
    const translationRequests = [
      this.http.get(`./assets/i18n/${lang}.json`), // Shell translations
      ...this.mfeUrls.map(url => {
        console.log(`Fetching from: ${url}/assets/i18n/${lang}.json`);
        return this.http.get(`${url}/assets/i18n/${lang}.json`);
      })
    ];

    // Combine all translation requests into a single observable
    return forkJoin(translationRequests).pipe(
      // Merge all translations into a single object
      map(translationsArray =>
        translationsArray.reduce((acc, translations) => ({
          ...acc,
          ...translations,
        }), {})
      )
    );
  }
}
