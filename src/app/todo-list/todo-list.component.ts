import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../interfaces/task';
import { TodoService } from '../services/todo.service';
import { retry, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, FontAwesomeModule, NgxSpinnerModule, ToastrModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  newTask: string = '';
  filter: string = 'All';
  tasks = signal<Task[]>([]);
  allTasks = signal<Task[]>([]);
  faTimes = faTimes;
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private todoService = inject(TodoService);
  private spinner = inject(NgxSpinnerService);
  private toastr = inject(ToastrService);

  constructor() {
    this.getTasks();
  }

  addTask() {
    if (this.newTask.trim()) {
      var task: Task = {
        name: this.newTask.trim(),
        isCompleted: false,
        id: undefined
      };
      this.spinner.show();
      this.todoService.create(task).pipe(
        catchError(err => {
          this.error.set('Error creating task');
          this.toastr.error('Error creating task');
          this.spinner.hide();
          return of(null);
        })
      ).subscribe(res => {
        this.error.set(null);
        this.spinner.hide();
        this.toastr.success('Task created successfully');
        this.getTasks();
      });
      this.newTask = '';
    }
  }

  removeTask(task: Task) {
    if (!task.id) {
      return;
    }
    this.spinner.show();
    this.todoService.delete(task.id.toString()).pipe(
      catchError(err => {
        this.error.set('Error deleting task');
        this.toastr.error('Error deleting task');
        this.spinner.hide();
        return of(null);
      })
    ).subscribe(res => {
      this.error.set(null);
      this.spinner.hide();
      this.toastr.success('Task deleted successfully');
      this.getTasks();
    });
  }

  filterTasks() {
    if (this.filter === 'Completed') {
      this.getAllTasks();
      this.tasks.set(this.tasks().filter(t => t.isCompleted));
      console.log(this.tasks());

    } else if (this.filter === 'Uncompleted') {
      this.getAllTasks();
      this.tasks.set(this.tasks().filter(t => !t.isCompleted));
      console.log(this.tasks());

    } else {
      this.tasks.set(this.getAllTasks());
    }
  }
  getAllTasks(): Task[] {
    this.tasks.set(this.allTasks());
    return this.tasks();
  }

  toggleTask(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.spinner.show();
    this.todoService.update(task).pipe(
      catchError(err => {
        this.error.set('Error updating task');
        this.toastr.error('Error updating task');
        this.spinner.hide();
        return of(null);
      })
    ).subscribe(res => {
      this.error.set(null);
      this.spinner.hide();
      this.toastr.success('Task updated successfully');
      console.log(res);
    });
  }

  getTasks() {
    this.spinner.show();
    this.todoService.getAll().pipe(
      catchError(err => {
        this.error.set('Error fetching tasks');
        this.toastr.error('Error fetching tasks');
        this.spinner.hide();
        return of({ result: [] });
      })
    ).subscribe(res => {
      this.error.set(null);
      this.spinner.hide();
      this.allTasks.set(res.result as Task[]);
      this.tasks.set(res.result as Task[]);

    });
  }
}
