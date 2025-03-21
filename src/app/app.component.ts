import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from "./todo-list/todo-list.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from "./header/header.component";
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoListComponent, FontAwesomeModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-app-front';
}
