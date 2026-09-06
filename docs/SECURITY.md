# Security

- No service-role key in the browser, git, or `NEXT_PUBLIC_*`
- `.env` is gitignored; commit `.env.example` only
- Validate contact payload (name + email format) on the server
- Allow only `http:` / `https:` for project destination URLs; block `javascript:` and `data:`
- External links: `rel="noopener noreferrer"`
- `/admin` is **not** protected yet — do not put secrets there
- After Auth: every admin loader/action re-checks session on the server
- Rate-limit contact in Phase 07 (IP + time window) within free-tier constraints
- Error responses must not leak stack traces
