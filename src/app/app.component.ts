import { Component } from '@angular/core';
import { AuthorsComponent } from "./authors/authors.component";

@Component({
   standalone: false, // 👈 force Angular
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent {
  title = 'angrest';
}
