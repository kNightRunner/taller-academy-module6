# Claude Code project context

## Purpose and consumers
This public, synthetic TypeScript demo illustrates a request-scoped data-reuse pattern for GraphQL resolver logic. A GraphQL client may request the same entity more than once; the example prevents duplicate gateway calls during a single request. It is not connected to a client project or production service.

## Exact commands
- Install: `npm install`
- Build: `npm run build`
- All tests: `npm test`
- Single test file: `npm run test:single`
- Lint: `npm run lint`
- Start the local demo: `npm run start:dev`

## Conventions
- TypeScript strict mode is mandatory; no implicit `any`.
- Resolver core delegates to a service; gateway interfaces isolate data access.
- Failures propagate as errors; do not silently turn exceptions into `null`.
- `null` represents an explicitly missing entity, not a transport failure.
- Preserve input ordering and duplicated output entities, even when backend fetches are deduplicated.
- Avoid logging payloads or secrets. Never add real customer data.
- Add tests for changed behavior, including concurrent reads and failures.

## Architecture boundaries
- `src/task-resolver.ts` calls `TaskService`; it must not call the external gateway directly.
- `src/task-service.ts` owns request-local cache and accesses the `TaskGateway` interface.
- This is a framework-agnostic core for learning, not a deployed NestJS server. Do not introduce NestJS infrastructure unless the task explicitly requires it.
- New `TaskService` instances must be created per GraphQL request. Do not register this service as a shared singleton in a real application.

## Do not touch without approval
- Do not change the task response shape (`id`, `title`): downstream callers may depend on it.
- Do not add process-global or cross-request caches: they can leak user-specific data.
- Do not alter `package.json`, test configuration, or dependencies during an unrelated resolver change.
- Do not commit `.env` files, credentials, internal hostnames, tickets, or external client material.
- Do not edit generated `dist/` files; they are build artifacts.

## Recorded decisions
1. We chose request-scoped caching over a global cache because results must not escape request boundaries.
2. We chose caching in-flight Promises over caching only resolved values because concurrent duplicate requests should share one fetch.
3. We chose deleting failed requests from the cache over retaining rejected Promises because transient failures must remain retryable.
4. We chose preserving output multiplicity and order over removing duplicate inputs because API consumers expect the original list shape.
5. We chose a framework-agnostic resolver core over a full application shell because the exercise focuses on a reviewable technical behavior and unit tests.

## Agent workflow
First explore and explain current behavior without edits. Then propose a minimal plan, stating constraints and test cases. Only after the plan is reviewed may you change code, in small diffs. Never claim tests ran unless command output confirms it. See `docs/AGENT_WORKFLOW.md` and `docs/VERIFICATION_CHECKLIST.md`.
