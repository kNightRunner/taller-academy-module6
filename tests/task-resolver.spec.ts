import { TaskGateway, TaskService } from '../src/task-service';
import { TaskResolver } from '../src/task-resolver';

function createHarness(fetchById: TaskGateway['fetchById']) {
  const gateway: TaskGateway = { fetchById: jest.fn(fetchById) };
  const resolver = new TaskResolver(new TaskService(gateway));
  return { resolver, gateway };
}

describe('request-scoped GraphQL data reuse', () => {
  it('fetches duplicate ids only once per request', async () => {
    const { resolver, gateway } = createHarness(async (id) => ({ id, title: id }));
    const tasks = await resolver.tasks(['a', 'a', 'b']);
    expect(tasks.map((task) => task?.id)).toEqual(['a', 'a', 'b']);
    expect(gateway.fetchById).toHaveBeenCalledTimes(2);
  });

  it('deduplicates concurrent calls for the same id', async () => {
    const { resolver, gateway } = createHarness(async (id) => ({ id, title: 'ok' }));
    await Promise.all([resolver.task('a'), resolver.task('a')]);
    expect(gateway.fetchById).toHaveBeenCalledTimes(1);
  });

  it('preserves null behavior for absent tasks', async () => {
    const { resolver } = createHarness(async () => null);
    expect(await resolver.task('missing')).toBeNull();
  });

  it('does not cache a failure permanently within the request', async () => {
    let attempts = 0;
    const { resolver } = createHarness(async (id) => {
      attempts += 1;
      if (attempts === 1) throw new Error('temporary failure');
      return { id, title: 'recovered' };
    });
    await expect(resolver.task('a')).rejects.toThrow('temporary failure');
    await expect(resolver.task('a')).resolves.toMatchObject({ id: 'a' });
    expect(attempts).toBe(2);
  });

  it('does not share cached results across requests', async () => {
    const fetch = jest.fn(async (id: string) => ({ id, title: id }));
    const first = new TaskResolver(new TaskService({ fetchById: fetch }));
    const second = new TaskResolver(new TaskService({ fetchById: fetch }));
    await first.task('a');
    await second.task('a');
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
