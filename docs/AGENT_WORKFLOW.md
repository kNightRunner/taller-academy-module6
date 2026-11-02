# Exercise 2 — Explore → Plan → Build

**Task:** Avoid redundant backend calls for repeated task IDs while preserving GraphQL-visible behavior.

**Status:** Demonstration implementation and planned Claude Code workflow. The learner reports prior experience with this process, but no fresh Claude Code session transcript has been supplied for this public repository. The prompts below are reproducible; they are not fabricated quotations from a session.

## Explore — read without modifying

Prompt to start in a fresh Claude Code session:

> Read `CLAUDE.md`, `src/task-service.ts`, `src/task-resolver.ts`, and `tests/task-resolver.spec.ts`. Do not edit anything. Explain how repeated and concurrent task IDs reach the gateway, where data is cached, and what happens on missing entities and failures. Identify constraints and any possible risks of registering the service as a singleton.

**Review gates:** Does the explanation mention request scope, in-flight Promise reuse, rejection eviction, list ordering, and avoiding cross-request leakage? If not, correct the context file rather than providing a one-off chat correction.

**What exploring should prevent:** Mistaking the cache for a global optimization, which could introduce data isolation or stale-data problems. **Actual observed misses in this new session:** Not recorded yet.

## Plan — approach before code

Prompt:

> Propose a minimal plan to make duplicate task reads share the same in-flight fetch within a GraphQL request. Do not change files yet. Keep output shape and order, cache `null` results for this request, evict failures, and make fresh requests independent. List risks, files to change, and edge cases that would verify the plan.

**Plan-review checkpoints:** Scope restricted to service/resolver/test changes; no schema or dependency changes; tests should include duplicate IDs, concurrency, null, failure-retry, and request isolation.

**Potential plan error detected by design review:** A global cache would cause cross-request state sharing. The plan explicitly forbids this. **Actual agent plan mistake:** Not recorded yet.

## Build — small reviewable changes

Prompt:

> Implement the approved plan in the smallest reviewable changes. Start with the service, then add tests. Show the complete diff. Do not modify API shape or packages. Run build, tests, and lint; report the command output and any failures without claiming success you did not verify.

**Present repository implementation:** `src/task-service.ts` deduplicates in-flight and completed requests; `src/task-resolver.ts` preserves list shape; `tests/task-resolver.spec.ts` covers the specified cases. These files are the demonstration artifact, not proof that Claude Code executed the prompts.

## Three-line reflection (fill with actual observation after running Claude Code)

- **Explore saved time by:** _Pending a recorded fresh-session observation._
- **Plan caught:** _Pending actual plan review; the documented global-cache risk is a design concern, not a reported AI mistake._
- **Compared to my usual workflow:** _Not measured; do not invent a time saving._

## Context file experiment (Exercise 1)

1. Open a fresh Claude Code session in the project root.
2. Ask: `Explain how this repository should handle duplicate task IDs and what files you must not change.` Do not restate the rules from `CLAUDE.md`.
3. Compare the reply against the decisions and boundaries in `CLAUDE.md`.
4. Record the observed behavior in the reflection above and adjust `CLAUDE.md` if any rule was missed.
5. Propose the context file as a shared asset only where authorized.

**Status:** Context file committed in this deliverable; the fresh-session behavior comparison has not been independently performed here.
