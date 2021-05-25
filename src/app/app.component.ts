import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { slideInAnimation } from 'src/animations/slideInAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // animations: [
  //   slideInAnimation
  // ]
})
export class AppComponent {
  title = 'angular-cms';

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  // }
}
