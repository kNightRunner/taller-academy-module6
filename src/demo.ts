import { TaskGateway, TaskService } from './task-service';
import { TaskResolver } from './task-resolver';

async function main(): Promise<void> {
  let calls = 0;
  const gateway: TaskGateway = {
    async fetchById(id) {
      calls += 1;
      return { id, title: `Example task ${id}` };
    }
  };
  const resolver = new TaskResolver(new TaskService(gateway));
  const result = await resolver.tasks(['a', 'a', 'b']);
  console.log(JSON.stringify({ result, backendCalls: calls }, null, 2));
}
void main();
