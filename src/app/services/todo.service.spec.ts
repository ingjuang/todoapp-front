import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Task } from '../../interfaces/task';
import { environment } from '../../environments/environment';
import { PetitionResponse } from '../../interfaces/petitionResponse';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tasks', () => {
    const dummyTasks: Task[] = [
      { id: 1, name: 'Task 1', isCompleted: false },
      { id: 2, name: 'Task 2', isCompleted: true }
    ];
    const response: PetitionResponse = { result: dummyTasks, message: 'Success', success: true };

    service.getAll().subscribe(res => {
      const resp: Task[] = res.result as Task[];
      expect(resp.length).toBe(2);
      expect(res.result).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/Task`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should create a new task', () => {
    const newTask: Task = { id: 3, name: 'Task 3', isCompleted: false };
    const response: PetitionResponse = { result: newTask, message: 'Created', success: true };

    service.create(newTask).subscribe(res => {
      expect(res.result).toEqual(newTask);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/Task`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should update a task', () => {
    const updatedTask: Task = { id: 1, name: 'Updated Task', isCompleted: true };
    const response: PetitionResponse = { result: updatedTask, message: 'Updated', success: true };

    service.update(updatedTask).subscribe(res => {
      expect(res.result).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/Task`);
    expect(req.request.method).toBe('PUT');
    req.flush(response);
  });

  it('should delete a task', () => {
    const taskId = 1;
    const response: PetitionResponse = { result: {}, message: 'Deleted', success: true };

    service.delete(taskId.toString()).subscribe(res => {
      expect(res.result).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/Task/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(response);
  });
});
