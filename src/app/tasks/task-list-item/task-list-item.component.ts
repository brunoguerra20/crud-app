import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Task } from '../shared/task';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {

  @Input()
  task: Task = new Task;

  @Output()
  ondDeleteTask = new EventEmitter();

  visibleDialog = false;
  constructor(
    private taskService: TasksService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  confirmDelete(task: Task) {
    this.confirmationService.confirm({
      message: 'Voce deseja realmente deletar?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.remove(task);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Voce aceitou' });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Voce rejeitou' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Voce cancelou' });
            break;
        }
      }
    });
  }

  remove(task: Task) {
    if (task._id) {
      this.taskService.delete(task._id).subscribe(() => {
        this.ondDeleteTask.emit(task);
      })
    }
  }


  onCheckChange(task: Task) {
    this.taskService.save(task).subscribe();
  }

}
