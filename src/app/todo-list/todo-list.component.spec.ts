import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoListComponent } from './todo-list.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { TodoService } from '../services/todo.service';
import { of } from 'rxjs';
import { Task } from '../../interfaces/task';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        FontAwesomeModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
        TodoListComponent
      ],
      providers: [TodoService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a task', () => {
    const task: Task = { id: 1, name: 'Test Task', isCompleted: false };
    spyOn(todoService, 'create').and.returnValue(of({ result: task, message: 'Created', success: true }));

    component.newTask = 'Test Task';
    component.addTask();

    expect(todoService.create).toHaveBeenCalledWith(jasmine.objectContaining({ name: 'Test Task' }));
  });

  it('should remove a task', () => {
    const task: Task = { id: 1, name: 'Test Task', isCompleted: false };
    spyOn(todoService, 'delete').and.returnValue(of({ result: {}, message: 'Deleted', success: true }));

    component.tasks.set([task]);
    component.removeTask(task);

    expect(todoService.delete).toHaveBeenCalledWith('1');
  });

  it('should toggle a task', () => {
    const task: Task = { id: 1, name: 'Test Task', isCompleted: false };
    spyOn(todoService, 'update').and.returnValue(of({ result: task, message: 'Updated', success: true }));

    component.tasks.set([task]);
    component.toggleTask(task);

    expect(todoService.update).toHaveBeenCalledWith(jasmine.objectContaining({ isCompleted: true }));
  });

  it('should filter tasks', () => {
    const tasks: Task[] = [
      { id: 1, name: 'Task 1', isCompleted: false },
      { id: 2, name: 'Task 2', isCompleted: true }
    ];
    component.allTasks.set(tasks);

    component.filter = 'Completed';
    component.filterTasks();
    expect(component.tasks().length).toBe(1);
    expect(component.tasks()[0].isCompleted).toBeTrue();

    component.filter = 'Uncompleted';
    component.filterTasks();
    expect(component.tasks().length).toBe(1);
    expect(component.tasks()[0].isCompleted).toBeFalse();

    component.filter = 'All';
    component.filterTasks();
    expect(component.tasks().length).toBe(2);
  });
});
