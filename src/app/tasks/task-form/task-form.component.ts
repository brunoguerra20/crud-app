import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../shared/task';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = new Task();
  title = 'Nova Tarefa';

  constructor(
    private taskService: TasksService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log()
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getById(id).subscribe(task => {
        this.task = task;
        this.title = 'Alterando a Tarefa';
      });
    }
  }

  onSubmit() {
    this.taskService.save(this.task).subscribe(() => {
      this.router.navigate(['']);
    })
  }

}
