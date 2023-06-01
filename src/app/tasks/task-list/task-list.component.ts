import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private taskService: TasksService
  ) { }

  ngOnInit() {
    this.taskService.getAll().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onTaskDeleted(task: Task) {
    if (task) {
      const index = this.tasks.findIndex((taskItem) => taskItem._id === task._id);
      this.tasks.splice(index, 1);
    }
  }

}
