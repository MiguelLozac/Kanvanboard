import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName : string = '';
  

  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  addTask() {
    if (this.taskName) {
      let newTask: Task = {name: this.taskName, stage: 0};
      this.tasks.push(newTask);
      this.configureTasksForRendering();
      this.taskName = '';

    }
  }
  onBack(taskName) {
    const index = this.tasks.findIndex(el => el.name === taskName);
    const stage = this.tasks[index].stage;
    if (stage > 0) {
      this.tasks[index].stage--;
      this.configureTasksForRendering();
    }
  }

  onForward(taskName) {
    const index = this.tasks.findIndex(el => el.name === taskName);
    const stage = this.tasks[index].stage;
    if (stage < 3) {
      this.tasks[index].stage++;
      this.configureTasksForRendering();
    }

  }

  onDelete(taskName) {
    const index = this.tasks.findIndex(el => el.name === taskName);
    this.tasks.splice(index,1);
    this.configureTasksForRendering();

  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
    console.log(this.stagesTasks);
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}
