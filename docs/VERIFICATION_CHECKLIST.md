# Exercise 3 — AI-generated code verification checklist

**User-reported failure patterns:** missed edge cases, silent scope expansion, and breaking compatibility. These are reported categories, not claims of three documented production incidents.

## Checks tied to observed failure patterns

- [ ] **Edge cases:** Before reading generated tests, I list empty arrays, missing entities, concurrent requests, partial errors, and failure retries. I compare the test suite to that list.
- [ ] **Scope creep:** I inspect *every* changed file, including unexpected files; changes outside the approved plan are removed or separately approved.
- [ ] **Compatibility:** I confirm field names, null semantics, list ordering, error behavior, and downstream contracts remain unchanged.

## Baseline checks

- [ ] I read every file in the diff, including unexpected files.
- [ ] I can explain why each changed line exists.
- [ ] I wrote my own edge-case list before looking at generated tests and compared them.
- [ ] I verified performance, compatibility, dependent consumers, and applicable tool/data policies.
- [ ] I ran the code against realistic **synthetic** input, not only tests.
- [ ] The tests assert intended behavior, not merely current implementation behavior.
- [ ] I ran `npm run build`, `npm test`, and `npm run lint` and recorded the actual result.
- [ ] I verified the service is request-scoped; a global cache must not be introduced.
- [ ] I checked that no client information, real credentials, or private links are in the diff.

## Review evidence / next three PRs

| Review | Date / PR | Actual findings | Checklist result |
|---|---|---|---|
| Demo review | Pending | Pending hands-on run | Pending |
| PR 2 | Pending | Pending | Pending |
| PR 3 | Pending | Pending | Pending |

**Honesty note:** This checklist has been authored but has not been represented as exercised on three real PRs. Complete the table with actual evidence after use.
