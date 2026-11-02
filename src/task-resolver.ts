import { Task, TaskService } from './task-service';

/** Framework-agnostic resolver core; can be adapted to NestJS GraphQL. */
export class TaskResolver {
  constructor(private readonly service: TaskService) {}

  async task(id: string): Promise<Task | null> {
    return this.service.getTask(id);
  }

  async tasks(ids: string[]): Promise<Array<Task | null>> {
    return Promise.all(ids.map((id) => this.service.getTask(id)));
  }
}
