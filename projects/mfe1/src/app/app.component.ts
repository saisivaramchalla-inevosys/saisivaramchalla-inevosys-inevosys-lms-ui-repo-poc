import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

/**
 * The root component of the application.
 * 
 * @selector app-root
 * @standalone true
 * @imports RouterOutlet, RouterLink
 * @templateUrl ./app.component.html
 * @styleUrl ./app.component.scss
 * 
 * @class AppComponent
 * @classdesc This component serves as the main entry point for the mfe1 application.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // The title of the application
  title = 'mfe1';
}
