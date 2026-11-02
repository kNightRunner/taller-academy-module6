# Taller Academy — Module 6: Build the Setup

This public repository is a **sanitized, standalone TypeScript demo** for the Module 6 practice lab. It models a GraphQL resolver optimization without accessing any client codebase, endpoint, ticket, or data. The architecture resembles a NestJS service/resolver separation but deliberately does not claim to run a NestJS server.

## Lab deliverables

| Exercise | Artifact | Status |
|---|---|---|
| 1 — Persistent project context | [`CLAUDE.md`](CLAUDE.md) | Written; fresh Claude Code session test pending |
| 2 — Explore → Plan → Build | [`docs/AGENT_WORKFLOW.md`](docs/AGENT_WORKFLOW.md), [`src/`](src/), [`tests/`](tests/) | Reproducible prompts + demonstration implementation; actual Claude Code session evidence pending |
| 3 — Verification checklist | [`docs/VERIFICATION_CHECKLIST.md`](docs/VERIFICATION_CHECKLIST.md) | Written; hands-on application and next 3 PRs pending |

## Problem and approach

A resolver that fetches the same task repeatedly can generate unnecessary requests to its data source. Here, request-local caching shares in-flight work **without changing the response structure**. Each request must create its own service instance. The test suite is designed to cover duplicate IDs, concurrent calls, missing entities, retries after failures, and cross-request isolation.

## Commands

```bash
npm install
npm run build
npm test
npm run test:single
npm run lint
npm run start:dev
```

The commands are defined in `package.json`. **Execution and pass/fail results must be recorded only after they have actually been run.**

## What was done vs. what remains

**Completed as part of this deliverable:** project context file, a working-style resolver/service implementation, explicit unit tests, agent prompts and review gates, and a verification checklist.

**User-confirmed background:** prior deliberate Explore → Plan → Build experience; prior AI-generated-code pitfalls involving edge cases, scope changes, and compatibility. These statements are not presented as a session transcript or measured improvement.

**Still to verify hands-on:** launch a new Claude Code session that consumes `CLAUDE.md`, observe how context influences its answer, run the documented workflow and commands, record the true test output and three-line reflection, and apply the checklist to at least one real review. These actions are intentionally not marked complete without evidence.

## AI and client policy

This is a personal demo using synthetic inputs. No proprietary data was provided to an AI model for this repository. Using assistants inside a client codebase requires separate confirmation of approved tools and data handling policy. No permission for a client engagement is implied.
