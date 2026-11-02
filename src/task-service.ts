export interface Task { id: string; title: string; }

export interface TaskGateway {
  fetchById(id: string): Promise<Task | null>;
}

/** Request-scoped cache: never share across users or GraphQL requests. */
export class TaskService {
  private readonly cache = new Map<string, Promise<Task | null>>();

  constructor(private readonly gateway: TaskGateway) {}

  getTask(id: string): Promise<Task | null> {
    const existing = this.cache.get(id);
    if (existing) return existing;

    const pending = this.gateway.fetchById(id).catch((error: unknown) => {
      // Failed reads should be retryable within this request.
      this.cache.delete(id);
      throw error;
    });
    this.cache.set(id, pending);
    return pending;
  }
}
