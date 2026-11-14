/**
 * Anthropic CCA-F (Claude Certified Architect - Foundations) Master Question Bank
 * Total Questions: 504
 * Mapped to the official 5 domains & percentage weightings:
 * - Agentic Architecture & Orchestration: 108 questions
 * - Tool Design & Model Context Protocol (MCP) Integration: 96 questions
 * - Context Management & Reliability: 81 questions
 * - Claude Code Configuration & Workflows: 123 questions
 * - Prompt Engineering & Structured Output: 96 questions
 */

const DEFAULT_QUESTIONS = [
  {
    "id": "cca-exam1-001",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your resolution agent occasionally calls `process_refund` before `get_customer` has returned a verified identity, even though the system prompt says identity verification is mandatory first. What is the most reliable fix?",
    "options": [
      "Rewrite the system prompt in bold, capitalized text",
      "Add a programmatic prerequisite that blocks `process_refund` until `get_customer` returns a verified ID",
      "Lower the model's temperature",
      "Add five few-shot examples showing correct ordering"
    ],
    "correct": 1,
    "explanation": "Deterministic ordering guarantees for high-stakes operations (money, identity) need programmatic enforcement, not stronger prompt wording. This is the exam's single most-repeated lesson.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-002",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "`get_account_status` and `get_account_details` have nearly identical one-line descriptions. The agent frequently calls the wrong one for billing questions. What's the most effective first step?",
    "options": [
      "Merge the two tools into one",
      "Expand both descriptions with input formats, example queries, and explicit \"use this vs. that\" boundaries",
      "Add a keyword pre-router in front of the agent",
      "Force `tool_choice` to a single named tool"
    ],
    "correct": 1,
    "explanation": "Tool description quality is the primary, lowest-effort lever for fixing tool-selection confusion. Always fix descriptions before reaching for few-shot examples or architectural changes.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-003",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A lookup for \"Utkarsh Agarwal\" returns three matching customer records. What should the agent do?",
    "options": [
      "Pick the most recently active account",
      "Pick the account with the most orders",
      "Ask the customer for an additional identifier (email, order number, zip code)",
      "Process the request against all three accounts and let the customer confirm afterward"
    ],
    "correct": 2,
    "explanation": "Multiple ambiguous matches should never be resolved heuristically; ask for another identifier to disambiguate safely.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-004",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A customer says, \"I want to speak to a human right now,\" about a routine, easily resolvable issue. What should the agent do?",
    "options": [
      "Attempt to resolve the issue first, and escalate only if the customer repeats the request",
      "Escalate immediately, honoring the explicit request",
      "Explain why a human isn't necessary and continue autonomously",
      "Ask the customer to describe the issue in more detail before deciding"
    ],
    "correct": 1,
    "explanation": "An explicit request for a human should be honored immediately, not investigated around. Offering to resolve first is correct only when the customer *hasn't* explicitly demanded escalation.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-005",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A case is escalated to a human agent who cannot see the prior conversation. The handoff contains only a ticket number and the words \"customer upset.\" What's missing?",
    "options": [
      "A sentiment classification score",
      "A structured summary: customer details, root cause, recommended action",
      "The full unedited transcript",
      "A timestamp of when escalation occurred"
    ],
    "correct": 1,
    "explanation": "A structured handoff (customer details, root cause, recommended action) lets a human act without re-investigating from zero; a sentiment score or bare transcript don't solve that gap.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-006",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your team wants to block any refund over $500 from being auto-approved, regardless of what the model decides. What's the most reliable mechanism?",
    "options": [
      "A system prompt clause stating the $500 limit",
      "A pre-call tool-interception hook that blocks `process_refund` above $500 and redirects to escalation",
      "A few-shot example showing a refund being denied at $501",
      "Reducing `max_tokens` so large numbers can't be generated"
    ],
    "correct": 1,
    "explanation": "A pre-call tool-interception hook gives a deterministic guarantee. Prompt clauses and few-shot examples are probabilistic and can fail.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-007",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Multiple heterogeneous MCP tools return dates in different formats (Unix timestamps, ISO-8601, and localized strings). This is causing the agent to misinterpret order age. What's the best fix?",
    "options": [
      "A `PostToolUse` hook that normalizes all date formats before the model sees them",
      "A system prompt instructing the model to \"convert dates carefully\"",
      "Removing date fields from tool responses entirely",
      "Asking the customer to always state dates in ISO-8601 format"
    ],
    "correct": 0,
    "explanation": "A `PostToolUse` hook normalizes heterogeneous data formats before the model reasons over them \u2014 a hook problem, not a prompting problem.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-008",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A customer has two unrelated concerns in one message: a billing dispute and a shipping delay. What's the best approach?",
    "options": [
      "Address only the first concern mentioned and ask the customer to submit the second separately",
      "Decompose into distinct concerns, investigate each with shared context, then synthesize one unified response",
      "Escalate immediately since multi-concern messages are inherently too complex",
      "Pick whichever concern seems more urgent and ignore the other"
    ],
    "correct": 1,
    "explanation": "Multi-concern requests should be decomposed into distinct items, investigated with shared context, then synthesized into one unified response.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-009",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your team currently escalates cases when the model's self-reported confidence score falls below 6/10. First-contact resolution remains far below target, with easy cases escalated and hard cases handled autonomously. What's wrong with this design?",
    "options": [
      "The threshold is set too high and should be lowered",
      "Self-reported confidence is poorly calibrated \u2014 the model is often confidently wrong on exactly the hardest cases",
      "Confidence scores should be averaged over the whole conversation, not per-turn",
      "The threshold should instead be based on the number of tool calls made"
    ],
    "correct": 1,
    "explanation": "Self-reported model confidence is a poorly calibrated proxy for actual case complexity; it fails precisely on the hardest cases, which is what's happening here.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-010",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An MCP tool returns `{\"isError\": true, \"message\": \"Operation failed\"}` for every kind of failure \u2014 timeouts, invalid input, and policy violations alike. What's the problem, and the fix?",
    "options": [
      "No problem; `isError: true` is sufficient signal",
      "The agent can't distinguish retryable from non-retryable failures; add `errorCategory` and `isRetryable` fields",
      "Replace `isError` with an HTTP status code instead",
      "Log the error server-side only, since the agent doesn't need to see it"
    ],
    "correct": 1,
    "explanation": "Generic error responses hide information the agent needs to react correctly. Structured fields (`errorCategory`, `isRetryable`) let it distinguish retryable, validation, and business-rule failures.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-011",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A new engineer joins the team and doesn't seem to follow the team's established code style, even though it's documented. Investigation shows the conventions live in `~/.claude/CLAUDE.md` on the tech lead's machine. What's the fix?",
    "options": [
      "Ask the new engineer to manually copy the file",
      "Move the conventions to a project-level `CLAUDE.md` committed to the repo",
      "Repeat the conventions verbally in stand-up each day",
      "Add the conventions to the README instead"
    ],
    "correct": 1,
    "explanation": "User-level `CLAUDE.md` files are personal and not shared via version control. Team-wide conventions belong in a project-level file.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-012",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Testing conventions need to apply to every `*.test.tsx` file in a large monorepo, regardless of which directory it lives in. What's the most maintainable approach?",
    "options": [
      "A `CLAUDE.md` file in every directory containing tests",
      "A `.claude/rules/testing.md` file with `paths: [\"**/*.test.tsx\"]` frontmatter",
      "One giant root `CLAUDE.md` with a \"Testing\" section",
      "A skill that must be manually invoked before writing any test"
    ],
    "correct": 1,
    "explanation": "Glob-scoped `.claude/rules/` apply based on file path pattern, independent of directory \u2014 exactly the \"convention tied to file type, not location\" problem.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-013",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "You're building a skill that performs deep dependency tracing and produces very long, noisy output. You don't want this output cluttering the main conversation. Which `SKILL.md` frontmatter option addresses this?",
    "options": [
      "`argument-hint`",
      "`allowed-tools`",
      "`context: fork`",
      "`paths`"
    ],
    "correct": 2,
    "explanation": "`context: fork` runs a skill in an isolated sub-agent context so verbose output doesn't pollute the main conversation.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-014",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A task involves restructuring a monolithic service into 3 microservices, touching 50+ files, with multiple valid ways to draw service boundaries. What's the right approach?",
    "options": [
      "Direct execution, refining the boundary as you go",
      "Plan mode, to explore and design boundaries before committing to changes",
      "A single, extremely detailed upfront prompt specifying every file change",
      "Direct execution, switching to plan mode only if something unexpected comes up"
    ],
    "correct": 1,
    "explanation": "Multi-file architectural decisions with several valid approaches are exactly plan mode's use case \u2014 explore and design before committing.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-015",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer asks Claude to \"clean up this data transformation function,\" and across three attempts, the definition of \"cleaned up\" varies each time (sometimes renaming variables, sometimes restructuring logic, sometimes both). What's the most effective fix?",
    "options": [
      "Repeat the same instruction more forcefully",
      "Provide 2\u20133 concrete before/after examples that pin down what \"cleaned up\" means here",
      "Lower `max_tokens`",
      "Request five attempts and pick the best one manually"
    ],
    "correct": 1,
    "explanation": "Inconsistent interpretation of a prose instruction is fixed with concrete before/after examples, not stronger wording.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-016",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A code review surfaces three interacting bugs in a module \u2014 fixing bug 1 changes what the correct fix for bug 2 should be. How should this be communicated to Claude?",
    "options": [
      "One bug per message, sequentially",
      "All three interacting issues together in one detailed message",
      "Only the most severe bug; let Claude find the rest",
      "A summary count of bugs without describing any of them"
    ],
    "correct": 1,
    "explanation": "Interacting issues need to be described together in one message; sequencing them risks contradictory or wasted fixes.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-017",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Before implementing a rate-limiting layer in an unfamiliar service, a developer wants Claude to first surface design questions (burst handling, per-user vs. global limits, failure behavior) rather than jump straight to code. What technique fits best?",
    "options": [
      "Test-driven iteration",
      "The interview pattern",
      "Prompt chaining",
      "Direct execution with a longer prompt"
    ],
    "correct": 1,
    "explanation": "The interview pattern surfaces design considerations before implementation \u2014 well-suited to unfamiliar domains where not every consideration has been anticipated.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-018",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A project-scoped `/deploy-checklist` command should be available to every developer who clones the repo. Where should it live?",
    "options": [
      "`.claude/commands/`",
      "`~/.claude/commands/`",
      "`CLAUDE.md`",
      "`.claude/config.json`"
    ],
    "correct": 0,
    "explanation": "Project-scoped commands in `.claude/commands/` are version-controlled and shared with everyone who clones the repo.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-019",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "You want Claude to write a test suite, then iteratively improve an implementation based on which tests fail. What should you feed back after each attempt?",
    "options": [
      "Only the original instructions, repeated",
      "The actual test failures from that attempt",
      "A new, unrelated set of instructions each time",
      "Nothing \u2014 Claude should be able to infer failures without being told"
    ],
    "correct": 1,
    "explanation": "Test-driven iteration works by sharing actual test *failures* after each attempt, not just the original test suite once.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-020",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer is unsure whether to use `.claude/rules/` or a subdirectory `CLAUDE.md` for a convention that applies to all files under `src/api/`. Which favors `.claude/rules/`?",
    "options": [
      "The convention only ever applies within that one directory",
      "The convention needs to apply based on file path patterns that might extend beyond one directory in the future",
      "The convention is short enough to fit in one line",
      "There's no meaningful difference between the two options"
    ],
    "correct": 1,
    "explanation": "`.claude/rules/` with glob `paths` scales to conventions that might extend across directories; a subdirectory `CLAUDE.md` is bound to one location.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-021",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator decomposes \"renewable energy policy trends\" into three subtasks, all focused on solar policy in a single country. Each subagent executes its assigned task correctly, but the final report is extremely narrow. Where's the defect?",
    "options": [
      "The synthesis agent's summarization quality",
      "The coordinator's task decomposition",
      "The web search agent's query construction",
      "The document analysis agent's relevance filtering"
    ],
    "correct": 1,
    "explanation": "Every subagent executed correctly; the narrow coverage comes from how the coordinator decomposed the topic in the first place.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-022",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Which statement about subagent context is correct?",
    "options": [
      "Subagents automatically inherit the coordinator's full conversation history",
      "Subagents share memory across invocations by default",
      "Subagents require context to be explicitly included in their invocation prompt",
      "Subagents inherit context if invoked within the same API call"
    ],
    "correct": 2,
    "explanation": "Subagents do not automatically inherit context; it must be explicitly included in their invocation prompt.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-023",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator needs both a web search subagent and a document analysis subagent to run concurrently rather than one after another. How should the coordinator invoke them?",
    "options": [
      "Two separate Task tool calls made in two separate coordinator turns",
      "Multiple Task tool calls emitted in a single coordinator response",
      "One combined subagent that does both jobs",
      "Sequential invocation is the only supported pattern"
    ],
    "correct": 1,
    "explanation": "Emitting multiple Task tool calls in a single coordinator response runs subagents concurrently rather than sequentially.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-024",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A search subagent times out. What should it report back to the coordinator?",
    "options": [
      "An empty result set marked as a success",
      "Structured error context: failure type, what was attempted, any partial results, possible alternatives",
      "A generic \"search unavailable\" string",
      "Nothing \u2014 silently retry indefinitely without reporting"
    ],
    "correct": 1,
    "explanation": "Structured error context (failure type, attempted action, partial results, alternatives) lets the coordinator make an informed recovery decision. Silently succeeding (A) or vague strings (C) hide information; runaway retries (D) risk resource exhaustion without reporting.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-025",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "The synthesis subagent needs to verify simple facts (dates, names, statistics) very frequently \u2014 85% of verification needs are simple, 15% require deep investigation. Routing every check through the coordinator adds significant latency. What's the best fix?",
    "options": [
      "Give the synthesis agent full access to all search tools",
      "Give the synthesis agent one scoped `verify_fact` tool for the common case; keep coordinator routing for complex cases",
      "Batch all verifications to run at the very end of the pipeline",
      "Remove verification entirely to save time"
    ],
    "correct": 1,
    "explanation": "Giving the synthesis agent one scoped tool for the common, simple case follows least-privilege while avoiding unnecessary coordinator round-trips; the rare complex case still routes through the coordinator.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-026",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Two credible sources report different figures for the same statistic. What should the synthesis output do?",
    "options": [
      "Use whichever source is more recent, silently",
      "Average the two figures",
      "Preserve both values with source attribution and flag the discrepancy",
      "Omit the statistic entirely"
    ],
    "correct": 2,
    "explanation": "Conflicting credible sources should be preserved with attribution and flagged, never silently reconciled by picking or averaging one value.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-027",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A subagent's findings are passed to the synthesis agent as a single block of unstructured prose, and the final report loses track of which claim came from which source. What's the fix?",
    "options": [
      "Have the coordinator manually re-attribute claims after the fact",
      "Require subagents to output structured claim-source mappings (claim, excerpt, source, date) that synthesis preserves",
      "Reduce the number of subagents to avoid attribution complexity",
      "Have the synthesis agent guess the most likely source based on writing style"
    ],
    "correct": 1,
    "explanation": "Structured claim-source mappings preserve provenance through synthesis; unstructured prose loses which claim came from which source.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-028",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator's `allowedTools` list does not include `\"Task\"`. What happens when it tries to delegate to a subagent?",
    "options": [
      "It works normally; `Task` is always available",
      "It cannot spawn subagents at all",
      "It spawns subagents but without passing context",
      "It falls back to a built-in tool automatically"
    ],
    "correct": 1,
    "explanation": "The `Task` tool must be in `allowedTools` for a coordinator to spawn subagents at all.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-029",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "After a subagent crash mid-run, the coordinator needs to resume without losing prior progress. What's the recommended pattern?",
    "options": [
      "Restart the entire pipeline from scratch every time",
      "Each agent exports state to a known location; the coordinator loads a manifest on resume and re-injects it",
      "Rely on the model's memory of the prior session",
      "Manually re-type a summary of progress into the next prompt"
    ],
    "correct": 1,
    "explanation": "Structured state exports plus a coordinator-loaded manifest on resume is the recommended crash-recovery pattern.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-030",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A report needs to include findings from sources published a decade apart, describing what appear to be conflicting figures. What should the synthesis output require to avoid misinterpreting a genuine trend as a contradiction?",
    "options": [
      "Publication or data-collection dates on each finding",
      "A single averaged figure across all sources",
      "Removal of the older sources entirely",
      "A confidence score attached to the more recent figure only"
    ],
    "correct": 0,
    "explanation": "Publication/collection dates let genuine change over time be distinguished from an apparent contradiction between sources.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-031",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer needs to find every file matching `**/*.config.ts` across a large repository. Which built-in tool is correct?",
    "options": [
      "`Grep`",
      "`Glob`",
      "`Read`",
      "`Edit`"
    ],
    "correct": 1,
    "explanation": "`Glob` matches file paths/names by pattern.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-032",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer needs to find every place in the codebase that calls a specific function by name. Which built-in tool is correct?",
    "options": [
      "`Grep`",
      "`Glob`",
      "`Write`",
      "`Bash` with no arguments"
    ],
    "correct": 0,
    "explanation": "`Grep` searches file *contents*, which is what's needed to find function callers.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-033",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A connected MCP server exposes a `trace_dependencies` tool that's meaningfully more capable than manually chaining `Grep` and `Read`, but the agent keeps using `Grep` instead. What's the most likely cause?",
    "options": [
      "MCP tools are always deprioritized versus built-ins and this can't be changed",
      "The MCP tool's description doesn't make a strong enough case for its capability relative to the familiar built-in",
      "The MCP server is misconfigured at the network level",
      "`Grep` needs to be removed from the tool list entirely"
    ],
    "correct": 1,
    "explanation": "A thin MCP tool description loses to a familiar built-in by default; enhancing the description (not removing the built-in) is the fix.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-034",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An `Edit` call fails because the anchor text it's trying to match appears more than once in the file. What's the reliable fallback?",
    "options": [
      "Retry `Edit` with the exact same input",
      "Use `Read` to load the full file, then `Write` the corrected version",
      "Use `Grep` to force a unique match",
      "Skip the edit and ask the user to do it manually"
    ],
    "correct": 1,
    "explanation": "When `Edit`'s anchor text isn't unique, `Read` + `Write` is the reliable fallback for a full-file rewrite.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-035",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A productivity agent needs credentials for a shared, team-wide MCP server, and the token must never be committed to git. Where should this be configured?",
    "options": [
      "`~/.claude.json` with the token hardcoded",
      "`.mcp.json` with `${TOKEN_NAME}` environment variable expansion",
      "Directly inside `CLAUDE.md`",
      "A comment at the top of the relevant source file"
    ],
    "correct": 1,
    "explanation": "Project-scoped `.mcp.json` with environment-variable expansion keeps credentials out of version control while remaining shared team config.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-036",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer wants a personal, experimental MCP server that only they use, without affecting teammates. Where should it be configured?",
    "options": [
      "`.mcp.json` in the repo",
      "`~/.claude.json`",
      "`.claude/rules/`",
      "A shared team wiki page"
    ],
    "correct": 1,
    "explanation": "`~/.claude.json` is the user-scoped location for personal/experimental servers.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-037",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "After several hours of exploring a large, unfamiliar codebase, Claude starts giving vague answers about \"typical patterns\" instead of referencing the specific classes it found earlier. What's the most direct fix?",
    "options": [
      "Restart with no context",
      "Maintain a scratchpad file recording key findings for the agent to reference",
      "Switch to a different model mid-session",
      "Increase `max_tokens`"
    ],
    "correct": 1,
    "explanation": "A scratchpad file persisting key findings counters context degradation in long exploration sessions.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-038",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer wants to build understanding of an unfamiliar codebase efficiently, without reading every file upfront. What's the recommended exploration pattern?",
    "options": [
      "Use `Read` on every file in the repository first",
      "Start with `Grep` to find entry points, then `Read` to follow imports and trace flow",
      "Use `Bash` to `cat` the entire repo into one context block",
      "Ask the user to describe the codebase verbally instead of exploring it"
    ],
    "correct": 1,
    "explanation": "Starting with `Grep` for entry points, then `Read` to follow imports, builds understanding incrementally without reading everything upfront.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-039",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A generic tool named `process_data` is used for three very different jobs: extracting data points, summarizing content, and verifying claims \u2014 and the agent frequently uses it incorrectly. After improving the description doesn't fully resolve the confusion, what's the next step on the fix ladder?",
    "options": [
      "Add ten few-shot examples immediately, skipping other options",
      "Split `process_data` into purpose-specific tools: `extract_data_points`, `summarize_content`, `verify_claim`",
      "Remove the tool entirely",
      "Rename it without changing its scope"
    ],
    "correct": 1,
    "explanation": "Splitting an overly generic tool into purpose-specific tools is the next rung on the fix ladder once description improvements alone haven't fully resolved confusion.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-040",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team wants to give a productivity agent both `Read`/`Write`/`Bash` and 15 additional MCP tools for various integrations, all available at once. Recent logs show increasing tool misuse. What's the likely cause and fix?",
    "options": [
      "The model needs a larger context window",
      "Too many available tools increases decision complexity and misuse risk; scope tools per task/role instead",
      "`Bash` should be removed since it's the most dangerous tool",
      "The system prompt needs to list all 18 tools more explicitly"
    ],
    "correct": 1,
    "explanation": "Too many available tools increases selection complexity and misuse; scoping tools per task/role is the fix, not a bigger context window or removing a single tool.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-041",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A CI job runs `claude \"Summarize the diff and flag risky changes\"` and hangs indefinitely, waiting for input. What's the fix?",
    "options": [
      "Add the `-p` (or `--print`) flag",
      "Set an environment variable to disable interactivity",
      "Pipe an empty file into the command as a workaround",
      "Add a `--ci` flag"
    ],
    "correct": 0,
    "explanation": "`-p` / `--print` runs Claude Code non-interactively, which is required in automated pipelines. (B and D describe flags/variables that don't exist \u2014 a common distractor pattern.)",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-042",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "You want automated PR review findings posted as machine-parseable inline comments. What CLI options should you use?",
    "options": [
      "`--verbose` and `--debug`",
      "`--output-format json` combined with `--json-schema`",
      "`--print` alone is sufficient",
      "`--format text`"
    ],
    "correct": 1,
    "explanation": "`--output-format json` with `--json-schema` produces machine-parseable structured findings suitable for automated PR comments.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-043",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "The same Claude Code session that generated a bug fix is also used to review that fix before merge, and subtle logic issues are consistently missed. Why?",
    "options": [
      "The context window is too small",
      "The same session retains its generation reasoning, making it less likely to challenge its own prior decisions",
      "`--output-format json` wasn't set",
      "The model needs more few-shot examples of \"good reviews\""
    ],
    "correct": 1,
    "explanation": "A session that generated code retains its own reasoning and is less likely to challenge its own decisions; an independent instance reviews more effectively.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-044",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Automated code review is producing a 40% false-positive rate concentrated in one finding category. The prompt already instructs the model to \"only report high-confidence issues.\" What's the most effective next step?",
    "options": [
      "Add \"be even more careful\" to the prompt",
      "Define explicit, categorical criteria for that finding type, and consider temporarily disabling the category while iterating",
      "Lower the sampling temperature",
      "Permanently disable all review categories"
    ],
    "correct": 1,
    "explanation": "Vague instructions like \"be conservative\" don't meaningfully reduce false positives; explicit categorical criteria do, and temporarily disabling a high-false-positive category protects trust while iterating.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-045",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team wants Claude Code's automated review to avoid duplicate comments across re-runs after new commits are pushed to a PR. What should be included in context on re-runs?",
    "options": [
      "Nothing \u2014 each run should be fully independent",
      "The prior review's findings, with instructions to report only new or still-unaddressed issues",
      "The full git history of the repository",
      "A count of how many times the PR has been reviewed"
    ],
    "correct": 1,
    "explanation": "Including prior findings and instructing the model to report only new/unaddressed issues avoids duplicate PR comments across re-runs.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-046",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A single-pass review across a 15-file PR produces inconsistent depth \u2014 some files get thorough feedback, others get superficial comments, and the same pattern is flagged in one file but approved in another. What's the fix?",
    "options": [
      "Use a model with a larger context window",
      "Split into per-file local-analysis passes, plus a separate cross-file integration pass",
      "Require developers to submit smaller PRs",
      "Run the same single pass three times and vote on findings"
    ],
    "correct": 1,
    "explanation": "Splitting into per-file passes plus a separate cross-file integration pass avoids the attention dilution causing inconsistent, contradictory findings.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-047",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team wants to reduce API costs on two workflows: (1) a blocking pre-merge check developers wait on, and (2) an overnight technical-debt report. Which should move to the Message Batches API?",
    "options": [
      "Both",
      "Only the overnight report; keep the pre-merge check synchronous",
      "Only the pre-merge check",
      "Neither, since batch API doesn't support any CI use case"
    ],
    "correct": 1,
    "explanation": "The Batch API's lack of a latency SLA makes it unsuitable for blocking workflows; it's appropriate only for the latency-tolerant overnight report.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-048",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Test generation is producing many low-value, duplicate tests that already exist in the suite. What's the most direct fix?",
    "options": [
      "Increase `max_tokens` for the generation call",
      "Provide existing test files in context, and document testing standards/fixtures in `CLAUDE.md`",
      "Disable test generation entirely",
      "Ask developers to write all tests manually going forward"
    ],
    "correct": 1,
    "explanation": "Providing existing test files in context and documenting standards/fixtures in `CLAUDE.md` reduces duplicate, low-value test generation.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-049",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A CI review pipeline needs its findings to be reliably parseable by a downstream bot that posts PR comments. Which is the most robust approach?",
    "options": [
      "Ask the model nicely in the prompt to \"format your response as JSON\"",
      "Use `--output-format json` with a `--json-schema` to enforce structure",
      "Parse the model's free-text output with regular expressions",
      "Manually reformat the output after each run"
    ],
    "correct": 1,
    "explanation": "Enforced structured output via CLI flags is far more reliable than asking nicely in a prompt or parsing free text with regex.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-050",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Documented testing standards live only in a senior engineer's head and aren't written anywhere the CI pipeline's Claude Code invocation can access. What's the fix?",
    "options": [
      "Rely on the model's general knowledge of \"good tests\"",
      "Document testing standards, valuable test criteria, and available fixtures in `CLAUDE.md`",
      "Ask the senior engineer to review every PR manually instead",
      "Add the standards to a Slack channel pinned message"
    ],
    "correct": 1,
    "explanation": "Documenting standards in `CLAUDE.md` makes them available to every Claude Code invocation, including CI, instead of living only in one person's head.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-051",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An extraction pipeline using `tool_use` with a strict JSON schema never produces malformed JSON, but sometimes produces line items that don't sum to the stated total. What does this indicate, and what's the fix?",
    "options": [
      "The schema itself is broken; add more `required` fields",
      "This is a semantic error, not a syntax error; add a `calculated_total` field to compare against `stated_total`",
      "Switch away from `tool_use` to plain text JSON",
      "Reduce `max_tokens` to force shorter output"
    ],
    "correct": 1,
    "explanation": "`tool_use` with a schema eliminates syntax errors but not semantic ones; comparing a calculated total against the stated total catches this class of mismatch.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-052",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "You have three separate extraction schemas (invoice, receipt, contract) and don't know the document type in advance, but want to guarantee some structured extraction occurs. Which `tool_choice` setting is correct?",
    "options": [
      "`\"auto\"`",
      "`\"any\"`",
      "A forced call to one specific schema's tool",
      "Omitting `tool_choice`"
    ],
    "correct": 1,
    "explanation": "`tool_choice: \"any\"` guarantees a tool call happens while still letting the model choose which of several schemas fits.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-053",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A required field, `purchase_order_number`, keeps failing validation because the source document genuinely never contains a PO number anywhere. What should you do?",
    "options": [
      "Keep retrying with the same prompt",
      "Make the field nullable/optional instead of required",
      "Fabricate a placeholder value so validation passes",
      "Increase `max_tokens` and try again"
    ],
    "correct": 1,
    "explanation": "When information is genuinely absent from the source, no amount of retrying will produce it; the field should be nullable instead of required.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-054",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A retry is needed because a nested array of line items was incorrectly flattened into a single string on the first extraction attempt. What should the retry prompt include?",
    "options": [
      "Only a repeated instruction to \"format correctly this time\"",
      "The original document, the failed extraction, and the specific validation error describing the flattening problem",
      "A completely different, unrelated example document",
      "Nothing further \u2014 the model should self-correct silently"
    ],
    "correct": 1,
    "explanation": "This is a structural, retry-fixable error \u2014 the retry needs the specific validation error to correct against.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-055",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Two tools have nearly identical descriptions, causing selection confusion, and you've already rewritten both descriptions with clear boundaries \u2014 but genuinely ambiguous edge cases still cause mistakes. What's the next lever?",
    "options": [
      "2\u20134 few-shot examples showing correct selection with reasoning for the ambiguous cases",
      "Force `tool_choice` to always pick one tool",
      "Merge the tools into one",
      "Increase `max_tokens`"
    ],
    "correct": 0,
    "explanation": "Once description improvements are exhausted, few-shot examples with reasoning are the next lever for genuinely ambiguous residual cases.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-056",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An extraction pipeline reports 97% overall field accuracy. A stakeholder wants to reduce human review before fully trusting this number. What should happen first?",
    "options": [
      "Immediately reduce human review across the board, since 97% is high",
      "Validate accuracy broken down by document type and field, since aggregate accuracy can mask segment-level failure",
      "Round the accuracy up to 100% for reporting purposes",
      "Stop measuring accuracy since it's already high enough"
    ],
    "correct": 1,
    "explanation": "Aggregate accuracy can mask segment-level failure; validating by document type and field is required before reducing review.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-057",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "You want to catch novel extraction error patterns that wouldn't normally be reviewed, since your review process currently only samples low-confidence extractions. What should you add?",
    "options": [
      "Stratified random sampling of high-confidence extractions",
      "A rule to never review high-confidence extractions",
      "A fixed weekly quota of 10 reviews regardless of confidence",
      "Removing confidence scoring entirely"
    ],
    "correct": 0,
    "explanation": "Stratified random sampling of high-confidence extractions is specifically designed to catch novel error patterns that a confidence-based review process would otherwise never see.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-058",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your team wants to move a blocking, pre-merge invoice-validation workflow to the Message Batches API to save 50% on cost. Is this appropriate?",
    "options": [
      "Yes, always \u2014 batch API should be used wherever possible for cost savings",
      "No \u2014 batch processing has no latency SLA and can take up to 24 hours, making it unsuitable for a blocking workflow",
      "Yes, as long as `custom_id` is set correctly",
      "Only if the invoices are small in size"
    ],
    "correct": 1,
    "explanation": "The Batch API's lack of a latency SLA (up to 24 hours) makes it unsuitable for any blocking, pre-merge/pre-approval workflow.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-059",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An extraction schema needs to categorize expenses, but the fixed set of categories won't cover every real-world case that will eventually appear. What schema design pattern handles this best?",
    "options": [
      "A required `category` string field with no constraints",
      "An `enum` field with a defined set of categories plus an `\"other\"` value and a `category_detail` string field",
      "A free-text field parsed later with regular expressions",
      "Omitting the category field entirely"
    ],
    "correct": 1,
    "explanation": "An `enum` plus `\"other\"` and a detail string handles extensibility without over-fitting to a fixed list or silently misclassifying novel cases.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam1-060",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "After several extraction pipeline iterations, the team wants to systematically analyze which document patterns most often trigger validation errors or get dismissed as false positives by downstream reviewers. What should be added to each structured finding?",
    "options": [
      "A random UUID per finding",
      "A `detected_pattern` field describing what triggered the finding",
      "A free-text comment box with no structure",
      "Nothing \u2014 this requires a separate ML model to analyze"
    ],
    "correct": 1,
    "explanation": "A `detected_pattern` field enables systematic, aggregate analysis of which patterns trigger errors or get dismissed as false positives over time.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-001",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your support agent has tools `get_customer`, `lookup_order`, `process_refund`, and `escalate_to_human`. A customer says \"I want to speak to a manager right now\" partway through a routine return. What should the agent do?",
    "options": [
      "Offer a discount to de-escalate before considering a transfer",
      "Ask one clarifying question to see if the issue can still be resolved",
      "Escalate immediately, without attempting further investigation",
      "Continue investigating the return since it's already 80% resolved"
    ],
    "correct": 2,
    "explanation": "An explicit request to escalate must be honored immediately, without further investigation, since customer-requested escalation overrides progress-based reasoning. Continuing to investigate because the return is \"80% done\" (D) ignores the customer's stated preference.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-002",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "`lookup_order` returns three possible matches for the identifiers provided. What is the correct handling?",
    "options": [
      "Select the most recently placed order",
      "Select the order with the highest dollar value, since it's likely the one in dispute",
      "Process against all three and let the customer confirm afterward",
      "Ask the customer for an additional identifier to disambiguate"
    ],
    "correct": 3,
    "explanation": "Multiple ambiguous matches should never be resolved by a heuristic guess like recency or dollar value; the safe move is asking for one more identifier to disambiguate. Picking heuristically risks acting on the wrong customer's order entirely.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-003",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A refund-authorization hook blocks `process_refund` for amounts over $500 and redirects to `escalate_to_human`. An engineer proposes removing the hook and instead adding \"never approve refunds over $500 without escalation\" to the system prompt, arguing it's simpler to maintain. What is the main risk?",
    "options": [
      "Prompt instructions have a non-zero failure rate; the guarantee becomes probabilistic instead of deterministic",
      "Removing the hook would violate the MCP specification",
      "None \u2014 a clear instruction is just as reliable as a hook",
      "The system prompt has a hard character limit that would be exceeded"
    ],
    "correct": 0,
    "explanation": "Prompt instructions carry a non-zero, probabilistic failure rate, so removing the hook trades a deterministic $500 threshold guarantee for something the model can occasionally ignore. Neither MCP compliance nor prompt length is actually at issue here.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-004",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A customer's message covers two unrelated concerns: a billing dispute and a shipping delay. What is the best decomposition strategy?",
    "options": [
      "Escalate immediately since multi-concern messages are inherently too complex",
      "Ask the customer to restate their message as two separate, single-issue messages",
      "Resolve only the first concern mentioned and ask the customer to open a second ticket for the other",
      "Decompose into the two distinct items, investigate each using shared context, then synthesize one unified response"
    ],
    "correct": 3,
    "explanation": "Decomposing into the two distinct concerns, investigating each with shared context, then synthesizing one reply mirrors the exam's decomposition pattern (like per-file-then-cross-file review). Deferring one concern to a separate ticket (C) needlessly fragments the interaction when the agent already has what it needs to handle both.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-005",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "When escalating a case the agent cannot resolve, what should the handoff to the human agent include?",
    "options": [
      "Just the customer's most recent message, since the human can read the full transcript",
      "A confidence score representing how hard the case is",
      "A structured summary: customer details, root cause analysis, and a recommended action",
      "Only the customer ID, so the human starts the investigation fresh"
    ],
    "correct": 2,
    "explanation": "Since the human has no transcript access, the handoff must substitute for that missing context with customer details, root-cause analysis, and a recommended action. A bare customer ID or last message (A/D) forces the human to re-investigate from zero.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-006",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "`get_customer` and `lookup_order` are frequently confused by the model when a customer says \"check on order #12345.\" Descriptions are minimal (\"Retrieves customer information\" / \"Retrieves order details\"). What should you try first?",
    "options": [
      "Expand each description with input formats, example queries, and explicit \"use this vs. that\" boundaries",
      "Add 8\u201310 few-shot examples of correct routing",
      "Merge the two tools into one generic `lookup` tool",
      "Build a keyword pre-router that inspects the message before the model sees it"
    ],
    "correct": 0,
    "explanation": "Description quality is always the lowest-effort, highest-leverage first fix for tool-selection confusion \u2014 before few-shot examples or structural changes. Merging the tools (C) would erase the very signal that lets the model discriminate between customer and order lookups.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-007",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "After a 20-turn conversation about a $215 refund on order #4471, the conversation is summarized to save tokens. The summary says \"customer wants a refund,\" and the agent later asks the customer to repeat the amount and order number. What's the most direct fix?",
    "options": [
      "Maintain a persistent \"case facts\" block (amount, order ID, dates) carried in every prompt outside the narrative summary",
      "Disable summarization entirely for all conversations",
      "Ask the customer to always begin messages with their order number",
      "Switch to a model with a larger context window"
    ],
    "correct": 0,
    "explanation": "A persistent case-facts block for the amount and order ID, carried outside the narrative summary, survives compression that plain-prose summarization won't. Disabling summarization outright (B) is a blunt fix that reintroduces the token-bloat problem it was solving.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-008",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your team wants the agent to self-report a 1\u201310 confidence score and auto-escalate anything below 6, replacing explicit escalation criteria. What is the concern with this approach?",
    "options": [
      "Confidence scores require a separate fine-tuned model to produce",
      "This approach violates MCP resource specifications",
      "Self-reported confidence is poorly calibrated \u2014 the model is often confidently wrong on exactly the hardest cases",
      "Confidence scores can only be produced when using extended thinking"
    ],
    "correct": 2,
    "explanation": "Self-reported confidence scores are poorly calibrated, and models tend to be most confidently wrong on exactly the hardest cases \u2014 the opposite of what an auto-escalation gate needs. This is a calibration problem inherent to self-assessment, not a tooling or fine-tuning limitation (A, D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-010",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "The agent has grown to 18 available tools across support, billing, and shipping functions, and tool-selection accuracy has degraded noticeably. What is the most appropriate fix?",
    "options": [
      "Force `tool_choice` to a single always-used tool",
      "Add a 20-example few-shot block covering every tool combination",
      "Scope each agent/role to only the 4\u20136 tools relevant to it",
      "Increase `max_tokens` so the model has more room to reason about tool choice"
    ],
    "correct": 2,
    "explanation": "Scoping each agent/role to the 4\u20136 tools it actually needs directly reduces the decision surface causing misselection. Forcing a single tool (A) or adding more few-shot coverage (B) doesn't address the root cause of too many overlapping options in one place.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-011",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Which best describes why a programmatic prerequisite (blocking `process_refund` until `get_customer` returns a verified ID) is preferred over prompt wording for identity verification?",
    "options": [
      "It provides a deterministic guarantee instead of relying on probabilistic model compliance",
      "It's the only way to satisfy MCP's `isError` requirement",
      "It is required by the Message Batches API",
      "It reduces the number of tokens used per turn"
    ],
    "correct": 0,
    "explanation": "A hard prerequisite gives a deterministic guarantee that refunds can never fire before identity is verified, whereas any prompt-based rule is only probabilistically followed. This is the exam's central \"structural fix beats prompt fix\" lesson, not an MCP or token-budget issue (B, D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-012",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A customer explicitly states policy allows price matching only against the company's own past sales, but asks for a price match against a competitor \u2014 a case the policy doesn't address either way. What should the agent do?",
    "options": [
      "Offer a partial discount as a compromise",
      "Escalate, since the policy is silent/ambiguous on this specific request",
      "Deny the request, since it wasn't explicitly permitted",
      "Approve the request, since it wasn't explicitly denied"
    ],
    "correct": 1,
    "explanation": "Silence in policy is treated the same as ambiguity: escalate rather than let the agent invent a resolution either way. Approving (D) or denying (C) both assume an answer the policy doesn't actually give.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-013",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Which is the correct interpretation of a `PostToolUse` hook's role, given `lookup_order` returns Unix timestamps and `get_customer` returns ISO 8601 dates?",
    "options": [
      "It's used to route the request to a different subagent",
      "It's used to normalize the two different date formats into one consistent format before the model reasons over them",
      "It's used to cache results across sessions",
      "It's used to block a tool call before it executes"
    ],
    "correct": 1,
    "explanation": "A PostToolUse hook is the right place to normalize disparate tool output formats (Unix timestamps vs. ISO 8601) into one consistent representation before the model reasons over them. It doesn't block calls before execution (D) \u2014 that's a pre-call/interception hook's job.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-014",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Sentiment analysis is added to detect customer frustration and auto-escalate above a threshold. Escalation rates go up sharply, but first-contact resolution doesn't improve, and some genuinely simple cases now escalate unnecessarily just because the customer sounded annoyed. What does this indicate?",
    "options": [
      "The sentiment threshold was simply set too low",
      "The agent needs more few-shot examples of angry customers",
      "Sentiment doesn't reliably correlate with actual case complexity, so it's a poor escalation signal on its own",
      "Sentiment analysis should be paired with a larger model"
    ],
    "correct": 2,
    "explanation": "Rising escalations without improved resolution, plus simple cases escalating just for sounding annoyed, is the signature of a signal that doesn't track actual complexity. Retuning the threshold (A) or adding more examples (B) would just move the same unreliable signal around rather than fix the mismatch.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-015",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A customer says \"I already tried this, just send me to a person,\" after the agent offers to help resolve a straightforward issue. What's the appropriate next step?",
    "options": [
      "Honor the reiterated request and escalate",
      "Continue offering the same resolution path, since the issue is within the agent's capability",
      "Provide a partial refund automatically without further discussion",
      "Ask one more diagnostic question to confirm the issue is really unresolved"
    ],
    "correct": 0,
    "explanation": "A reiterated, explicit request for a human takes priority over the agent's belief that the issue is simple; explicit requests get honored immediately rather than re-litigated. Asking one more diagnostic question (D) directly contradicts the customer's stated preference.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-016",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator delegates to a web-search subagent and a document-analysis subagent. For the coordinator to invoke either one, what must be true?",
    "options": [
      "Both subagents must share the coordinator's full conversation history automatically",
      "The subagents must be configured with `context: fork`",
      "The coordinator must run in plan mode",
      "The coordinator's `allowedTools` must include `\"Task\"`"
    ],
    "correct": 3,
    "explanation": "The coordinator can only invoke subagents through the Task tool, so it must appear in `allowedTools`; nothing about shared history, fork context, or plan mode is a real prerequisite for delegation.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-017",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "All subagents in a research pipeline complete successfully and report no errors, yet the final report covers only 30% of the requested topic. Where should you look first?",
    "options": [
      "The web-search subagent's result ranking",
      "The document-analysis subagent's summarization fidelity",
      "The coordinator's task decomposition logs",
      "The synthesis subagent's writing quality"
    ],
    "correct": 2,
    "explanation": "When every subagent succeeds at its assigned slice but overall coverage is narrow, the defect lives upstream in what the coordinator chose to assign, not in how well any individual subagent executed its own task.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-018",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "The synthesis subagent needs the findings gathered by the web-search and document-analysis subagents. What must happen for it to have that information?",
    "options": [
      "Nothing \u2014 subagents automatically share a session-scoped memory pool",
      "The synthesis subagent must call `fork_session` to inherit prior context",
      "The coordinator must explicitly include the complete findings in the synthesis subagent's prompt",
      "The findings are inherited automatically as long as all subagents share the same `AgentDefinition`"
    ],
    "correct": 2,
    "explanation": "Subagents don't automatically inherit the coordinator's history, so findings must be explicitly written into the synthesis subagent's prompt; there's no automatic memory pool (A, D), and `fork_session` branches a session's own context rather than transferring another subagent's output (B).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-019",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "The coordinator needs to run a web-search subtask and a document-analysis subtask concurrently rather than one after another. How should it do this?",
    "options": [
      "Send both subtasks in separate turns but with the same `tool_use_id`",
      "Use `fork_session` to duplicate the coordinator into two parallel coordinators",
      "Set `tool_choice: \"any\"` on the coordinator's next call",
      "Emit both `Task` tool calls within a single coordinator response"
    ],
    "correct": 3,
    "explanation": "Real concurrency requires the coordinator to emit both Task calls within one response so they execute in parallel; reusing a `tool_use_id` (A) is invalid, `fork_session` (B) duplicates a session rather than dispatching two subtasks, and `tool_choice: \"any\"` (C) only forces some tool call, not simultaneity.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-020",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Two credible sources report different figures for the same statistic during synthesis. What should the final report do?",
    "options": [
      "Preserve both values with source attribution, distinguishing well-established from contested findings",
      "Average the two figures and report the average as the value",
      "Silently prefer whichever source was retrieved most recently",
      "Omit the statistic entirely since it can't be verified"
    ],
    "correct": 0,
    "explanation": "Preserving both values with attribution keeps the reader informed of a genuine disagreement; averaging (B) invents a number neither source reported, and recency bias (C) or omission (D) both discard real information.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-021",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "During synthesis, a claim's supporting excerpt is compressed for brevity, and the source URL originally attached to it is dropped in the process. What principle was violated?",
    "options": [
      "The excerpt should have been translated into a different content type",
      "Structured claim-source mappings must be preserved and merged through synthesis, not summarized away",
      "The claim should have been paraphrased more aggressively, not less",
      "The claim needed a confidence score instead of a source"
    ],
    "correct": 1,
    "explanation": "The source-to-claim mapping is exactly the provenance information synthesis must carry forward intact, not compress away in the name of brevity.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-022",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A web-search subagent times out mid-query. What should it return to the coordinator?",
    "options": [
      "An empty result set marked as a successful query",
      "A retry loop that continues indefinitely until it succeeds",
      "Nothing \u2014 the coordinator should assume failure from a lack of response",
      "Structured error context: failure type, what was attempted, any partial results, and possible alternatives"
    ],
    "correct": 3,
    "explanation": "Structured failure context (failure type, what was attempted, partial results, alternatives) lets the coordinator make an informed recovery decision; masking it as success (A), retrying forever (B), or going silent (C) all destroy that information.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-023",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A statistic in one subagent's findings comes from a report published two years ago, while another subagent's finding on the same metric is from last month. Synthesis treats these as contradictory. What was missing from the subagents' structured output?",
    "options": [
      "A `retryable` boolean",
      "A `confidence` field",
      "An `errorCategory` field",
      "Publication or data-collection dates, which would show this is a change over time rather than a contradiction"
    ],
    "correct": 3,
    "explanation": "Without publication or data-collection dates, synthesis has no way to distinguish a genuine change over time from a contradiction between two sources measuring the same thing at different times.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-024",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "The synthesis subagent frequently needs simple fact-checks (dates, names, statistics) \u2014 85% of verification needs are simple, 15% require deep investigation. Routing every check through the coordinator to the web-search agent adds significant latency. What is the most balanced fix?",
    "options": [
      "Batch all verification requests to run once at the end of the pipeline",
      "Have the web-search subagent pre-cache anything it speculates might later be needed",
      "Give the synthesis subagent full, unrestricted access to all search tools",
      "Give the synthesis subagent one scoped `verify_fact` tool for the simple 85%, keep coordinator-routed delegation for the complex 15%"
    ],
    "correct": 3,
    "explanation": "A narrowly scoped `verify_fact` tool handles the high-frequency simple case without ballooning the synthesis agent's tool surface (unlike C), while the rarer complex 15% still routes through the coordinator as before; batching (A) or speculative caching (B) don't fix the routing overhead itself.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-025",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator decomposes \"impact of remote work on urban commercial real estate\" into three subtasks: \"office vacancy rates downtown,\" \"office vacancy rates in suburbs,\" and \"office leasing trends.\" The resulting report never touches retail or residential conversion angles. What is the root cause?",
    "options": [
      "The coordinator's task decomposition was too narrow, missing entire relevant sub-domains of the topic",
      "The web-search subagent didn't search broadly enough",
      "The document-analysis subagent filtered out irrelevant sources",
      "The synthesis subagent lacked writing guidance on breadth"
    ],
    "correct": 0,
    "explanation": "All three subtasks are narrow slices of the same angle (vacancy/leasing), so no subagent was ever asked to look at retail or residential conversion \u2014 the gap originates in decomposition, not execution.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-026",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "After reviewing a first-pass synthesis output, the coordinator identifies that the \"counterarguments\" section is thin. What is the appropriate next action, consistent with iterative refinement of multi-agent research?",
    "options": [
      "Publish the report as-is; thoroughness is the synthesis agent's sole responsibility",
      "Lower the temperature and regenerate synthesis from the same inputs",
      "Ask the user to manually supply counterarguments",
      "Re-delegate to search/analysis subagents with targeted follow-up queries, then re-invoke synthesis"
    ],
    "correct": 3,
    "explanation": "A thin section reflects missing evidence, not bad prose, so the fix is gathering more findings via targeted follow-up delegation and re-synthesizing; regenerating at a different temperature (B) can't manufacture counterarguments that were never collected.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-027",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Which best distinguishes a subagent's isolated context from the coordinator's context?",
    "options": [
      "Subagents inherit context only during the first invocation of a session",
      "Subagents do not automatically inherit the coordinator's conversation history; relevant context must be explicitly passed in",
      "Subagents share the coordinator's memory but not its tool access",
      "Subagents inherit context if and only if they use the same underlying model"
    ],
    "correct": 1,
    "explanation": "Isolation is the default behavior; relevant context must be explicitly passed in, not automatically shared via memory (C) or matched via model identity (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-028",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A research pipeline crashes mid-run due to an infrastructure failure. What design allows the coordinator to resume cleanly?",
    "options": [
      "Each agent exporting state to a known location; the coordinator loads a manifest on resume and re-injects it",
      "Relying on the model to recall its own prior progress from training data",
      "Restarting from scratch and re-running every subagent regardless of prior progress",
      "Keeping all state only in the coordinator's in-memory variables"
    ],
    "correct": 0,
    "explanation": "Externalized per-agent state plus a coordinator-read manifest is what makes clean resume possible after an infrastructure crash; relying on model recall (B) or blind full restarts (C) can't actually recover prior progress.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-029",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "The synthesis subagent is given tools for web search, document parsing, and fact verification \"just in case it needs them for edge cases.\" What risk does this create?",
    "options": [
      "It requires `fork_session` to function correctly",
      "It has no real downside since unused tools cost nothing",
      "Agents with tools outside their specialization tend to misuse them (e.g., a synthesis agent attempting its own web searches)",
      "It will always outperform a narrowly-scoped agent"
    ],
    "correct": 2,
    "explanation": "Tools outside an agent's specialization invite misuse (a synthesis agent wandering into its own web searches), which is the real cost \u2014 \"unused tools cost nothing\" (B) ignores exactly this selection risk.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-030",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Structured findings from subagents should separate content from metadata. Which of these best exemplifies that separation?",
    "options": [
      "Separate fields for `claim`, `evidence_excerpt`, `source_url`, and `publication_date`",
      "A markdown-formatted paragraph with inline citations",
      "A single string like `\"Retail vacancy hit 18% (Source: CBRE, March 2026, cbre.com/report-2026)\"`",
      "A raw dump of the source webpage's HTML"
    ],
    "correct": 0,
    "explanation": "Separate fields for claim, excerpt, source, and date keep content and provenance metadata independently addressable through further processing; a formatted string (C) or prose paragraph (B) bakes metadata into content where it's easily lost or mis-parsed.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-031",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer wants to find every file that calls a specific exported function across a large codebase. Which built-in tool is the right starting point?",
    "options": [
      "`Read`, applied to every file in the repo",
      "`Bash` with no specific command needed",
      "`Grep`, since it searches file contents for the function name",
      "`Glob`, since it searches by pattern"
    ],
    "correct": 2,
    "explanation": "Grep searches file contents for the function name, which is exactly what's needed to find every call site; Glob only matches file paths/names, not the code inside them.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-032",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer wants to locate every test file in a monorepo matching `**/*.test.tsx` regardless of directory. Which tool is correct?",
    "options": [
      "`Write`",
      "`Grep`",
      "`Glob`",
      "`Edit`"
    ],
    "correct": 2,
    "explanation": "Glob does file-path pattern matching, which is precisely suited to a glob pattern like `**/*.test.tsx`; Grep searches file contents, not paths.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-033",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "`Edit` repeatedly fails on a file because the anchor text it's trying to match appears multiple times. What is the recommended fallback?",
    "options": [
      "Switch to `Bash` with `sed` exclusively",
      "Use `Read` to load the full file, then `Write` the corrected full content",
      "Split the file into smaller files first",
      "Increase `max_tokens` and retry `Edit`"
    ],
    "correct": 1,
    "explanation": "When an anchor string isn't unique, Edit can't reliably target the right occurrence, so loading the full file with Read and rewriting it with Write sidesteps the ambiguity entirely; switching to sed loses the model's understanding of context and isn't the documented fallback.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-034",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team keeps a company-wide MCP server for Jira in `.mcp.json`, using `${JIRA_TOKEN}` for the credential. A developer also wants to experiment with a personal, unreleased MCP server without affecting teammates. Where should the personal server be configured?",
    "options": [
      "It cannot be done without modifying the shared repo config",
      "In `CLAUDE.md` as a code block",
      "In `.mcp.json` with a different key",
      "In `~/.claude.json`"
    ],
    "correct": 3,
    "explanation": "Personal/experimental MCP servers belong in the user-scoped `~/.claude.json`, keeping them invisible to teammates; putting it in `.mcp.json` (even under a different key) would land in the shared, version-controlled team config.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-035",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Claude Code keeps preferring `Grep` over a connected MCP server's more powerful `search_codebase` tool, even though the MCP tool would give better results for the developer's query. What is the most likely cause and fix?",
    "options": [
      "MCP tools always lose to built-in tools by design and this can't be changed",
      "The MCP tool is broken; disable `Grep` entirely",
      "The MCP tool's description under-sells its capability relative to the well-known built-in tool; improve the description to clarify when and why to prefer it",
      "Switch the MCP server from project scope to user scope"
    ],
    "correct": 2,
    "explanation": "Claude has a strong prior toward familiar built-ins like Grep, so an under-described MCP tool loses out by default; the fix is enhancing the description to make the capability advantage explicit, not disabling Grep or changing server scope.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-036",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer wants a \"codebase exploration\" skill whose verbose dependency-tracing output shouldn't clutter the main conversation. Which SKILL.md frontmatter option addresses this?",
    "options": [
      "`argument-hint`",
      "`paths`",
      "`allowed-tools`",
      "`context: fork`"
    ],
    "correct": 3,
    "explanation": "`context: fork` runs the skill in an isolated sub-agent context so its verbose dependency-tracing output never pollutes the main conversation; `allowed-tools` restricts tool access, not output visibility.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-037",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A skill should be limited to file-write operations only, with no ability to run destructive `Bash` commands. Which frontmatter option enforces this?",
    "options": [
      "There is no way to restrict a skill's tool access",
      "`allowed-tools`",
      "`argument-hint`",
      "`context: fork`"
    ],
    "correct": 1,
    "explanation": "`allowed-tools` directly restricts which tools a skill can invoke, letting it be scoped to file-write only; `context: fork` isolates context/output, not tool permissions.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-038",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A new hire isn't receiving the team's established coding conventions, even though a senior engineer insists \"it's all in CLAUDE.md.\" What is the most likely cause?",
    "options": [
      "The conventions live in the senior engineer's user-level `~/.claude/CLAUDE.md`, which isn't shared via version control",
      "CLAUDE.md files are cached and require a manual cache clear",
      "The new hire's IDE isn't configured to load CLAUDE.md",
      "The conventions are correctly placed in the project-level CLAUDE.md, and the new hire simply hasn't read it"
    ],
    "correct": 0,
    "explanation": "The classic failure mode is conventions living in the senior engineer's personal `~/.claude/CLAUDE.md`, which never gets committed, so new hires cloning the repo never see them; this fits better than assuming the new hire simply skipped a file that was in fact correctly placed and shared.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-039",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A monorepo has React, API, and database-model layers, each with different conventions, plus test files scattered throughout every layer. What is the most maintainable way to apply testing conventions specifically, regardless of file location?",
    "options": [
      "A `.claude/rules/testing.md` file with `paths: [\"**/*.test.*\"]` frontmatter",
      "A skill that must be manually invoked before writing any test",
      "Put a \"Testing\" section in the root CLAUDE.md and hope Claude infers when it applies",
      "Add a CLAUDE.md to every directory that happens to contain a test file"
    ],
    "correct": 0,
    "explanation": "`.claude/rules/*.md` with `paths` frontmatter applies conventions by glob pattern regardless of directory, exactly matching test files scattered across layers; per-directory CLAUDE.md files don't scale and don't follow files that move.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-040",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer is asked to add comprehensive tests to a legacy codebase with no existing test coverage and unclear module boundaries. What task-decomposition approach fits best?",
    "options": [
      "Map the codebase structure first, identify high-impact areas, then build a prioritized plan that adapts as dependencies are discovered",
      "A fixed, fully pre-specified sequential checklist decided before any exploration",
      "Escalate to a human immediately since the task is too undefined for an agent",
      "Write tests for every file in alphabetical order"
    ],
    "correct": 0,
    "explanation": "This is the textbook adaptive-decomposition case: with unclear module boundaries, mapping structure and prioritizing as dependencies are discovered beats any fixed upfront checklist, which can't account for what hasn't been explored yet.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-041",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer is debugging a single failing test with a clear stack trace pointing to one function. What's the appropriate mode?",
    "options": [
      "Plan mode, to explore alternative architectures first",
      "Fork the session to explore two different fixes in parallel",
      "Direct execution, since the change is small and well-understood",
      "Escalate to a second Claude instance for independent review before touching any code"
    ],
    "correct": 2,
    "explanation": "A clear stack trace pointing to one function is a well-understood, single-file fix, which is exactly when direct execution is appropriate; plan mode or parallel forking would be needless overhead for a task with no real ambiguity.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-042",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer describes a desired data-transformation function in prose, but Claude's implementation is inconsistent across attempts \u2014 sometimes handling edge cases differently. What is the most effective way to tighten the specification?",
    "options": [
      "Lower `max_tokens` to force a more concise implementation",
      "Provide 2\u20133 concrete input/output examples that pin down the exact expected transformation",
      "Repeat the same prose instructions with more emphatic wording",
      "Switch to a different model without changing the instructions"
    ],
    "correct": 1,
    "explanation": "Inconsistent handling across attempts signals genuine ambiguity in the prose spec, and concrete input/output examples pin down the exact expected behavior; repeating the same instructions more emphatically doesn't resolve ambiguity, it just restates it.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-043",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Before implementing a caching layer in an unfamiliar part of the codebase, a developer wants Claude to surface considerations they might not have thought of \u2014 invalidation strategy, failure modes, TTL choices \u2014 before writing any code. What technique does this describe?",
    "options": [
      "Plan mode is not applicable here since this is a single feature, not an architecture-wide task",
      "The interview pattern \u2014 having Claude ask clarifying questions before implementation",
      "Test-driven iteration",
      "Prompt chaining"
    ],
    "correct": 1,
    "explanation": "The interview pattern \u2014 having Claude surface open design questions before implementing \u2014 is designed for exactly this kind of unfamiliar-domain uncertainty; test-driven iteration assumes you can already specify expected behavior, which is what's missing here.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-044",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A code-review request surfaces three findings that interact with each other (fixing one changes the correct fix for another). What's the better way to communicate them to Claude?",
    "options": [
      "Ignore the interactions and let Claude discover them on its own",
      "Provide all three interacting issues together in a single detailed message",
      "Fix them one at a time in separate messages, waiting for each fix before mentioning the next",
      "Ask Claude to pick which one to fix first"
    ],
    "correct": 1,
    "explanation": "Because the three findings interact, fixing one changes the correct fix for another, so they must be communicated together in one message; addressing them sequentially risks rework when an earlier \"fix\" is invalidated by a later one.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-045",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team is restructuring a monolith into microservices \u2014 changes will span 45+ files, and there are multiple valid ways to draw service boundaries. What's the correct approach, and which subagent helps avoid exhausting context during the investigation phase?",
    "options": [
      "Direct execution; no subagent is needed since this is primarily a refactor",
      "Plan mode to explore and decide on an approach first, using the Explore subagent to isolate verbose discovery output",
      "Direct execution with an extremely long, fully-detailed upfront prompt describing every service boundary",
      "Plan mode, but skip subagents entirely to keep everything in one context"
    ],
    "correct": 1,
    "explanation": "Dozens of files with multiple valid service-boundary designs is squarely plan mode's use case, and the Explore subagent isolates the noisy discovery phase so it doesn't burn the main session's context; skipping subagents (D) forfeits that context-isolation benefit for no real gain.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-046",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An extraction schema marks `contract_end_date` as a required field, but many contracts in the corpus are open-ended with no end date. What happens, and what's the fix?",
    "options": [
      "Switch from `tool_use` to plain-text JSON output to avoid the issue",
      "This is expected behavior and requires no change",
      "The model may fabricate a plausible end date to satisfy the required constraint; make the field nullable/optional instead",
      "Extraction will simply fail validation every time; the schema is unusable"
    ],
    "correct": 2,
    "explanation": "With no end date anywhere in many source contracts, forcing `contract_end_date` as required pressures the model to invent a plausible-looking date rather than admit absence; making it nullable/optional removes that pressure. D overstates the failure mode (validation wouldn't fail \"every time\" \u2014 it would silently succeed with fabricated data, which is the more dangerous outcome).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-048",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "You have three extraction schemas (invoice, receipt, contract) and don't know in advance which document type will arrive, but you want to guarantee some structured extraction occurs. Which `tool_choice` setting is correct?",
    "options": [
      "`\"auto\"`",
      "Omitting `tool_choice`",
      "`{\"type\": \"tool\", \"name\": \"extract_invoice\"}`",
      "`\"any\"`"
    ],
    "correct": 3,
    "explanation": "`\"any\"` forces the model to call some tool (guaranteeing structured output) while still letting it pick which of the three schemas fits the incoming document. `\"auto\"` (the tempting alternative) would let the model bail out with plain text on an ambiguous document, defeating the stated goal of guaranteeing extraction.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-049",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An extraction validated against a JSON schema fails because a required field, `vendor_tax_id`, is missing. On investigation, the source document never contained a tax ID anywhere. What should happen next?",
    "options": [
      "Recognize that retrying is unlikely to help since the information is genuinely absent from the source; the field should have been optional",
      "Fabricate a placeholder value so the schema validates",
      "Increase `max_tokens` and retry",
      "Retry the extraction with the same prompt; retries usually resolve missing-field errors"
    ],
    "correct": 0,
    "explanation": "Since the tax ID is confirmed absent from the source document, no retry can manufacture data that was never there; the correct move is to accept the gap and make the field optional going forward. D is the trap: it assumes missing-field errors are generically retry-fixable, but that's only true for structural/formatting mistakes, not genuine source-data absence.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-050",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A validation-retry loop for extraction failures should include which of the following in the follow-up request?",
    "options": [
      "The original document, the failed extraction, and the specific validation error(s) that occurred",
      "Only the original document, without reference to the prior failed attempt",
      "A completely new document as a substitute",
      "Only a generic instruction to \"try again more carefully\""
    ],
    "correct": 0,
    "explanation": "An effective retry needs the original document, the prior failed output, and the specific validation error so the model has something concrete to correct against. A bare \"try again\" (D) or a fresh document with no error context (B, C) gives the model no signal about what actually went wrong.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-051",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A finding-tracking system for a review pipeline adds a `detected_pattern` field to every flagged issue. What is this field's purpose?",
    "options": [
      "To determine `isRetryable` status",
      "To enable systematic analysis of which code constructs trigger findings, useful for spotting false-positive patterns developers repeatedly dismiss",
      "To select which `tool_choice` mode to use next",
      "To store the model's confidence score"
    ],
    "correct": 1,
    "explanation": "Tagging findings with `detected_pattern` turns individual fixes into aggregate data, letting you spot which constructs or patterns developers repeatedly dismiss as false positives and target prompt fixes at them. It's a tracking/analytics field, not a routing or scoring mechanism, so A/C/D misattribute its purpose.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-052",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A code-review prompt already says \"only report high-confidence findings,\" yet developers report 40% of flagged issues in the \"style consistency\" category are false positives. What's the most effective next step?",
    "options": [
      "Lower the model's temperature setting",
      "Permanently remove the category so it never generates findings again",
      "Add \"be even more conservative\" to the prompt",
      "Define explicit, categorical criteria for what specifically counts as a style issue vs. what doesn't, and consider temporarily disabling the category while iterating"
    ],
    "correct": 3,
    "explanation": "\"Only report high-confidence findings\" is already vague, and 40% false positives shows vague conservatism instructions don't work; the fix is explicit categorical criteria for what counts as a style issue, with temporary category suppression while iterating. C repeats the same failed pattern (more vague conservatism language) rather than fixing the underlying ambiguity.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-053",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Few-shot examples are added to help a model select between two visually similar tools in ambiguous cases. What makes few-shot effective here, beyond simply showing input/output pairs?",
    "options": [
      "Few-shot examples eliminate the need for good tool descriptions entirely",
      "Showing the reasoning for why one tool was chosen over a plausible alternative helps the model generalize judgment to novel, unseen cases",
      "Few-shot examples work only because they increase total prompt length",
      "Few-shot examples are only useful for formatting, not for judgment calls"
    ],
    "correct": 1,
    "explanation": "Showing the reasoning behind choosing one tool over a plausible-but-wrong alternative teaches the model the underlying judgment, so it generalizes to new ambiguous cases rather than just memorizing the shown pairs. A overreaches \u2014 few-shot supplements good descriptions, it doesn't make them unnecessary.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-054",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your organization wants to move two workloads to the Message Batches API for its 50% cost savings: (a) an overnight technical-debt report and (b) a blocking pre-merge security gate that developers actively wait on. What's the correct call?",
    "options": [
      "Batch both, with a real-time fallback triggered if the batch takes too long",
      "Keep both synchronous, since batch correlation via `custom_id` is too error-prone",
      "Batch both workloads",
      "Batch only the overnight report; keep the pre-merge gate on synchronous calls"
    ],
    "correct": 3,
    "explanation": "The overnight report is latency-tolerant and fits batch's non-blocking, no-SLA processing window, but a pre-merge gate developers are actively waiting on needs real-time responsiveness batch can't guarantee. A's \"real-time fallback\" is tempting but adds complexity for a workflow that should never have been batched in the first place.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-055",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A batch submission of 200 documents returns some failures. What's the correct remediation approach?",
    "options": [
      "Switch failed documents to a completely different extraction schema",
      "Identify the failed documents by `custom_id`, and resubmit only those, adjusting for the specific cause (e.g., chunking oversized documents)",
      "Resubmit the entire batch of 200 documents from scratch",
      "Discard the failed documents permanently since batch jobs cannot be retried"
    ],
    "correct": 1,
    "explanation": "Batch failures should be triaged individually via `custom_id`, with the specific cause addressed (e.g., splitting an oversized document) before resubmitting just those items. C wastes cost/time reprocessing 198 documents that already succeeded, which defeats the point of batch's cost savings.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-056",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An extraction system reports 97% aggregate accuracy across all processed documents. A stakeholder asks whether this is sufficient to reduce human review. What should you check before answering?",
    "options": [
      "Whether the model used `tool_choice: \"auto\"` or `\"any\"`",
      "Only the accuracy of the single most common document type",
      "Nothing further \u2014 97% aggregate accuracy is sufficient on its own",
      "Accuracy broken down by document type and by field, since aggregate metrics can mask poor performance on specific segments"
    ],
    "correct": 3,
    "explanation": "A 97% aggregate can mask a document type or field with much worse accuracy, so the honest answer requires breaking the metric down before making a review-reduction call. B is the near-miss \u2014 checking only the most common type still hides poor performance on rarer-but-consequential types/fields.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-057",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "To catch novel extraction error patterns that wouldn't normally be caught by reviewing low-confidence outputs, what technique should be applied to high-confidence extractions?",
    "options": [
      "Re-run the same extraction twice and average the two outputs",
      "Stratified random sampling of high-confidence extractions for ongoing error-rate measurement",
      "Apply a stricter required-fields schema only to high-confidence cases",
      "Skip reviewing them entirely, since they're already high-confidence"
    ],
    "correct": 1,
    "explanation": "Since low-confidence outputs get reviewed by default, novel error patterns hiding in *high*-confidence outputs are only caught by proactively sampling them (stratified random sampling) for ongoing measurement. D is the failure mode this technique exists to prevent \u2014 skipping high-confidence review entirely is exactly how these errors go undetected.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-058",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Field-level confidence scores are being used to route extractions to human review. What should calibrate the routing thresholds?",
    "options": [
      "An arbitrary fixed cutoff, e.g., always exactly 80%",
      "The number of fields in the schema",
      "Thresholds calibrated using labeled validation sets, so the confidence score maps to actual accuracy",
      "The document's file size"
    ],
    "correct": 2,
    "explanation": "Thresholds are only meaningful if calibrated against labeled validation data so a given confidence score actually corresponds to a known accuracy rate; otherwise the score is just an arbitrary number. A's fixed 80% cutoff is the tempting-but-ungrounded choice \u2014 with no calibration, 80% could mean anything from 60% to 99% real accuracy.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam2-059",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "The same Claude session that generated a code fix is also used to review that fix before merge, and subtle logic errors are consistently missed. What's the underlying cause and the fix?",
    "options": [
      "`--output-format json` needs to be enabled for accurate review",
      "The session retains its generation reasoning and is less likely to challenge its own decisions; use an independent review instance without that prior context",
      "The context window is too small for review tasks; use a larger model",
      "The prompt lacks a sufficient number of few-shot examples of bugs"
    ],
    "correct": 1,
    "explanation": "The session carries its own generation-time reasoning, so it's biased toward defending its prior work rather than genuinely scrutinizing it \u2014 fresh independent instances lack that baggage and catch subtle issues more reliably. A stronger self-critical prompt can't overcome context the model already holds, since the bias is structural, not a wording problem.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-001",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A developer asks Claude to \"clean up this parsing function\" with no further detail. Three separate attempts produce three meaningfully different refactors, each reasonable in isolation but inconsistent with each other. What is the most effective way to converge on a consistent result?",
    "options": [
      "Reduce `max_tokens` so the model has less room to improvise",
      "Ask for five more attempts and pick the best one",
      "Repeat the same request with stronger emphasis (\"please be consistent this time\")",
      "Provide 2\u20133 concrete before/after examples showing exactly what \"cleaned up\" means for this codebase's style"
    ],
    "correct": 3,
    "explanation": "Three inconsistent refactors from the same vague instruction is a definitional-ambiguity problem, not a randomness problem, so 2\u20133 concrete before/after examples pinning down what \"cleaned up\" means fixes the actual cause. Reducing `max_tokens` or repeating the request with more emphasis doesn't resolve what \"clean\" means for this codebase.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-002",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Before implementing a rate-limiting feature in a service Claude hasn't seen before, a developer wants Claude to first ask about traffic patterns, failure behavior under load, and whether limits should be per-user or global. What technique does this describe, and when is it most valuable?",
    "options": [
      "Prompt chaining \u2014 valuable for any multi-step task regardless of familiarity",
      "Plan mode \u2014 but only for single-file changes",
      "Test-driven iteration \u2014 valuable only when a test suite already exists",
      "The interview pattern \u2014 most valuable in unfamiliar domains where the developer may not have anticipated key design considerations"
    ],
    "correct": 3,
    "explanation": "Asking Claude to surface traffic-pattern, failure-mode, and scoping questions before writing any code is the interview pattern, and it earns its keep specifically in unfamiliar domains where the developer hasn't already anticipated every design consideration. Prompt chaining (A) sequences already-known steps rather than surfacing unknown design questions.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-003",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A team wants Claude to build a data-migration script and has already written a test suite covering expected behavior, edge cases (including null values), and performance constraints. What is the recommended way to use these tests during development?",
    "options": [
      "Show Claude the tests once at the start, then ignore test results during implementation",
      "Iterate by sharing test failures with Claude after each attempt, letting it progressively correct the implementation",
      "Convert the tests into prose requirements instead of running them",
      "Withhold the tests until the implementation is \"done\" so Claude isn't biased toward passing them narrowly"
    ],
    "correct": 1,
    "explanation": "With tests already covering behavior, edge cases, and performance up front, the recommended loop is to hand Claude the actual failures after each attempt so it can progressively converge. Showing tests once and then ignoring results (A), or withholding them until \"done\" (D), both break the feedback loop that makes test-driven iteration work.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-004",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A pull request fixes three bugs that interact \u2014 fixing bug 1 changes the correct approach to fixing bug 2. Which approach to communicating these to Claude is better?",
    "options": [
      "Report each bug in a separate message, waiting for a fix before mentioning the next",
      "Only describe the most severe bug and let Claude discover the other two independently",
      "Ask Claude to guess which bugs might be related before describing any of them",
      "Describe all three interacting issues together in one detailed message"
    ],
    "correct": 3,
    "explanation": "Because fixing bug 1 changes the correct approach to bug 2, the issues interact, and interacting issues must be described together in one detailed message so Claude reasons about them jointly. Reporting them one at a time (A) risks Claude fixing bug 2 in a way bug 1's fix later invalidates, forcing rework.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-005",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A team is deciding between a single-file bug fix (clear stack trace, one obvious cause) and a cross-service authentication redesign (multiple valid approaches, dozens of files). Which pairing is correct?",
    "options": [
      "Direct execution for the bug fix; plan mode for the authentication redesign",
      "Plan mode for both, since plan mode is always safer",
      "Direct execution for both, since Claude Code doesn't meaningfully benefit from planning",
      "Plan mode for the bug fix; direct execution for the redesign"
    ],
    "correct": 0,
    "explanation": "A single-file bug fix with a clear stack trace is the well-understood, low-ambiguity case direct execution suits, while a cross-service redesign with multiple valid approaches and dozens of files benefits from planning before committing to changes. Treating plan mode as \"always safer\" (B) ignores the needless overhead it adds on trivial, unambiguous fixes.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-006",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A `/deploy-check` slash command should run the team's pre-deployment checklist and be available to every developer immediately after cloning the repo. Where should it live?",
    "options": [
      "`.claude/commands/deploy-check.md` in the repository",
      "A `.claude/config.json` commands array",
      "`~/.claude/commands/deploy-check.md`",
      "Inside the root `CLAUDE.md` file as a named section"
    ],
    "correct": 0,
    "explanation": "A command every developer needs immediately after cloning must be version-controlled and project-scoped, which is exactly what `.claude/commands/deploy-check.md` provides. The personal `~/.claude/commands/` location (C) is never shared via git, so a fresh clone wouldn't have it.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-007",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A \"brainstorm alternative approaches\" skill tends to produce long, exploratory output that isn't useful to keep in the main conversation once a decision is made. Which frontmatter setting addresses this?",
    "options": [
      "`context: fork`",
      "`allowed-tools`",
      "`paths`",
      "`argument-hint`"
    ],
    "correct": 0,
    "explanation": "`context: fork` runs the skill in an isolated sub-agent context, keeping the long exploratory brainstorm output out of the main conversation once a decision is made. `allowed-tools` (B) restricts which tools a skill can call, not where its output lands.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-008",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Two engineers on the same team have different personal preferences for commit-message style, but the team's actual required conventions live correctly in the project-level CLAUDE.md. One engineer also has their personal preferences saved in `~/.claude/CLAUDE.md`. What's true about this setup?",
    "options": [
      "It's broken \u2014 user-level and project-level CLAUDE.md files cannot coexist",
      "It's fine \u2014 the user-level file applies only to that engineer and doesn't affect teammates via version control",
      "Only one CLAUDE.md file can be active per repository",
      "The user-level file will silently overwrite the project-level file for everyone"
    ],
    "correct": 1,
    "explanation": "User-level and project-level CLAUDE.md files are designed to coexist and stack; the personal file at `~/.claude/CLAUDE.md` is never checked into version control, so it only affects that one engineer's own sessions. Claiming it \"silently overwrites\" the project file for everyone (D) misreads the hierarchy \u2014 personal preferences layer on top of, rather than replace, shared team conventions.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-009",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A large monorepo has different testing conventions for unit tests, integration tests, and end-to-end tests, each identifiable by filename pattern but scattered across many directories. What's the best way to load the right convention automatically based on which file is being edited?",
    "options": [
      "Three separate skills that must be manually invoked before editing each test type",
      "Three separate directory-level CLAUDE.md files, duplicated into every directory containing tests",
      "One root CLAUDE.md with three sections and hope Claude infers the right one",
      "Three separate `.claude/rules/*.md` files, each with `paths` frontmatter matching the relevant filename pattern"
    ],
    "correct": 3,
    "explanation": "Because each convention is tied to a filename pattern rather than a single directory, three `.claude/rules/*.md` files with `paths` frontmatter load automatically based on which file is being edited, regardless of location. Duplicating directory-level CLAUDE.md files into every test directory (B) doesn't scale and invites drift.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-010",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A developer wants to compare two different caching strategies starting from the same point in their investigation of a codebase, without redoing the initial exploration twice. What capability supports this?",
    "options": [
      "`--resume` with two different session names created independently",
      "`/compact` run twice",
      "`fork_session`, branching two parallel explorations from the shared baseline",
      "Restarting from scratch for each strategy"
    ],
    "correct": 2,
    "explanation": "`fork_session` is built for exactly this: branching two parallel explorations from a shared baseline so the initial investigation isn't redone. Using `--resume` with two independently created session names (A) doesn't share a common starting point the way a fork does.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-011",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A developer resumes a two-day-old session to continue a refactor, but teammates modified several of the files Claude had already analyzed in that session. Claude's suggestions reference outdated function signatures. What should have been done?",
    "options": [
      "Used `fork_session` instead of `--resume`",
      "Started an entirely new session with zero context",
      "Informed the resumed session explicitly about which files changed, prompting targeted re-analysis",
      "Increased `max_tokens` for the resumed session"
    ],
    "correct": 2,
    "explanation": "Resuming a session doesn't make Claude aware that files changed since last time; the fix is explicitly telling it which files changed so it can do targeted re-analysis. Switching to `fork_session` (A) solves a different problem (parallel branching), not stale context in a resumed session.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-012",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A skill for generating boilerplate files should never be allowed to run destructive shell commands, even accidentally. Which frontmatter field enforces this restriction directly?",
    "options": [
      "`argument-hint`",
      "`paths`",
      "`context: fork`",
      "`allowed-tools`"
    ],
    "correct": 3,
    "explanation": "`allowed-tools` frontmatter directly restricts which tools a skill can invoke, so scoping it away from shell/`Bash` access structurally prevents destructive commands. `context: fork` (C) isolates output/context, it doesn't restrict tool access.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-013",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A developer needs to trace how a specific exported utility function is used across a codebase, including through re-export wrapper modules with different names. What's the most effective approach?",
    "options": [
      "First identify all exported names for the function (including wrapper re-exports), then `Grep` for each name across the codebase",
      "`Read` every file in the repository upfront to build full context before searching",
      "`Glob` for `**/*.ts` and manually scan the output",
      "Ask the user to supply the call sites manually"
    ],
    "correct": 0,
    "explanation": "Wrapper re-exports mean the function may be called under several different names, so all of them must be enumerated before `Grep` can find every call site; grepping only the original name would miss usages through renamed re-exports. Reading every file upfront (B) is the anti-pattern the built-in exploration pattern warns against \u2014 start with targeted search, not full reads.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-014",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "During a long exploration session tracing a legacy codebase's dependency graph, Claude starts giving vague answers referencing \"typical patterns\" instead of the specific classes it examined 90 minutes earlier. What's the most direct fix?",
    "options": [
      "Increase `max_tokens` on each subsequent call",
      "Switch to a different underlying model mid-session",
      "Have the agent maintain a scratchpad file recording key findings, and reference it for subsequent questions",
      "Restart with zero context and re-explore from scratch"
    ],
    "correct": 2,
    "explanation": "Vague \"typical patterns\" answers after 90 minutes of exploration signal context degradation, not a capacity problem, so a scratchpad file persisting specific findings (the classes actually examined) directly counters it. Increasing `max_tokens` (A) doesn't address the model losing track of specifics it already found.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-015",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A task requires exploring an unfamiliar codebase's structure without exhausting the main session's context on verbose file-by-file discovery output. Which capability is designed for this?",
    "options": [
      "`fork_session`",
      "`/memory`",
      "The Explore subagent",
      "`context: fork` applied to CLAUDE.md"
    ],
    "correct": 2,
    "explanation": "The Explore subagent isolates verbose file-by-file discovery output during structure-mapping tasks, so the main session's context isn't exhausted by exploration noise. `fork_session` (A) is for branching parallel investigations from a shared point, not for keeping exploration noise out of the main session in the first place.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-016",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A CI job runs `claude \"Review this PR for security issues\"` and hangs indefinitely. What's the fix?",
    "options": [
      "Redirect `/dev/null` into stdin",
      "`claude -p \"Review this PR for security issues\"`",
      "Set `CLAUDE_HEADLESS=true` as an environment variable",
      "Add a `--batch` flag"
    ],
    "correct": 1,
    "explanation": "`claude -p \"...\"` runs non-interactively, which is exactly what prevents a CI job from blocking while waiting on a stdin prompt. A (piping `/dev/null`) is a hacky workaround at best, and C/D reference an env var and flag that don't actually exist \u2014 classic plausible-but-fictional distractors.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-017",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "The team wants automated review findings posted as individual inline PR comments by a script, requiring machine-parseable output rather than free-form prose. Which combination of flags supports this?",
    "options": [
      "`--resume` with a named session",
      "`-p` alone is sufficient",
      "`fork_session` for each file reviewed",
      "`--output-format json` combined with `--json-schema`"
    ],
    "correct": 3,
    "explanation": "`--output-format json` combined with `--json-schema` forces genuinely schema-compliant, machine-parseable findings a script can split into individual inline comments. `-p` alone (B) only makes the run non-interactive; it says nothing about the shape of the output.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-018",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A CI pipeline re-runs code review after each new commit to a PR, and developers complain about receiving duplicate comments for issues already flagged (and already acknowledged as \"won't fix\") in the previous run. What should change?",
    "options": [
      "Disable review entirely after the first commit",
      "Nothing \u2014 duplicate comments are unavoidable with automated review",
      "Include prior review findings in context on re-runs, and instruct Claude to report only new or still-unaddressed issues",
      "Switch to `--output-format json` only, without changing the prompt"
    ],
    "correct": 2,
    "explanation": "Feeding prior review findings (including ones already dismissed as \"won't fix\") into context and instructing Claude to report only new/unaddressed issues fixes the actual root cause: each re-run currently has no memory of what was already flagged. Disabling review (A) or shrugging off duplicates as unavoidable (B) discard the tool's value instead of fixing the re-run design.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-019",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A CI-triggered test-generation step keeps suggesting test cases that duplicate scenarios already covered in the existing test suite. What's the most direct fix?",
    "options": [
      "Increase the model's `max_tokens` for test generation",
      "Run test generation twice and manually deduplicate",
      "Provide the existing test files in context so generation avoids already-covered scenarios",
      "Switch to a different CI runner"
    ],
    "correct": 2,
    "explanation": "Providing the existing test files in context directly closes the information gap causing redundant suggestions \u2014 the model simply can't avoid duplicating coverage it can't see. Running generation twice and manually deduping (B) treats the symptom while doubling cost.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-020",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "The same Claude Code session that generated a bug fix is also used, immediately afterward, to review that fix before merge \u2014 and subtle logic errors keep slipping through to a human reviewer instead. What's the underlying issue?",
    "options": [
      "The context window is too small to hold both the fix and the review",
      "The session retains reasoning from generation and is less likely to challenge its own prior decisions; use an independent instance for review",
      "`--output-format json` wasn't enabled during review",
      "The prompt needs more few-shot examples of what bugs look like"
    ],
    "correct": 1,
    "explanation": "The session retains its own generation reasoning and is structurally less inclined to challenge decisions it just made, so an independent review instance is the fix \u2014 not a config flag (C) or more few-shot examples (D). This exact pattern shows up in both the CI/CD-workflow material and the multi-instance-review material, so it genuinely straddles both domains rather than being a clean D3-vs-D4 call.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-021",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Your CI system wants Claude to auto-generate high-value tests rather than generic boilerplate assertions. What should be documented in CLAUDE.md to improve this?",
    "options": [
      "The CI provider's internal infrastructure details",
      "Testing standards, valuable test criteria, and available fixtures/conventions",
      "The full list of every function in the codebase",
      "Nothing \u2014 test quality is purely a function of model capability"
    ],
    "correct": 1,
    "explanation": "Documenting testing standards, what makes a test valuable, and available fixtures/conventions in `CLAUDE.md` gives the model the missing project-specific judgment it needs to generate high-value tests instead of boilerplate. Dumping every function (C) or citing CI infra details (A) doesn't address *what makes a test worth writing*.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-022",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A 14-file PR review produces contradictory findings \u2014 a pattern flagged as a bug in one file and approved as fine in another file within the same PR. What's the best structural fix?",
    "options": [
      "Use a model with a larger context window and re-run as a single pass",
      "Require three full-PR passes and keep majority-vote findings",
      "Ask developers to manually pre-split the PR into under-4-file chunks",
      "Split the review into focused per-file passes for local issues, plus a separate cross-file integration pass"
    ],
    "correct": 3,
    "explanation": "Splitting into focused per-file passes for local issues plus a separate cross-file integration pass directly fixes the attention-dilution problem causing contradictory findings across a 14-file review. A bigger model in a single pass (A) or brute-force majority voting across three full-PR passes (B) don't address the structural cause; offloading the split to developers (C) isn't a tooling fix at all.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-023",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A team wants to move their nightly automated code-review job for `main` (no human waiting on results) to reduce API costs. Which approach fits, and why?",
    "options": [
      "Message Batches API \u2014 it's non-blocking and latency-tolerant, well suited to overnight jobs, at 50% lower cost",
      "Message Batches API is inappropriate here since it lacks multi-turn tool calling",
      "Batch it, but only if a real-time SLA under one hour can be guaranteed",
      "Keep it fully synchronous, since batch jobs cannot run unattended"
    ],
    "correct": 0,
    "explanation": "An unattended overnight job with no one waiting on results is exactly the non-blocking, latency-tolerant case the Message Batches API is built for, at roughly 50% lower cost. B is wrong since multi-turn tool calling isn't needed for a review job like this, and C/D impose constraints (SLA guarantee, staying synchronous) that don't apply to an unattended nightly run.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-024",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Developers report that automated review flags a specific pattern as a \"style\" issue 40% of the time incorrectly, eroding trust in the tool overall \u2014 including in categories that are actually accurate. What should be done?",
    "options": [
      "Turn off all automated review categories permanently",
      "Nothing; false positives in one category don't affect trust in others",
      "Add \"please be more careful\" to the prompt",
      "Define explicit criteria for that category and consider temporarily disabling it while iterating, to protect trust in the accurate categories"
    ],
    "correct": 3,
    "explanation": "A 40%-false-positive category is actively eroding trust in categories that are accurate, so defining explicit criteria for that category (and considering temporarily disabling it while iterating) protects overall trust in the tool. Vague reinforcement like \"be more careful\" (C) doesn't fix ill-defined criteria, and permanently killing all categories (A) overcorrects.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-025",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A CI review prompt currently says \"flag anything that seems off.\" What change would most reduce false positives?",
    "options": [
      "Require unanimous agreement from three separate runs before flagging anything",
      "Add \"only flag things you're very confident about\"",
      "Lower the sampling temperature to 0",
      "Replace the vague instruction with specific, categorical criteria (e.g., \"flag a comment only when claimed behavior contradicts actual code behavior\")"
    ],
    "correct": 3,
    "explanation": "Replacing \"flag anything that seems off\" with specific, categorical criteria (e.g., claimed vs. actual behavior contradiction) removes the ambiguity that vague instructions can't resolve. \"Only flag things you're very confident about\" (B) is exactly the kind of vague reinforcement that's been shown not to reduce false positives.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-026",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A CI pipeline needs Claude to generate a PR summary, then a set of suggested reviewers, then a risk score \u2014 as three separate, dependent steps where each step's output feeds the next. Which pattern best matches this?",
    "options": [
      "`fork_session` to branch each step independently",
      "Parallel subagent spawning via the Task tool",
      "Dynamic/adaptive decomposition, since the steps are open-ended",
      "Prompt chaining \u2014 a fixed sequential pipeline of well-understood, ordered steps"
    ],
    "correct": 3,
    "explanation": "Three fixed, ordered, well-understood steps where each output feeds the next is the textbook definition of prompt chaining, not open-ended/adaptive decomposition (C), which is for investigations where next steps depend on unknown findings.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-027",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Which CLI flag is specifically intended to prevent a CI job from hanging on interactive prompts?",
    "options": [
      "`--resume`",
      "`--json-schema`",
      "`-p` / `--print`",
      "`--output-format`"
    ],
    "correct": 2,
    "explanation": "`-p` / `--print` is specifically the non-interactive mode flag that prevents hanging on stdin in a CI context; the other options control output formatting or session continuity, not interactivity.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-028",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A batch code-review job covering 500 files returns partial failures. What's the correct remediation?",
    "options": [
      "Discard failed files permanently, since batches can't be retried",
      "Identify failures by `custom_id` and resubmit only those, adjusting for the specific failure cause",
      "Switch the entire job to synchronous calls going forward",
      "Resubmit the entire batch of 500 files"
    ],
    "correct": 1,
    "explanation": "Batch requests correlate to responses via `custom_id`, so failures can be precisely identified and only those resubmitted with an adjustment for the specific cause. Discarding failures (A) or resubmitting the full 500-file batch (D) wastes cost and ignores the correlation mechanism the API provides for exactly this situation.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-029",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A CI test-generation job has an SLA requiring results within 30 hours of PR creation, using the Message Batches API's 24-hour processing window. How should submission timing be handled?",
    "options": [
      "Submit at a frequency (e.g., every 4\u20136 hours) that guarantees any given PR's batch completes within the 24-hour window, leaving buffer against the 30-hour SLA",
      "Switch to real-time calls entirely, since batch has no SLA guarantee",
      "Submit immediately when the PR opens and hope it completes in time",
      "Submit only once daily at midnight regardless of PR volume"
    ],
    "correct": 0,
    "explanation": "Since the Batches API offers no latency SLA within its up-to-24-hour window, submitting on a cadence (e.g., every 4-6 hours) bounds worst-case wait-before-submission plus processing time comfortably under the 30-hour deadline. Submitting immediately \"and hoping\" (C) or batching only once daily regardless of volume (D) either lacks a deliberate buffer or risks a PR opened right after the daily cutoff blowing the SLA.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-031",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Production logs show the agent skips `get_customer` in 15% of cases when the customer volunteers their name, occasionally leading to an incorrect account being modified. What is the most reliable fix?",
    "options": [
      "Add few-shot examples showing correct verification order",
      "Build a routing classifier to detect which tools are relevant per request",
      "Add a programmatic prerequisite that blocks `lookup_order`/`process_refund` until `get_customer` returns a verified ID",
      "Strengthen the system prompt's wording around verification being \"mandatory\""
    ],
    "correct": 2,
    "explanation": "This mirrors the classic verify-before-refund anti-pattern: a probabilistic fix (better wording, few-shot examples) still leaves a non-zero failure rate on a task with account-modification consequences, so only a structural prerequisite hook can guarantee `get_customer` runs first. D sounds intuitive but \"mandatory\" language is exactly the kind of prompt-only fix that produced the 15% failure rate in the first place.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-032",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A support agent has tools `get_customer` and `lookup_order` with minimal descriptions, and misroutes order-status questions to `get_customer`. What should be tried first, before adding few-shot examples or restructuring tools?",
    "options": [
      "Expand both descriptions with input formats, example queries, and explicit boundaries distinguishing the two",
      "Build a pre-processing keyword router",
      "Merge the tools into one generic tool",
      "Force `tool_choice` to always select `lookup_order`"
    ],
    "correct": 0,
    "explanation": "Tool description quality is the primary, lowest-effort lever for tool-selection accuracy and should always be tried before few-shot examples, routing layers, or restructuring. Merging (C) or forcing a single tool (D) are overcorrections that break legitimate use cases for the other tool.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-033",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A `PostToolUse` hook is used to convert `lookup_order`'s Unix timestamps and `get_customer`'s ISO 8601 dates into one consistent format before the model reasons about them. What category of problem does this solve?",
    "options": [
      "Tool selection ambiguity",
      "Data-format inconsistency across tools feeding into the model's context",
      "Batch request correlation",
      "Escalation calibration"
    ],
    "correct": 1,
    "explanation": "Normalizing heterogeneous timestamp/date formats via a `PostToolUse` hook is precisely a data-format consistency fix so the model reasons over clean, comparable values instead of misinterpreting formats; it isn't about which tool to call (A) or escalation (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-034",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A refund-processing hook blocks any `process_refund` call above $500 and redirects to `escalate_to_human`. Which statement correctly characterizes this design choice?",
    "options": [
      "It only works if paired with the Message Batches API",
      "It provides deterministic, guaranteed enforcement of a business rule that a prompt alone cannot guarantee",
      "It should be replaced by a confidence-score threshold instead",
      "It's unnecessary since the system prompt already states the $500 limit"
    ],
    "correct": 1,
    "explanation": "A pre-call hook that blocks and redirects above a dollar threshold provides deterministic enforcement independent of model behavior, whereas the system prompt alone (D) or a confidence-score threshold (C) only reduce, not eliminate, the failure rate on a rule with real financial consequences.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-035",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A multi-issue customer message (a billing dispute and a delivery delay) is handled by resolving only the first-mentioned issue and silently dropping the second. What's the correct decomposition approach instead?",
    "options": [
      "Ask the customer to resend their message with only one issue at a time",
      "Randomly pick which issue to address based on severity keywords",
      "Escalate immediately since multi-issue messages are too complex",
      "Decompose into the distinct items, investigate each with shared context, then synthesize one unified resolution covering both"
    ],
    "correct": 3,
    "explanation": "Multi-issue requests need decomposition into distinct items, investigation of each with shared context, then a single synthesized resolution \u2014 mirroring the per-item-then-synthesis pattern used elsewhere in task decomposition. Silently dropping or randomly prioritizing one issue (B) or offloading the problem to the customer (A) both abandon the second issue instead of resolving it.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-036",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "`lookup_order` returns multiple matching orders for the identifiers given. What's the correct handling, and why?",
    "options": [
      "Escalate immediately without attempting disambiguation",
      "Process the request against the first match returned",
      "Ask for an additional identifier to disambiguate, rather than guessing",
      "Select heuristically (e.g., most recent), since customers usually mean their latest order"
    ],
    "correct": 2,
    "explanation": "Multiple ambiguous matches call for requesting an additional identifier rather than guessing; picking the \"most recent\" (D) or first result (B) risks acting on the wrong account/order, which is exactly the kind of identity/data risk this domain flags as needing disambiguation, not heuristics.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-037",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "When escalating a case to a human agent who has no access to the conversation transcript, what should the structured handoff include?",
    "options": [
      "Just a one-line description of the customer's mood",
      "Only the ticket's timestamp",
      "The full raw conversation log, unformatted, with no summary",
      "Customer details, root cause analysis, and a recommended action"
    ],
    "correct": 3,
    "explanation": "Since the human has no transcript access, the handoff must substitute for that missing context: customer details, root cause, and a recommended action. A raw, unformatted transcript (C) reintroduces the token-bloat problem instead of giving the human an actionable summary.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-038",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "An agent is given 18 tools spanning billing, shipping, loyalty programs, and account management, and tool-selection accuracy for its core support tasks has dropped. What's the most appropriate fix?",
    "options": [
      "Add more few-shot examples covering every possible tool combination",
      "Force `tool_choice: \"any\"` to guarantee some tool gets called",
      "Increase `max_tokens` for reasoning about tool choice",
      "Scope the agent to only the 4\u20136 tools relevant to its actual role"
    ],
    "correct": 3,
    "explanation": "Scoping the agent to the 4\u20136 tools relevant to its actual role directly addresses selection-accuracy degradation caused by tool-list bloat; adding more few-shot examples (A) doesn't fix the root over-provisioning problem and doesn't scale to every combination of 18 tools.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-039",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A `lookup_order` call fails due to a backend timeout. Which response correctly distinguishes this from a valid empty result?",
    "options": [
      "Return a generic \"no data\" string",
      "Return `isError: true` with `errorCategory: \"transient\"`, `isRetryable: true`, and a description of what was attempted",
      "Return an empty array and mark the call successful",
      "Silently retry forever without informing the coordinator/caller"
    ],
    "correct": 1,
    "explanation": "A backend timeout is an access failure, not a valid empty result, so it must be reported with `isError: true`, a `transient` category, retryability, and context on what was attempted \u2014 conflating it with an empty-but-successful result (C) hides a recoverable failure from the coordinator.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-040",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "First-contact resolution sits at 55% against an 80% target; logs show the agent escalates simple, well-evidenced cases while attempting to autonomously resolve cases that actually require policy exceptions. What's the most effective fix?",
    "options": [
      "A separately trained ML classifier on historical tickets",
      "Self-reported confidence-score routing",
      "Sentiment-based escalation",
      "Explicit escalation criteria with few-shot examples distinguishing escalate-vs-resolve cases"
    ],
    "correct": 3,
    "explanation": "The described failure (escalating easy cases, autonomously resolving cases needing policy exceptions) is a criteria-calibration problem, best fixed with explicit escalate-vs-resolve criteria and few-shot examples; confidence scores (B) and sentiment (C) are both known-unreliable proxies for actual case complexity.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-041",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A 20-turn support conversation is progressively summarized, and a specific dollar amount and order number mentioned early on are lost from the summary by turn 18, causing the agent to ask the customer to repeat themselves. What's the direct fix?",
    "options": [
      "Increase the context window size",
      "Disable summarization for the whole conversation",
      "Maintain a persistent \"case facts\" block (amount, order ID, dates) that rides along outside the summarized narrative",
      "Ask the customer to restate key facts every turn as a matter of policy"
    ],
    "correct": 2,
    "explanation": "A persistent case-facts block for hard data (amounts, order IDs, dates) that rides outside the summarized narrative directly prevents progressive summarization from dropping numbers the agent needs later. Disabling summarization entirely (B) or expanding the context window (A) don't address the actual mechanism of loss.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-042",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A customer explicitly and calmly states, \"Please transfer me to a human,\" at the very start of an otherwise simple, resolvable interaction. What should happen?",
    "options": [
      "Attempt to resolve the issue first, since it appears simple, then transfer if the customer insists again",
      "Offer an incentive to keep the customer with the automated agent",
      "Escalate immediately, honoring the explicit request without first attempting investigation",
      "Ask why they want a human before proceeding either way"
    ],
    "correct": 2,
    "explanation": "An explicit, calm request for a human should be honored immediately without first attempting resolution, per the escalation-trigger rule that explicit requests bypass investigation regardless of how simple the issue looks. Option A's \"try to resolve first\" directly violates that honor-the-explicit-request principle.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-043",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Which best describes the risk of using self-reported model confidence scores as the primary escalation trigger?",
    "options": [
      "Confidence scores can't be produced without `context: fork`",
      "Self-reported confidence is often poorly calibrated \u2014 the model can be confidently wrong precisely on the hardest cases",
      "Confidence scores require the Message Batches API",
      "Confidence scores are computationally expensive to generate"
    ],
    "correct": 1,
    "explanation": "Self-reported confidence is a poorly calibrated signal \u2014 models can be confidently wrong precisely on the hardest, most nuanced cases \u2014 which is why it's listed as an unreliable escalation trigger. The other options (batches API, `context: fork`, compute cost) are irrelevant technical distractors.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-044",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A policy document addresses refund exceptions for damaged goods but says nothing about refund exceptions for goods lost in transit. A customer requests exactly this kind of exception. What should the agent do?",
    "options": [
      "Apply the damaged-goods policy by analogy without escalating",
      "Deny the request since it isn't explicitly authorized",
      "Approve the request since it isn't explicitly denied",
      "Escalate, since this is a policy gap rather than a straightforward case"
    ],
    "correct": 3,
    "explanation": "A policy that is silent on the specific scenario (lost-in-transit) is a genuine policy gap, and the correct trigger for silence/ambiguity is escalation \u2014 not extending policy by analogy (A) or unilaterally denying/approving (B, C) a case the policy never addressed.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-046",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "An extraction pipeline validates against a JSON schema and a required field, `purchase_order_number`, fails validation because it's missing. Investigation confirms the source invoice genuinely never included a PO number. What's the correct interpretation?",
    "options": [
      "Increase `max_tokens` and retry",
      "This retry is unlikely to succeed since the information doesn't exist in the source; the field should be nullable instead of required",
      "Retry with the same prompt; missing-field errors are always retry-fixable",
      "The schema needs a stricter type constraint"
    ],
    "correct": 1,
    "explanation": "The invoice genuinely never had a PO number, so no amount of retrying manufactures data that isn't in the source; the fix is upstream, making the field nullable. Increasing `max_tokens` (A) or retrying the same prompt (C) can't invent missing information, and a stricter type constraint (D) doesn't address absence.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-047",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A validation-retry loop needs to correct a structural JSON error (a nested array flattened incorrectly) on the second attempt. What should the follow-up prompt include?",
    "options": [
      "Nothing \u2014 `tool_use` with schemas should never produce structural errors, so no retry should be needed",
      "The original document, the failed extraction output, and the specific validation error describing the structural mismatch",
      "A brand-new, unrelated example document",
      "Only a repeated instruction to \"format correctly this time\""
    ],
    "correct": 1,
    "explanation": "A structural error like a flattened array is retry-fixable, but only if the follow-up gives new information to correct against: the original document, the failed output, and the specific validation error. Repeating \"format correctly\" (D) or an unrelated example (C) provides no diagnostic signal, and assuming schema-enforced tools can never produce structural errors (A) is false.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-048",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Which statement correctly distinguishes what `tool_use` with a JSON schema does and does not guarantee?",
    "options": [
      "It guarantees semantic correctness but not syntactic validity",
      "It guarantees syntactic (schema-compliant) validity but not semantic correctness (e.g., values landing in the wrong field or totals not summing)",
      "It guarantees neither, and offers no benefit over plain-text JSON output",
      "It guarantees both syntactic validity and semantic correctness of extracted values"
    ],
    "correct": 1,
    "explanation": "`tool_use` with a schema guarantees the output parses and matches the schema's structure (syntactic validity) but cannot verify that values are semantically correct, e.g., a total that doesn't sum or a value in the wrong field. D overclaims that semantic correctness is also guaranteed, which is exactly the gap a `calculated_total` vs. `stated_total` check exists to catch.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-049",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "An enum field for expense category needs to remain useful even as new, unanticipated categories appear in documents over time. What schema pattern handles this well?",
    "options": [
      "Multiple boolean flags, one per possible category",
      "A required string field with no enum constraint at all",
      "A closed enum with no fallback option",
      "An enum with an `\"other\"` value paired with a free-text `category_detail` field"
    ],
    "correct": 3,
    "explanation": "Pairing an `\"other\"` enum value with a free-text `category_detail` field lets the schema absorb novel categories without breaking validation while still capturing detail. A closed enum (C) breaks on any new category, dropping the enum (B) sacrifices validation entirely, and per-category booleans (A) can't scale to unanticipated categories.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-050",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Which best describes the purpose of a `detected_pattern` field attached to each automated finding in a review or extraction pipeline?",
    "options": [
      "It determines whether `tool_choice` should be `\"auto\"` or `\"any\"`",
      "It stores the model's self-reported confidence",
      "It enables systematic downstream analysis of which specific patterns trigger findings, useful for spotting recurring false-positive causes",
      "It flags whether a finding is retryable"
    ],
    "correct": 2,
    "explanation": "Tagging findings with the specific pattern that triggered them turns one-off fixes into an aggregate signal for spotting recurring false-positive causes. It's unrelated to `tool_choice` (A), isn't a confidence score (B), and doesn't indicate retryability (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-051",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Few-shot examples are added to an extraction prompt specifically to handle documents with varied structures \u2014 some using inline citations, others using bibliographies, some embedding methodology details inline versus in a separate section. What is the main benefit?",
    "options": [
      "They demonstrate correct handling of structural variety, helping the model generalize to formats not explicitly shown",
      "They guarantee the model will never omit a field",
      "They eliminate the need for a JSON schema entirely",
      "Few-shot examples primarily reduce token usage"
    ],
    "correct": 0,
    "explanation": "Showing a few examples across genuinely different document structures teaches the underlying judgment (how to locate methodology or citations regardless of layout), letting the model generalize to formats not explicitly shown. Few-shot examples don't guarantee zero omissions (B), don't replace schema enforcement (C), and typically add tokens rather than reduce them (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-052",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "An extraction pipeline is being scaled from a 20-document pilot to a 5,000-document production run using the Message Batches API. What should happen before the full run?",
    "options": [
      "Switch to synchronous calls for the full run instead of batch",
      "Submit all 5,000 immediately to save time",
      "Refine the prompt against a smaller sample set first to maximize first-pass success and reduce costly iterative resubmission at scale",
      "Skip validation entirely for the full run since the pilot already passed"
    ],
    "correct": 2,
    "explanation": "At 5,000-document scale with batch turnaround up to 24 hours and no latency SLA, discovering a prompt flaw only after the full run is enormously costly, so refining against a smaller sample first maximizes first-pass success. Submitting everything immediately (B) or skipping validation (D) both forfeit the cheap chance to catch systematic errors early, and abandoning batch (A) throws away the reason for using it.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-053",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A stakeholder wants to know if a 96% aggregate extraction accuracy is good enough to safely reduce human review across the board. What should be checked first?",
    "options": [
      "The average length of the source documents",
      "Accuracy broken down by document type and by individual field, since aggregate numbers can mask segment-specific failure",
      "Whether `--json-schema` was used during extraction",
      "Nothing further; 96% aggregate is a strong number on its own"
    ],
    "correct": 1,
    "explanation": "A 96% aggregate can hide a document type or field performing far worse, so only a by-type, by-field breakdown reveals whether review can safely be reduced broadly or only for specific segments. Document length (A) and whether a schema flag was used (C) don't address the masking risk, and accepting the aggregate at face value (D) is the exact mistake stratified analysis prevents.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-054",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Field-level confidence scores are used to route low-confidence extractions to human reviewers with limited capacity. What should determine the confidence threshold used for routing?",
    "options": [
      "Calibration against a labeled validation set so the threshold maps to actual accuracy",
      "The number of required fields in the schema",
      "The size of the review team, independent of accuracy data",
      "An arbitrary round number chosen for simplicity"
    ],
    "correct": 0,
    "explanation": "A threshold is only meaningful if tied to what confidence level actually predicts correctness, which requires calibration against labeled ground truth. Sizing it to schema field count (B), team headcount (C), or an arbitrary round number (D) fits the threshold to convenience rather than actual error risk.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-055",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Two extracted values for the same metric conflict because they come from two source documents published a year apart, representing a genuine change over time rather than an error. What structured field, if present, would have prevented this from being misread as a contradiction?",
    "options": [
      "Publication or data-collection date fields on each extracted value",
      "`isRetryable`",
      "`tool_choice`",
      "`errorCategory`"
    ],
    "correct": 0,
    "explanation": "Attaching a publication or data-collection date to each extracted value lets downstream synthesis recognize a legitimate change over time rather than flag a contradiction. `isRetryable` (B), `tool_choice` (C), and `errorCategory` (D) are extraction-mechanics fields that say nothing about when the underlying fact was true.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-056",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "Which best describes when retrying a failed extraction is NOT likely to help?",
    "options": [
      "When the required information is genuinely absent from the source document entirely",
      "When the model swapped two adjacent fields",
      "When the validation error indicates a structural/format mismatch that's fixable through clearer instructions",
      "When a nested array was flattened incorrectly"
    ],
    "correct": 0,
    "explanation": "Retrying only helps when there's new information or clearer instruction to converge on; if the value was never in the source document, no retry can invent it. Swapped fields (B), flattened arrays (D), and structural/format mismatches (C) are exactly the error class a specific validation error message can fix.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-057",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "An extraction schema requires `stated_total` and also asks the model to compute `calculated_total` from the line items. What is the purpose of including both?",
    "options": [
      "Enabling downstream detection of semantic mismatches (the two numbers disagree) that schema validation alone wouldn't catch",
      "Redundancy for its own sake",
      "To satisfy `tool_choice: \"any\"` requirements",
      "To reduce the number of required fields elsewhere"
    ],
    "correct": 0,
    "explanation": "Requiring both the stated and a model-computed total creates a downstream check schema validation alone can't perform: if the two disagree, something is semantically wrong even in well-formed JSON. It isn't redundancy for its own sake (B), unrelated to `tool_choice` (C), and doesn't reduce required fields elsewhere (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-058",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A synthesis-style extraction task combines financial figures, narrative commentary, and technical specifications from a single source document into one structured output. How should each content type be rendered in the final structured output?",
    "options": [
      "Only the financial figures should be kept; other content types should be dropped",
      "Appropriately to its type \u2014 e.g., financial data as tables, narrative as prose, technical specs as structured lists",
      "Uniformly as plain paragraphs regardless of content type",
      "Entirely as a single JSON blob with no formatting distinctions"
    ],
    "correct": 1,
    "explanation": "Financial figures, narrative, and specs carry different information shapes, and collapsing them into one uniform format throws away structure that's cheap to preserve and useful downstream. Dropping non-financial content (A) discards real information, and forcing everything into plain paragraphs (C) or an undifferentiated JSON blob (D) both erase distinctions the source document actually has.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam3-059",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Code Generation with Claude Code",
    "question": "A document-extraction pipeline needs to guarantee some structured output happens across three possible schemas, without the model ever responding with plain conversational text instead of calling a tool. Which `tool_choice` value should NOT be used here?",
    "options": [
      "`\"auto\"`",
      "Both B and C are acceptable depending on certainty about document type",
      "`\"any\"`",
      "A forced specific tool name, if the document type is already known"
    ],
    "correct": 0,
    "explanation": "`\"auto\"` explicitly permits the model to answer with plain text instead of calling any tool, which is the one outcome this pipeline must prevent; `\"any\"` and a forced tool name both guarantee a tool call happens. B is a distractor implying conditionality where none exists \u2014 either \"any\" or a forced name alone already satisfies the guarantee.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-001",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your resolution agent has a `PreToolUse` hook that blocks `process_refund` calls exceeding $750. Logs show the hook is working correctly \u2014 every blocked refund is correctly identified. However, first-contact resolution dropped 12% in the last month. Investigation reveals that many customers' refund requests between $400\u2013$750 are now being incorrectly escalated even though policy allows them, and the agent is calling `escalate_to_human` before ever attempting `process_refund`. What's the issue?",
    "options": [
      "The threshold is set too high; lower it to $500 to prevent false escalations",
      "The hook is correct, but the agent's premature escalation suggests the `process_refund` tool description doesn't make clear that it handles amounts up to the threshold",
      "The hook should use `PostToolUse` instead of `PreToolUse` to allow the refund attempt first",
      "Replace the hook with a system-prompt instruction that lists the threshold explicitly"
    ],
    "correct": 1,
    "explanation": "The hook enforcement is doing its job; the defect is upstream. The agent escalates *before* attempting `process_refund` because it doesn't understand the tool can handle refunds up to $750 \u2014 that's a description problem, not a hook problem. Lowering the threshold (A) doesn't touch the premature-escalation behavior, and PostToolUse (C) would let the over-threshold refund attempt happen before blocking it, which is worse, not better.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-002",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your support agent integrates with two MCP tools: `lookup_legacy_order` (for orders from 2+ years ago) and `lookup_recent_order` (for current orders). Both return `{\"isError\": true, \"message\": \"Lookup failed\"}` for any failure \u2014 timeout, invalid order ID, or permission denied. The agent sometimes retries timeouts unnecessarily and sometimes gives up on permission errors that should escalate instead. What's the root cause?",
    "options": [
      "The tools need better descriptions so the agent picks the correct one first",
      "The tool results lack structured error metadata (`errorCategory`, `isRetryable`); the agent can't distinguish a retryable timeout from a non-retryable permission failure",
      "The agent should use `tool_choice: \"any\"` to force it to select one of the two tools",
      "The MCP server is responding too quickly; add artificial delays so the model sees a timeout signal"
    ],
    "correct": 1,
    "explanation": "A flat `isError: true` with no category tells the agent nothing about whether to retry, escalate, or move on. `errorCategory` and `isRetryable` let it distinguish a retry-safe timeout from a permission failure that needs escalation instead. Better descriptions (A) fix tool *selection*, not recovery after a call has already failed.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-003",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A customer named \"Utkarsh Agarwal\" matches 5 accounts in the system: four inactive, one active from last month. The agent selects the active account without asking for clarification. That account belongs to a different customer with the same name \u2014 the agent processes a $340 refund for the wrong person. What's the correct behavior when a lookup returns multiple matches?",
    "options": [
      "Pick the most recently active account, since it's the most likely match",
      "Ask the customer for an additional identifier before proceeding",
      "Process the request against all matching accounts and let the customer confirm afterward",
      "Escalate immediately, since multi-match lookups are inherently too ambiguous to handle autonomously"
    ],
    "correct": 1,
    "explanation": "Ambiguous multi-match lookups should never be resolved by a heuristic like recency; ask for another identifier (email, phone, order number) to disambiguate safely. Guessing based on recent activity (A) is exactly the anti-pattern that caused the wrong-customer refund here.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-004",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A customer messages: \"I need to return a wireless headset AND I'm being charged twice for my subscription.\" The agent decomposes this into two concerns and investigates the billing dispute first, finding a duplicate charge and auto-refunding $15. Only afterward does it address the return, discovering the headset was purchased as part of a non-refundable promotional bundle 45 days ago, and escalates the return. The customer is upset because the billing refund had already gone through before the return was found to be ineligible. What went wrong?",
    "options": [
      "The agent should have escalated both concerns immediately instead of attempting autonomous resolution",
      "The agent should have investigated eligibility/prerequisites across both concerns before issuing any refund, not resolve one item to completion before even starting to investigate the other",
      "The agent picked the wrong concern to address first; pure ordering shouldn't matter otherwise",
      "The agent needed stronger prompting to handle multi-concern messages"
    ],
    "correct": 1,
    "explanation": "The failure isn't that the agent worked on the wrong concern first \u2014 it's that it fully executed one concern (issuing a refund) before checking prerequisites relevant to the other. Eligibility and prerequisite checks across all concerns should happen before any high-stakes action is taken, precisely because refunds are hard to unwind once issued.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-005",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your agent has access to four tools: `get_customer`, `lookup_order`, `process_refund`, and `escalate_to_human`. Metrics show 65% of cases that call `escalate_to_human` are actually routine refunds that could have been auto-resolved, while autonomous resolution succeeds 78% of the time on the clear-cut cases it does attempt. The agent is over-escalating standard cases while handling some genuinely ambiguous ones autonomously. What's the most direct structural fix?",
    "options": [
      "Rewrite tool descriptions to be more explicit about when to escalate",
      "Remove `get_customer` and `lookup_order` from the toolset, leaving only `process_refund` and `escalate_to_human`, to reduce tool confusion",
      "Keep all four tools, but restrict `escalate_to_human` so it can only be called after both `get_customer` and `lookup_order` have already returned substantive data",
      "Rewrite the system prompt's escalation criteria in more detail"
    ],
    "correct": 2,
    "explanation": "Restricting when `escalate_to_human` can be called \u2014 only after `get_customer` and `lookup_order` have already returned something substantive \u2014 directly targets premature escalation without removing tools the agent still needs for legitimate investigation. Stripping investigative tools (B) would make *every* case harder to resolve, not just the over-escalated ones.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-006",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A 12-turn conversation about a disputed order involves: the customer claims a $60 charge on order #7742, the agent verifies the charge exists, and by turn 8 a running summary has condensed the details down to \"customer disputes a charge.\" On turn 11, the customer references \"like the $50 I got back last month for the same vendor,\" but the agent has lost the original $60 figure in the summarized history and asks the customer to repeat the amount. What fix would prevent this?",
    "options": [
      "Never summarize; keep the full raw conversation history in every turn",
      "Maintain a persistent \"case facts\" block (amount, order ID, dates) carried alongside every message, outside the narrative summary that gets condensed",
      "Increase the context window size",
      "Lower the temperature to make behavior more consistent across long conversations"
    ],
    "correct": 1,
    "explanation": "A persistent case-facts block (amount, order ID, dates) carried alongside the narrative prevents exactly this kind of detail loss during summarization. Keeping the full raw history forever (A) avoids the problem but doesn't scale, and neither context-window size nor temperature (C, D) address progressive detail loss from summarization itself.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-007",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your policy requires that refunds under $100 can be auto-approved, but refunds of $100+ must first have the customer's identity verified via `get_customer`. Some `get_customer` calls fail due to network timeouts, and the agent currently retries the same call several times before eventually calling `escalate_to_human`. You want to *guarantee* that `process_refund` can never be called for $100+ unless `get_customer` has already returned a verified ID in the conversation \u2014 not just make it likely. Which mechanism enforces this?",
    "options": [
      "A `PostToolUse` hook that appends a reminder to the agent after `process_refund` succeeds, noting that identity should have been verified first",
      "A `PreToolUse` hook that blocks `process_refund` for amounts at or above $100 until a verified-ID flag from `get_customer` is present in the conversation",
      "A `PostToolUse` hook that normalizes `get_customer` results into a canonical verified/unverified format",
      "A system-prompt instruction stating that identity verification is required before large refunds"
    ],
    "correct": 1,
    "explanation": "Only a `PreToolUse` hook can block `process_refund` *before* it executes, which is what \"guarantee\" requires here. A `PostToolUse` hook (A, C) fires after the refund has already gone through, and a prompt instruction (D) is followed probabilistically, not deterministically \u2014 exactly the gap the team wants closed.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-009",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your team escalates any case that reaches 8 conversational turns, on the theory that long conversations indicate complex cases. Data shows this rule escalates many routine multi-step refunds (identity verification + refund processing routinely takes 6\u20138 turns) while some genuinely ambiguous policy-exception cases stay in autonomous resolution because they happen to resolve in fewer turns. What's wrong with using turn count as an escalation signal?",
    "options": [
      "It's actually a reasonable proxy for complexity; just raise the threshold to 12 turns",
      "Turn count is orthogonal to case complexity \u2014 the same routine workflow can take 3 turns or 10 depending on how the customer communicates. Escalation should trigger on an actual policy gap or ambiguity the agent can't resolve, not on conversation length",
      "Escalate based on customer sentiment instead of turn count",
      "Add a per-turn confidence score and escalate when the average drops below a threshold"
    ],
    "correct": 1,
    "explanation": "Turn count doesn't track complexity \u2014 the same routine workflow can span very different numbers of turns depending on the customer's communication style. Escalation should be triggered by an actual unresolved ambiguity or policy gap, not by how long the conversation happened to run.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-010",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A case is escalated to a human with a structured handoff containing: customer ID, disputed order number, refund amount, and a recommended action (\"Approve $85 refund, order is within the 30-day window\"). The human approves the refund. Two days later, the customer says the refund never arrived and demands to know why the agent didn't just process it. Investigation shows the AI agent never actually called `process_refund` \u2014 it only reasoned that a human should approve one. What element is missing from the escalation structure that would have prevented this confusion?",
    "options": [
      "The full unedited transcript, so the human can re-trace the entire investigation themselves",
      "A field documenting exactly what the agent already attempted, and explicitly stating that no refund action was taken by the agent itself \u2014 only a recommendation",
      "The customer's original message, verbatim, to confirm the request was genuine",
      "A confidence score, so the human knows how uncertain the agent was"
    ],
    "correct": 1,
    "explanation": "The handoff records *what the agent recommended* but never states *whether the agent itself took any action*. Without an explicit field for \"attempted actions\" (and confirmation that no refund was actually executed), a human reviewer has no way to know the recommendation still requires their own action to complete \u2014 which is exactly the gap that led to the refund never happening.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-011",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer runs `/memory` during a long Claude Code session and sees that both the project-level `CLAUDE.md` and a `.claude/rules/database.md` rule (with `paths: [\"src/db/**/*.ts\"]`) are listed as loaded. Yet the rule isn't applying to `src/db/migration.ts`, a file the developer created moments ago mid-session \u2014 even though the path clearly matches the glob. What's the most likely cause?",
    "options": [
      "Path-scoped rules are evaluated against the file set at session start, before the new file existed, and don't re-evaluate dynamically as new files are created",
      "The `paths` glob requires an exact filename match, not a directory wildcard pattern",
      "The file must be committed to git before glob-based rules will apply to it",
      "The developer needs to re-run `/memory` to refresh the rule cache"
    ],
    "correct": 0,
    "explanation": "Path-scoped `.claude/rules/` files are evaluated against the working file set at session initialization; they don't dynamically re-scan for files created mid-session. The glob pattern itself is correct (ruling out B), git commit status doesn't gate rule loading (C), and `/memory` shows what's currently loaded rather than forcing a live re-scan (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-012",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team creates a `/document-api` skill with `allowed-tools: [\"Write\"]` in its `SKILL.md` frontmatter, intending to restrict the skill to only generating documentation files. When invoked, the skill fails because it can't query a connected MCP server that provides live API schema information. Why doesn't `allowed-tools` prevent this failure from being a restriction problem in the first place?",
    "options": [
      "`allowed-tools` restricts built-in tools but does not gate MCP tool access, which the skill inherits from the parent session regardless of the frontmatter list",
      "MCP tools must be separately allowlisted via a dedicated `allowed-servers` frontmatter field, which is missing here",
      "The MCP call is blocked, and the fix is to add `tool_choice: \"required\"` to the frontmatter instead",
      "Skill invocation automatically escalates all tool restrictions from the skill to the parent session"
    ],
    "correct": 0,
    "explanation": "`allowed-tools` in `SKILL.md` frontmatter constrains which *built-in* tools a skill may call; it has no effect on MCP tool access, which the skill inherits from the parent session's existing MCP configuration regardless of the frontmatter list. There is no separate `allowed-servers` field (B), and `tool_choice` isn't a skill-frontmatter concept (C).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-013",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `.claude/settings.json` hook is configured with `matcher: \"Bash\"`, `type: \"command\"`, intended to block any Bash invocation that references production credentials. The hook's script correctly detects and prints the matched credential key name in logs, but Bash commands referencing those credentials still execute anyway. What's the most likely fix?",
    "options": [
      "Change the matcher from `\"Bash\"` to a regex like `\"Bash.*\"` so it matches the tool name correctly",
      "Make sure the hook's script actually exits with a non-zero exit code when it detects a match \u2014 printing a log line alone does not block the tool call",
      "Move the hook from `PreToolUse` to `PostToolUse`, since that's when the final decision on the Bash call is made",
      "Add a separate `{\"type\": \"approval\"}` hook entry alongside the existing command hook"
    ],
    "correct": 1,
    "explanation": "A command hook only blocks a tool call if its script exits non-zero; printing a detection message to logs has no effect on the tool-use decision itself. The matcher syntax is fine as written (A), `PostToolUse` (C) would run after the Bash command has already executed, and `\"approval\"` isn't a valid hook type (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-014",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer needs to add one new database index to speed up a slow, already-diagnosed query. The change touches one file, is 5\u201310 lines, and the team has already agreed on which index to add. Should this go through plan mode first?",
    "options": [
      "Yes \u2014 plan mode should review the indexing strategy before any implementation",
      "No \u2014 plan mode is built for exploring multiple valid approaches on complex, multi-file work; a single well-understood, already-decided change doesn't need that overhead",
      "Yes \u2014 plan mode is required to check the index doesn't affect other queries",
      "No, but only because this is a bug fix; any new feature work should always go through plan mode"
    ],
    "correct": 1,
    "explanation": "Plan mode earns its overhead on multi-file work with several genuinely valid approaches; a single-file, already-decided, five-to-ten-line change gets nothing extra from a planning pass and only adds latency. Feature-vs-bugfix (D) isn't the relevant distinction \u2014 task complexity and decision-ambiguity are.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-015",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `/release-notes` skill converts raw commit messages into user-facing changelog entries. Across five runs on similar commits, the results vary: sometimes technical jargon that should be simplified is kept as-is, other times breaking-change details are oversimplified into vague language. The prompt already says \"write for a non-technical audience while preserving important details.\" What's the most effective next fix?",
    "options": [
      "Add a stronger prompt clause: \"Always balance technical accuracy with customer-friendly language\"",
      "Add 2\u20133 concrete before/after examples that show exactly which terms to simplify, which details must survive simplification (e.g., breaking changes), and how each should be phrased",
      "Generate five variants per commit and have a human manually pick the best one each time",
      "Split the skill into two skills \u2014 one for breaking changes, one for routine fixes \u2014 to reduce the range of cases each has to handle"
    ],
    "correct": 1,
    "explanation": "When the same category of transformation produces inconsistent results despite clear prose instructions, concrete before/after examples that pin down the exact boundary (which terms to simplify, what must survive simplification) are more effective than further prose (A), manual cherry-picking (C), or splitting the task (D), none of which resolve the underlying ambiguity in what \"customer-friendly but accurate\" actually means here.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-016",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A convention that all new database migrations follow a specific naming/structure pattern needs to apply to files under both `migrations/` and `tools/legacy-migrations/` \u2014 two directories with no other relationship. What's the most maintainable way to enforce this?",
    "options": [
      "Create `migrations/CLAUDE.md` and `tools/legacy-migrations/CLAUDE.md`, each repeating the same convention",
      "Create a single `.claude/rules/migrations.md` with `paths: [\"**/migrations/**/*.sql\", \"**/legacy-migrations/**/*.sql\"]` frontmatter",
      "Add a \"Migration\" section to the root `CLAUDE.md`",
      "Build a custom `/migration-check` skill that developers must remember to run before creating a migration file"
    ],
    "correct": 1,
    "explanation": "A single glob-scoped `.claude/rules/` file with paths covering both migration directories applies the convention wherever migration files live, without duplicating content across directory-level `CLAUDE.md` files (A) or bloating the root `CLAUDE.md` with a rule that's only relevant to a subset of files (C).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-017",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer spends 90 minutes exploring a legacy data-processing module before asking Claude to write a new version of a core function. The generated code is syntactically clean and passes a quick smoke test, but it silently violates a constraint documented in a code comment the developer read in the first 20 minutes of exploration \u2014 a comment Claude never referenced when generating the new version. What should have been set up during the exploration phase to prevent this?",
    "options": [
      "Use the `Explore` subagent to keep verbose discovery output out of the main context, and have Claude maintain a scratchpad file recording critical constraints found along the way",
      "Start a brand-new session for the implementation step so old exploration context doesn't interfere",
      "Ask for a larger context window so nothing needs to be dropped during the session",
      "Switch to plan mode specifically to review the findings before implementation begins"
    ],
    "correct": 0,
    "explanation": "A scratchpad file capturing constraints discovered during exploration \u2014 paired with the `Explore` subagent to keep the verbose search process itself out of the main context \u2014 is the direct fix for exactly this failure mode: a constraint noticed early gets silently dropped by the time implementation happens. A fresh session (B) or a bigger context window (C) don't capture and resurface the constraint; they just change how much gets forgotten and when.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-018",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An automated PR review pipeline deliberately uses a fresh, independent Claude Code instance to review code rather than reusing the session that generated the fix. A reviewer complains that this independent reviewer still misses a subtle cross-function interaction bug that seems obvious once pointed out. Is the independent-instance design itself the problem?",
    "options": [
      "Yes \u2014 the independent instance should be given the original session's generation reasoning so it has more context to work with",
      "No \u2014 the point of an independent instance is specifically to avoid the generation session's own reasoning bias, which otherwise makes it less likely to challenge its own prior decisions; this particular miss is a separate issue, not evidence the pattern is wrong",
      "Yes \u2014 both steps should run in the same session so context carries over cleanly",
      "No, but the reviewer instance should switch models between runs to add perspective diversity"
    ],
    "correct": 1,
    "explanation": "This is intentional design, not a bug: a session that generated the fix retains its own reasoning and is measurably less likely to challenge its own prior decisions, so an independent review session is used specifically to avoid that bias. This particular miss doesn't invalidate the pattern \u2014 it's a separate reliability gap. Giving the reviewer the generation reasoning (A) or merging the two steps (C) would reintroduce the exact bias the design is meant to avoid.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-019",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A skill's `SKILL.md` sets `context: fork` and `argument-hint: \"Describe the target API\"`. Invoking it with no arguments prompts the developer to describe the target API. Invoking it with a description already supplied as an argument runs the skill silently, with no follow-up prompt. Is this the correct, documented behavior of `argument-hint`?",
    "options": [
      "No \u2014 `argument-hint` should always prompt regardless of whether arguments were supplied; the missing prompt is a bug",
      "Yes \u2014 `argument-hint` is autocomplete guidance shown when no arguments are given; it assumes the user has supplied what's needed once an argument is present, and does not re-validate or force a prompt",
      "No \u2014 `context: fork` disables prompting behavior for any skill run as a sub-agent",
      "Yes, but only because `argument-hint` silently validates the argument against a schema before deciding whether to prompt"
    ],
    "correct": 1,
    "explanation": "`argument-hint` is autocomplete guidance shown when a skill is invoked without arguments; once an argument is supplied, the skill proceeds on the assumption the user has provided what's needed. It isn't a schema or a validator, so it doesn't force a prompt regardless of input (ruling out A and D), and `context: fork` governs execution isolation, not prompting behavior (C).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-020",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer spends over two hours exploring a large, unfamiliar monorepo \u2014 reading 40+ files, tracing call chains, and building a mental model of a thread-safety requirement documented in a file read early in the session. Near the end of the session, they ask Claude to refactor the module for readability. The refactor passes unit tests but breaks a downstream integration test because it violates that early thread-safety requirement \u2014 which Claude never cites or references while making the change. What should have been done differently during exploration?",
    "options": [
      "Run `/compact` after every new file is read, aggressively trimming context to make room for new information",
      "Maintain a scratchpad file recording critical constraints, assumptions, and invariants discovered during exploration, so they can be explicitly rechecked before any later implementation step",
      "Restart the session every 90 minutes to avoid context window saturation",
      "Only ever use the `Explore` subagent for discovery, and always implement in a completely fresh session afterward"
    ],
    "correct": 1,
    "explanation": "A scratchpad recording constraints and invariants discovered during exploration is what lets a later implementation step recheck against them explicitly, instead of relying on the model to spontaneously recall something read an hour earlier in a long session. Aggressive `/compact` (A) and periodic restarts (C) both actively discard the very information that needed to be preserved.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-021",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator delegates research on climate-policy evolution to five subagents \u2014 recent legislative news, long-form policy documents, emerging green-tech companies, synthesis, and report generation. All five complete without errors. The synthesis subagent's output is coherent, but the final report heavily emphasizes legislative updates and barely mentions green-tech market dynamics, despite the coordinator having requested balanced coverage. Each subagent's individual findings contain relevant material on their assigned topic. Where is the defect most likely located?",
    "options": [
      "The green-tech subagent silently failed to execute its task properly",
      "The synthesis subagent's tool access is too narrow to retrieve the green-tech material it needs",
      "The coordinator's decomposition never established weighting or integration instructions, so synthesis had no guidance on how to balance the two domains",
      "The report-generation subagent is intentionally suppressing green-tech findings due to its writing style"
    ],
    "correct": 2,
    "explanation": "Every subagent executing correctly rules out execution-level defects; the imbalance traces back to the coordinator never giving synthesis any weighting or integration guidance for how to combine the two domains. This is the scenario's signature trap: a \"successful\" pipeline with a decomposition-level bug.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-022",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A web-search subagent completes research on a regulatory topic and returns its findings to the coordinator. The coordinator then delegates a follow-up task to a synthesis subagent. The synthesis subagent immediately asks what \"approval timeline\" refers to \u2014 a term defined only in the earlier search results, which the coordinator has but did not include in the new invocation. Why is this the expected behavior rather than a bug?",
    "options": [
      "Subagents automatically inherit all prior coordinator messages and tool outputs, but only if explicitly \"enabled\" in the invocation \u2014 which wasn't done here",
      "Subagents have isolated context by design and do not automatically receive prior conversation history; the coordinator must explicitly pass whatever context a subagent needs into its invocation prompt",
      "The synthesis subagent's context window is smaller than the coordinator's, so large search results are silently truncated before being passed along",
      "Passing context explicitly is optional in principle; the model's training data typically fills in plausible prior search results"
    ],
    "correct": 1,
    "explanation": "Subagents don't automatically inherit the coordinator's conversation history \u2014 this is by design, not a defect. Context needed by a subagent must be explicitly included in its invocation prompt, which is exactly what didn't happen here.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-023",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator needs to search academic papers, government filings, and corporate financial disclosures on a renewable-energy topic. It currently delegates to one subagent, waits, delegates to a second, waits, then delegates to a third \u2014 a fully sequential chain that takes 45 seconds per research cycle. The three lookups don't depend on each other's output. What change reduces elapsed time while keeping the coordinator in control of synthesis?",
    "options": [
      "Combine all three into one subagent that internally parallelizes the three lookups itself",
      "Emit all three `Task` tool calls within a single coordinator turn so the subagents run concurrently",
      "Use `Bash` to shell out to a script that invokes all three subagents in parallel, bypassing the `Task` tool",
      "Reduce each subagent's context window so results come back faster"
    ],
    "correct": 1,
    "explanation": "Emitting multiple `Task` calls within a single coordinator turn is what runs subagents concurrently. Sequential delegation (the current setup) is what's producing the 45-second elapsed time; combining the three lookups into one subagent (A) or shelling out via `Bash` (C) both abandon the coordinator's oversight of the delegation itself.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-024",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A document-analysis subagent queries a restricted research database for licensing information. Every failure \u2014 expired license, database outage, malformed input, or a valid search with zero matching records \u2014 comes back as `{\"isError\": true, \"message\": \"Request failed\"}`. The coordinator can't reliably decide whether to retry, reformat the input, escalate for license renewal, or move on with a documented coverage gap. What should the tool result include instead?",
    "options": [
      "A generic success/failure boolean, leaving recovery logic entirely to the coordinator's judgment",
      "Structured error context: category (expired/timeout/validation/not-found), whether retrying is worthwhile, what was attempted, and a suggested next step",
      "A confidence score reflecting how sure the subagent is that the call actually failed",
      "A verbose internal log of every retry the subagent already attempted, for the coordinator to replay"
    ],
    "correct": 1,
    "explanation": "Categorized error context \u2014 cause, retryability, what was attempted, and a suggested next step \u2014 is what lets the coordinator make an informed recovery decision instead of guessing. A bare boolean (A) or a self-reported confidence score (C) don't distinguish a temporary outage from a permission problem, which is exactly the ambiguity causing unpredictable recovery here.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-025",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A research coordinator's usual flow is: search \u2192 wait \u2192 analysis (with search results) \u2192 wait \u2192 synthesis. On complex topics, the coordinator sometimes needs analysis and synthesis dispatched together right after search results land; on simple topics, synthesis should start the moment analysis returns, without an extra coordinator round-trip. The right next step genuinely depends on what each stage discovers. What orchestration approach fits best?",
    "options": [
      "A fixed four-step prompt chain that always runs in the same order, on the theory that predictability beats adaptive logic",
      "A dynamic orchestrator that inspects results after each step and decides which subagents to invoke next based on what it finds",
      "Let each specialist subagent independently decide when to hand its output to the next stage, without the coordinator tracking overall progress",
      "Merge search, analysis, and synthesis into one subagent operating in a single context window"
    ],
    "correct": 1,
    "explanation": "When the right next step depends on what a stage actually finds, a dynamic orchestrator that inspects results and decides subsequent delegation is the fit \u2014 this is the orchestrator-workers pattern. A fixed chain (A) can't adapt when complex topics need a different dispatch shape than simple ones.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-026",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A finance-research system has `fetch_market_data` (stock prices, trading volumes, market indices) and `fetch_economic_indicators` (GDP, unemployment, inflation from government sources), described only as \"Retrieves market information\" and \"Retrieves economic information\" respectively. Logs show the synthesis subagent frequently calls `fetch_market_data` for inflation figures and `fetch_economic_indicators` for stock prices \u2014 both tools work correctly when called, they're just being selected for the wrong job. What's the most effective first fix?",
    "options": [
      "Add 10 few-shot examples showing correct tool selection for each data type",
      "Rewrite both descriptions with specific input formats, example queries, the exact data types each returns, and explicit boundaries (e.g., \"use `fetch_market_data` only for prices and trading volumes, never macroeconomic aggregates\")",
      "Remove one of the two tools and route all lookups through the survivor",
      "Add a keyword-based pre-router that intercepts the request and picks the tool before the model sees it"
    ],
    "correct": 1,
    "explanation": "Thin, near-identical descriptions (\"Retrieves market information\" / \"Retrieves economic information\") give the model no basis for correct selection. Rewriting both with specific inputs, example queries, and explicit boundaries is the first and highest-leverage fix, ahead of few-shot examples (A) or a pre-router (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-028",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A draft report synthesized from three subagents' findings states a renewable-energy adoption statistic with no source citation, even though the search subagent originally found this figure in a credible government report and passed it along with a source reference. The synthesis subagent had both the number and the source in its input; the citation was simply dropped during synthesis. What should have been required from the start to prevent this?",
    "options": [
      "A confidence score on each claim, so synthesis can prioritize high-confidence findings",
      "Structured claim-source mappings \u2014 each assertion explicitly linked to its source document, excerpt, date, and methodology \u2014 that synthesis is required to preserve rather than compress away",
      "A checklist forcing the synthesis subagent to manually copy-paste every source reference verbatim into the output",
      "A separate \"sources\" file kept entirely outside the synthesis subagent's input context"
    ],
    "correct": 1,
    "explanation": "Structured claim-source mappings \u2014 claim, excerpt, source, date, methodology \u2014 carried through as a required part of the handoff are what prevent provenance from being silently dropped during synthesis. A confidence score (A) doesn't address citation loss, and a checklist (C) or externally-stored sources file (D) both rely on a manual step that's easy to skip under exactly the conditions that caused the original loss.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-029",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator delegates in parallel to three subagents: clinical-trial outcomes, healthcare policy documents, and emerging medical technologies. Trials and policy both return successfully. The technology subagent errors out because a source is temporarily unreachable. A report can still be produced, just with a coverage gap on emerging technologies. What should the coordinator do?",
    "options": [
      "Escalate the whole pipeline to a human, since any subagent failure should halt the process regardless of how much useful work the others completed",
      "Produce the partial report from the two completed subagents, clearly annotating the coverage gap and why it exists, and let the reader judge whether that gap matters for their purposes",
      "Retry the failed subagent indefinitely and block the report until it eventually succeeds",
      "Discard the two successful results too, since the three-subagent pipeline was defined as all-or-nothing"
    ],
    "correct": 1,
    "explanation": "A partial, clearly-annotated report lets the reader judge whether the coverage gap matters for their purposes, while still delivering the value already produced by the two subagents that succeeded. Escalating over one failed subagent (A), retrying indefinitely (C), or discarding good work (D) all destroy value the pipeline has already legitimately produced.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-030",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A multi-turn synthesis is tracking housing-policy changes across a decade \u2014 early turns cover 2015\u20132018 findings, later turns add 2019\u20132024. By turn 5, the synthesis subagent starts referencing \"typical housing-policy patterns\" in vague generalities instead of the specific policy names, agencies, and dates it correctly cited in turn 2. The coordinator's messages keep growing, but the output keeps getting vaguer. What's the most direct fix?",
    "options": [
      "Restart the research from scratch with no prior context, since this kind of degradation is unavoidable in long sessions",
      "Maintain a persistent findings-summary artifact (key facts, dates, policy names, sources) that the coordinator re-injects into every synthesis turn, countering attention loss on details buried in the middle of a growing context",
      "Raise `max_tokens` so the model has more room to generate detailed responses",
      "Swap in a larger model mid-session to regain synthesis quality"
    ],
    "correct": 1,
    "explanation": "A persistent findings-summary artifact, re-injected into every synthesis turn, is the direct countermeasure to specific facts getting buried and generalized away as a long multi-turn session grows \u2014 the classic \"lost in the middle\" pattern. Restarting (A), raising `max_tokens` (C), or swapping models (D) don't address why the earlier, more specific findings stopped being referenced.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-031",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer asks Claude to \"find all places where the request handler deserializes payloads without a null check\" while investigating intermittent null-pointer exceptions. Claude runs `Grep`, finds 14 matching files, reads three of them, and concludes with a vague \"most callers look safe.\" Asked for a specific prioritized list of entry points to review, Claude admits it only read a small fraction of the 14 matches. What's the most direct fix for the next investigation?",
    "options": [
      "Increase the context window so Claude can read all 14 files in one pass",
      "Maintain a scratchpad file recording each candidate file's path, line number, and null-check status as it's checked, before synthesizing a final answer",
      "Replace `Grep` with a more elaborate `Bash find` pipeline to pre-filter matches",
      "Add a system-prompt instruction telling Claude to \"be thorough\" when reviewing security-sensitive code"
    ],
    "correct": 1,
    "explanation": "A scratchpad tracking each candidate's path, line number, and status as it's actually checked gives Claude a persistent record to synthesize from, instead of drawing a conclusion from a small, arbitrary subset of the 14 matches. A bigger context window (A) doesn't force the remaining 11 files to actually get checked, and \"be thorough\" (D) is a probabilistic instruction, not a structural fix.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-032",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An MCP server `code_analyzer` exposes `find_pattern` (pattern/regex matching over code) and `trace_dataflow` (semantic, cross-function-boundary analysis that can follow unsanitized input to a security-critical sink). `trace_dataflow` is strictly more capable for this class of investigation, but logs show Claude consistently reaches for `find_pattern` instead, even on tasks that clearly call for cross-boundary tracing. What's the most likely cause?",
    "options": [
      "The built-in `Grep` tool has higher precedence than any MCP tool and is preferred by default",
      "`trace_dataflow`'s description doesn't clearly explain its semantic, cross-boundary capability or when it should be chosen over simple pattern matching",
      "The MCP server needs to be reconfigured at the network level to expose `trace_dataflow` with higher priority",
      "Claude prefers MCP tools over built-ins by default, so some other, unrelated setting must be suppressing that preference here"
    ],
    "correct": 1,
    "explanation": "Tool selection is driven primarily by description quality; a thin or vague description for the more capable tool loses to a familiar, simpler alternative by default. Sharpening `trace_dataflow`'s description to spell out its semantic, cross-boundary capability \u2014 and when that capability actually matters \u2014 is the direct fix, well ahead of anything at the network or precedence level (A, C).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-033",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer wants to compare one function's signature across three branches (`main`, `develop`, `staging`) \u2014 just the definition line and its parameter list in each. What's the most efficient combination of built-in tools?",
    "options": [
      "Use `Bash` to run `git diff` across the branches and parse the raw output",
      "Use `Grep` to locate the function's definition line in each branch, then `Read` only the small region around each match",
      "Use `Glob` to enumerate every source file first, then `Read` each one looking for the signature",
      "Use `Read` on the entire repository per branch, then search the combined content manually"
    ],
    "correct": 1,
    "explanation": "`Grep` is the right tool for finding a pattern (the function definition) inside file contents, and `Read` is then used narrowly on just the matched region. `Glob` (C) matches file paths, not contents, and reading entire branches (D) wastes context on code that isn't relevant to the comparison.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-034",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An `Edit` call's anchor text matches three times in the target file: once in a comment, once in a docstring, and once in the actual executable line the developer wants changed. The call fails because the anchor isn't unique. What's the reliable next step?",
    "options": [
      "Retry `Edit` with a longer anchor string that includes more surrounding context, hoping it becomes unique",
      "Use `Read` to load the full file, manually identify the correct occurrence, then use `Write` to save the corrected full-file version",
      "Use `Bash grep -n` to get the line number, then build a new `Edit` call anchored on that line number",
      "Tell the user ambiguous anchors are a hard limitation and the edit must be done manually"
    ],
    "correct": 1,
    "explanation": "When an `Edit` anchor isn't unique, the documented fallback is `Read` to load the whole file, manually identify the correct occurrence, then `Write` the corrected full-file version. A longer anchor (A) might still collide, and constructing an `Edit` around a bare line number (C) isn't how the tool matches text.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-035",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A custom MCP server queries a proprietary internal database for team-wide metrics. It needs credentials that must never be committed to git, and the server configuration itself must be shared across every developer's checkout. Where should this be configured, and how should the credential be referenced?",
    "options": [
      "In `~/.claude.json`, with the credential hardcoded, distributed manually to each teammate",
      "In `.mcp.json`, referencing `${DATABASE_API_KEY}` for environment-variable expansion, with each developer setting that variable locally",
      "In `CLAUDE.md`, inside a fenced code block, with a note asking developers not to commit it",
      "In a root-level `.env` file, referenced from `.mcp.json` by its literal filename"
    ],
    "correct": 1,
    "explanation": "Project-scoped `.mcp.json`, committed to version control, with `${DATABASE_API_KEY}` expanded from each developer's own environment, is exactly the pattern that keeps the config shared while keeping the secret itself out of git. `~/.claude.json` (A) isn't shared across the team by design.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-036",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer wants to try out a prototype MCP server for dependency-graph analysis that no one else on the team needs yet, and that might be misconfigured and break things while they experiment. Where should this go so it doesn't affect teammates or clutter shared config?",
    "options": [
      "In `.mcp.json` at the repo root, flagged with an `\"experimental\": true` field",
      "In `~/.claude.json` on their own machine",
      "In a new `.claude/experimental-mcp.json` file in the project",
      "In a `.mcp-local` file added to `.gitignore`"
    ],
    "correct": 1,
    "explanation": "`~/.claude.json` is the user-scoped location intended for exactly this: a personal, experimental server that shouldn't be pushed into the shared project configuration or risk breaking anything for teammates.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-037",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "After three hours exploring a monorepo's service-to-service communication, Claude has answered several detailed questions correctly, citing specific classes. On the next question \u2014 about the same system \u2014 Claude says it \"doesn't have enough context to be specific.\" Asked to recall a class name it named accurately 15 minutes earlier, it now proposes a slightly different, incorrect name. What's happening, and what's the most direct fix?",
    "options": [
      "The context window is full; restart the session",
      "The agent's grip on earlier specifics is degrading as the conversation grows; maintain a scratchpad file recording key class names, interface boundaries, and dependency relationships, and reference it in later prompts",
      "The developer's questions have become too vague; ask more specific, narrowly-scoped questions instead",
      "Reduce `max_tokens` so responses stay short enough to avoid straining context"
    ],
    "correct": 1,
    "explanation": "This is context degradation over a long session \u2014 earlier specifics get lost even though the conversation is still \"about\" the same system. A scratchpad recording key class names and relationships, referenced in later prompts, is the direct mitigation. Restarting (A) throws away three hours of legitimate exploration.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-038",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer unfamiliar with a codebase wants to find where HTTP request validation happens before requests reach business logic, without reading every file upfront. What's the recommended exploration order?",
    "options": [
      "Use `Read` on every file under `/handlers` first, to understand overall structure",
      "Use `Grep` for validation-related terms (\"validate\", \"schema\", \"middleware\") to find candidate files, then use `Read` on just those matches, following imports to trace the flow from entry points",
      "Use `Bash find` to list files, pipe the output somewhere, and ask Claude to infer the pattern from the file list alone",
      "Use `Glob` for `**/*.ts`, then `Read` every result and ask Claude to identify validation logic after the fact"
    ],
    "correct": 1,
    "explanation": "Search first, read second: `Grep` for validation-related terms surfaces candidate files, then `Read` on just those matches (following imports from there) builds understanding incrementally. Reading everything upfront (A, D) front-loads irrelevant content before knowing what actually matters.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-039",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team's custom MCP server for repo analysis is configured in `.mcp.json` with `${GIT_API_TOKEN}` for credential expansion. A teammate launches Claude Code and the server fails to initialize with an error that the environment variable isn't set \u2014 even though they've added `export GIT_API_TOKEN=...` to their `~/.bashrc`. What's actually going on, and what's the fix?",
    "options": [
      "Credentials referenced via environment-variable expansion only work from `~/.claude.json`, not `.mcp.json`",
      "A variable set in `~/.bashrc` only applies to shells that source that file when they start; if Claude Code was launched from a shell or process that never sourced it, the variable simply isn't in its environment \u2014 export it in the current terminal session (or set it at the OS/session level) before launching Claude Code",
      "The syntax is wrong; it must be `${GIT_API_TOKEN:-default}`, since bare `${VAR}` isn't supported",
      "Environment-variable expansion isn't supported in `.mcp.json` at all; the token must be hardcoded or read from a separate `.env` file"
    ],
    "correct": 1,
    "explanation": "A variable exported only in `~/.bashrc` is available to shells that source that file at startup \u2014 it doesn't automatically propagate to every process on the machine. If Claude Code was launched from a context that never sourced `.bashrc`, the variable simply isn't present in its environment. The fix is ensuring the variable is actually set in the shell/session Claude Code is launched from \u2014 this is standard environment-variable scoping, not an `.mcp.json` syntax or location problem (A, C, D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-040",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team wants an exploration phase (read-only: `Read`, `Grep`, `Bash` restricted to read-only commands) to hand off to a separate modification phase (`Read`, `Write`, `Edit`) once a refactor target is identified \u2014 without maintaining two entirely disconnected agents. What's the best way to enforce this tool scoping?",
    "options": [
      "Configure `allowedTools` at each agent/role definition so exploration and modification each only ever have access to the tools appropriate for that phase",
      "Build two fully separate agent definitions that share no context whatsoever between phases",
      "Use a single agent and rely on prompt instructions telling it which tools to avoid during the exploration phase",
      "Use hooks to dynamically intercept and block any tool call not on the current phase's approved list"
    ],
    "correct": 0,
    "explanation": "`allowedTools` scoped at the agent/role definition is exactly the mechanism for restricting which tools are available during which phase, without needing two fully disconnected agents (B) or relying on prompt instructions alone (C) to enforce what should be a hard boundary.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-041",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A CI pipeline reuses a single Claude Code session across a queue of 6\u20138 PRs to amortize session startup overhead. By the third PR, review comments start referencing prior PRs (\"similar to the previous refactoring\"); by the seventh, findings are generic and don't address the actual diff in front of it. Why, and what's the fix?",
    "options": [
      "The session's context window is exhausted; raise `max_tokens` to give each invocation more room",
      "The session is carrying forward reasoning and context from earlier PRs, biasing later reviews toward prior patterns; use a fresh Claude Code session per PR instead",
      "The CI runner is incorrectly caching findings between invocations; clear the runner's cache",
      "Run all PR reviews simultaneously in parallel instead of sequentially, to avoid context accumulation"
    ],
    "correct": 1,
    "explanation": "Reusing one session across multiple PRs lets earlier reasoning and context bleed into later reviews, producing generic, prior-PR-flavored comments instead of a focused read of the current diff. A fresh session per PR removes that contamination. Raising `max_tokens` (A) doesn't address contaminated context, and parallelizing (D) sidesteps the question of what's actually wrong with the sequential design rather than fixing it.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-042",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `PostToolUse` hook with `matcher: \"Bash|Read|Edit\"` normalizes tool responses into a consistent JSON structure to make review output more uniform. In CI, the same hook also fires on an unrelated test-execution Bash step that emits raw plain-text test output, and normalizing that output breaks the downstream test-result parser, which now fails the build. What's the most precise fix?",
    "options": [
      "Remove the hook entirely and give up on normalizing tool responses in CI",
      "Narrow the hook's `matcher` (or add a condition) so it only fires on review-related tool invocations, not on the unrelated test-execution step",
      "Move the hook from `PostToolUse` to `PreToolUse`, since that runs earlier and can skip non-review steps",
      "Disable `Bash` tool access for the entire CI review run and use only `Read` and `Edit`"
    ],
    "correct": 1,
    "explanation": "The hook's logic is sound; its scope is too broad. Narrowing the `matcher` (or adding a condition) so it only fires on review-related tool calls \u2014 not on an unrelated test-execution step \u2014 fixes the interference without giving up normalization altogether (A) or misdiagnosing the fix as a timing change (C).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-043",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A CI review prompt spells out separate false-positive-reduction criteria for nine finding categories (security, performance, coverage, etc.), totaling roughly 280 tokens of criteria alone. Traces show the model applies these criteria inconsistently and sometimes seems to forget earlier categories' rules by the time it reaches later files in the same pass. What's the underlying issue?",
    "options": [
      "The criteria are too strict; loosen them so the reviewer becomes more confident overall",
      "Packing many fine-grained, per-category rules into a single pass causes attention dilution; split the review into per-category (or per-file) passes, or move some of the criteria into a deterministic post-generation validation layer",
      "Add 5\u20138 few-shot examples per category showing correct criterion application",
      "Set `temperature: 0` to force strictly rule-following, deterministic behavior regardless of prompt length"
    ],
    "correct": 1,
    "explanation": "Nine categories' worth of fine-grained criteria packed into a single pass is a recipe for attention dilution \u2014 the model can't reliably hold and apply that many rules while also reading code. Splitting into per-category (or per-file) passes, or moving some of the criteria into a deterministic post-generation validation step, addresses the structural cause. More examples (C) or forcing `temperature: 0` (D) don't resolve rules competing for the same attention budget.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-044",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team runs a blocking pre-merge review with an SLA of under 8 minutes, and a separate nightly technical-debt scan with no time constraint. They want to move workloads to the Message Batches API for the 50% cost discount. Which is the correct call?",
    "options": [
      "Batch both; the cost savings are worth accepting whatever latency impact results",
      "Batch only the nightly scan; moving the pre-merge check to the Batches API would only make sense if the team is willing to accept processing delays of up to 24 hours on merge decisions, which conflicts with the stated SLA",
      "Batch the pre-merge check too \u2014 the Batches API typically finishes within about 2 hours, which is fine for most teams' merge cadence",
      "Keep both synchronous; the Batches API isn't appropriate for any CI-adjacent workflow"
    ],
    "correct": 1,
    "explanation": "The Message Batches API has no latency SLA and can take up to 24 hours; that's fundamentally incompatible with an under-8-minute blocking pre-merge check, but is a good fit for the latency-tolerant nightly scan. Assuming a typical 2-hour turnaround (C) treats an unbounded window as if it were a guarantee, which it isn't.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-045",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A CI reviewer is configured to emit `--output-format json` with a `--json-schema`, and a downstream bot parses that JSON to post PR comments. The bot has recently started rejecting otherwise-valid runs because a finding's text field contains a literal `{` or `}` (e.g., \"O{n} complexity\" or \"refactor: {old} \u2192 {new}\"), which trips up a naive bracket-counting step the bot added as an extra sanity check before parsing. What's the most robust fix?",
    "options": [
      "Have the bot search for the first `[` in the raw response and parse only from there onward",
      "Add a prompt instruction: \"output JSON only, no prose before or after\"",
      "Remove the bot's ad hoc bracket-sanity-check step and parse directly against the enforced `--json-schema`, since schema-enforced output is already structurally reliable and the extra heuristic is what's actually misfiring on legitimate content",
      "Have the bot trigger a second review run with a different prompt whenever the first one fails to parse"
    ],
    "correct": 2,
    "explanation": "`--output-format json` with `--json-schema` already produces structurally enforced, schema-valid JSON; the bracket-counting sanity check the bot added on top is a redundant heuristic that misfires on legitimate finding text containing `{`/`}`. Removing that extra, unnecessary check and parsing directly against the enforced schema is more robust than patching around it with string-search heuristics (A) or hoping a prompt instruction (B) prevents `{`/`}` from ever appearing in prose.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-046",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team wants to guarantee that review never runs on a PR lacking a linked issue-tracker ticket \u2014 unlinked PRs currently produce findings that just get ignored downstream anyway. The review prompt already says \"never review PRs without a linked ticket,\" but reviews keep running regardless, since prompt instructions are followed probabilistically. What's the most deterministic enforcement point?",
    "options": [
      "Strengthen the prompt further: \"CRITICAL: you MUST refuse to review PRs without a confirmed linked ticket. Non-negotiable.\"",
      "Add a `PreToolUse` hook that checks the ticket-link prerequisite via the issue tracker's API and blocks the review-related tool call outright if the check fails",
      "Build a custom `/review` skill that checks for a linked ticket as a documented step in its instructions before invoking the reviewer",
      "Let review run as normal, then filter out and discard any findings after the fact if the PR turns out to lack a linked ticket"
    ],
    "correct": 1,
    "explanation": "A non-negotiable prerequisite needs enforcement outside the model's voluntary compliance. A `PreToolUse` hook that checks the ticket-link prerequisite and blocks the review tool call deterministically is the fix; a stronger prompt (A), a skill that merely documents the check as a step (C), or post-hoc filtering (D) all still depend on the model behaving correctly, which has already been shown to fail.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-047",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team splits large PR reviews into (1) per-file local-analysis passes and (2) a cross-file integration pass for API-contract and shared-type issues \u2014 but both stages currently run as two prompts inside one long-lived session. In practice, the integration pass re-flags issues the per-file pass already caught, and by the time the integration prompt runs, the accumulated session context has grown large enough that its findings get noticeably less precise. What's the best architectural fix?",
    "options": [
      "Keep both stages in the same session, separated by a clear divider comment, and instruct the model not to repeat findings from the prior stage",
      "Run each stage as a separate `-p` CLI invocation with fresh context, passing the per-file findings into the integration invocation's input so it can focus only on genuinely new cross-file issues",
      "Merge both stages into one comprehensive prompt that analyzes every file at once for full consistency",
      "Run the per-file passes in parallel, but still run the integration pass afterward inside the same accumulated session"
    ],
    "correct": 1,
    "explanation": "Running each stage as its own fresh `-p` invocation avoids both the session-bloat precision loss and the re-flagging problem, as long as the per-file findings are explicitly passed into the integration invocation so it knows what's already been caught and can focus on genuinely new cross-file issues. Keeping both stages in one long session (A, D) preserves the very context accumulation causing the precision loss.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-048",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A reviewer keeps flagging functions as \"missing error handling\" even when a `try/catch` is clearly present. The instruction \"flag only critical cases where error handling is missing\" hasn't helped, and adding 4\u20135 illustrative good/bad examples hasn't moved the false-positive rate either. What additional specificity is actually needed?",
    "options": [
      "Increase the example count from 4\u20135 to 15+, covering more edge cases",
      "Switch to a larger, more capable model",
      "Replace the vague instruction with an explicit, codebase-specific rule \u2014 e.g., \"flag only when function X is called outside a try/catch, and the uncaught exception types are Y or Z, which can cause data loss or DB inconsistency\"",
      "Disable the \"missing error handling\" category entirely until a dedicated, separately-trained classifier can be built for it"
    ],
    "correct": 2,
    "explanation": "\"Flag only critical cases\" is still a subjective judgment call; an explicit, codebase-specific rule (naming the function, the exception types, and the concrete consequence that matters) removes the ambiguity that examples alone hadn't resolved. More examples without a sharper rule (A) doesn't change the boundary itself.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-050",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A CI-facing project `CLAUDE.md` has grown past 650 lines: API design conventions, a deployment-readiness checklist, test-writing standards, migration guidelines, and detailed false-positive-reduction criteria for 15+ finding categories, all loaded on every single invocation regardless of what's actually being reviewed. Reviews are now missing context from the actual diff and producing vaguer findings, and logs show a large share of the context budget going to configuration rather than the code under review. What's the most effective fix?",
    "options": [
      "Split `CLAUDE.md` into several files connected with `@path` imports, so the content is easier for humans to navigate",
      "Move file-type- or path-specific guidance (e.g., migration rules scoped to `paths: [\"**/migrations/*\"]`) into `.claude/rules/`, and keep only genuinely universal guidance in `CLAUDE.md`",
      "Cut `CLAUDE.md` down to under 100 lines of high-level guidance and rely on the model's general training knowledge for the rest",
      "Build a custom `/review` skill that dynamically selects which subset of guidance to load based on which files changed in the PR"
    ],
    "correct": 1,
    "explanation": "Moving path- or category-specific guidance into `.claude/rules/` with scoped frontmatter means it only loads for matching files, freeing up context budget for the actual diff being reviewed. `@path` imports (A) still get fully expanded into context regardless of relevance, and gutting `CLAUDE.md` to under 100 lines (C) throws away guidance the team still needs, just less selectively than option B.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-051",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A receipt pipeline adds OCR to pull text from vendor logos on scanned images. The model now confidently fills the vendor field with plausible-sounding names that don't appear anywhere in the OCR text, the original image, or the email body \u2014 but schema validation passes, since `vendor` is syntactically a valid string. These hallucinated vendor names carry high confidence scores (0.92) and bypass human review entirely, surfacing only weeks later during downstream reconciliation. What should be added to the schema first to catch this?",
    "options": [
      "A required `ocr_confidence` field, so low-OCR-quality documents can be skipped",
      "A `source_location` field (e.g., \"header\", \"footer\", \"email_body\", \"ocr_image\") tracking where each extracted value came from, enabling a validation step that checks the value actually appears in the identified location",
      "An `is_hallucinated` boolean that the model self-reports",
      "A higher `max_tokens` budget, giving the model more room to \"think\" before extracting"
    ],
    "correct": 1,
    "explanation": "Schema validity guarantees the JSON is well-formed, not that the value is grounded in the source. A `source_location` field lets downstream validation check that an extracted value actually appears where it claims to have come from, which is what catches a fabricated-but-plausible vendor name that a confidence score alone missed.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-052",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A pipeline has `extract_receipt`, `extract_invoice`, and `extract_contract`, each with its own schema, and uses `tool_choice: \"any\"` so a call is always guaranteed. A borderline document \u2014 a receipt-like form that also includes itemized line items \u2014 keeps getting routed to `extract_invoice`, whose required fields (like `PO_number`) don't exist on the source, so the model fabricates them. Retrying with the same `tool_choice: \"any\"` setting produces the same misrouted result again. What's the root issue and the most direct fix?",
    "options": [
      "Add 2\u20133 few-shot examples distinguishing a borderline receipt from an invoice, then retry",
      "Switch to `tool_choice: \"auto\"` so the model has the option to fall back to a plain-text response instead of a tool call",
      "`tool_choice: \"any\"` only guarantees *a* call, not the *right* one; add a validation step that detects field-presence mismatches against the chosen schema, returns a structured error naming the better-fitting schema, and lets the model retry against that feedback",
      "Drop the contract schema \u2014 most real documents are receipts or invoices anyway, and fewer options should reduce misrouting"
    ],
    "correct": 2,
    "explanation": "`tool_choice: \"any\"` guarantees a tool call happens, but not that it's the *right* one; that requires a separate validation-retry loop that detects a field-presence mismatch, names the better-fitting schema in a structured error, and lets the model retry against that specific feedback. Few-shot examples (A) may help marginally but don't replace direct error feedback on the actual mismatch.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-053",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A pipeline routes extractions below 0.70 overall confidence to human review and auto-approves the rest. After 1,000 documents, fabricated vendor names almost never get caught by review \u2014 they only surface weeks later downstream \u2014 while extractions that land at 0.68\u20130.72 confidence (right at the boundary) turn out to be correct almost every time they're checked. What's actually wrong with the routing, and what closes the gap?",
    "options": [
      "The threshold is simply too high; drop it to 0.50 so more extractions get reviewed",
      "Confidence is poorly calibrated specifically for fabrication \u2014 the model can be very confident about an invented value; add stratified random sampling of a small percentage of *high*-confidence extractions specifically to surface the failure patterns confidence scoring can't see",
      "Field-level confidence is too fine-grained; collapse everything into one binary approve/review decision",
      "Switch from overall confidence to the minimum field-level confidence as the routing signal instead"
    ],
    "correct": 1,
    "explanation": "Confidence scores are a poor signal specifically for fabrication, since a model can be highly confident about an invented value. Stratified random sampling of a slice of high-confidence extractions is designed to surface exactly the failure patterns a pure confidence threshold structurally cannot catch. Lowering the threshold (A) doesn't target this failure mode any more precisely.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-054",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An `amount` field keeps extracting as the string `\"1234 dollars\"` instead of the required numeric type. A retry loop feeds back the original document, the failed output, and the exact validation error each time, but four consecutive retries reproduce the identical mistake. What should happen next, and why is a fifth retry not the answer?",
    "options": [
      "Retry a fifth time with a larger `max_tokens` budget, in case the model needs more room to reason through the fix",
      "Recognize this as a schema-design problem, not a retry problem: accept `amount` as a string, add a deterministic post-processing step to parse \"1234 dollars\" into `1234`, and move that specific validation out of the pre-approval retry loop entirely",
      "The tokenizer is likely confusing the word \"dollars\" with the number; rephrase the validation error using only numerals and currency symbols",
      "Persist through up to 10 retries \u2014 enough repetition eventually corrects this class of error"
    ],
    "correct": 1,
    "explanation": "Four identical retries hitting the same wall is a sign the problem is the schema, not the prompt: accept the value as a string and parse it deterministically afterward, moving that check out of the pre-approval retry loop entirely. Persisting with more retries (A, D) repeats an approach already shown not to work.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-055",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "`payment_method` was originally required, and extraction never failed the schema \u2014 but downstream audits found it was frequently fabricated (e.g., \"Paid by credit card\" invented for documents that never mention payment method at all). Making the field nullable stopped the fabrication, but now roughly 5% of receipts extract with `payment_method: null` \u2014 and some of those actually do state \"Paid by credit card\" clearly, which the model simply missed. What schema-design principle addresses both problems at once?",
    "options": [
      "Revert to required and rely on better prompting to make extraction more reliable",
      "Add a `payment_method_confidence` field so low-confidence nulls can be distinguished from high-confidence ones",
      "Keep the field optional, but add a `source_location` (or equivalent evidence field) so \"genuinely absent from the source\" can be distinguished from \"present in source but missed by the model\" \u2014 the latter is a prompt/extraction bug worth fixing, the former isn't",
      "Default to the string `\"unknown\"` instead of `null`, so the field is always populated"
    ],
    "correct": 2,
    "explanation": "Making the field optional stops fabrication, but conflates two very different situations under one `null` value; a `source_location` (or similar evidence field) lets you tell \"genuinely not in the document\" apart from \"present, but missed\" \u2014 the second of which is an extraction bug worth fixing, unlike the first.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-056",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A single document has both receipt-like fields (vendor, total, date) and invoice-like fields (itemized line items, subtotal). Two purpose-built tools exist \u2014 `extract_receipt` and `extract_invoice` \u2014 and merging them would bloat both schemas. With `tool_choice: \"auto\"`, the model sometimes picks receipt (losing line-item detail) and sometimes picks invoice (fabricating a PO number that doesn't exist on the document). The team needs both the line-item data and the receipt-style category field, without a bloated unified schema. What's the best design?",
    "options": [
      "Merge into one universal schema, marking invoice-only fields as optional",
      "Keep `tool_choice: \"any\"` with sharpened, non-overlapping descriptions distinguishing point-of-sale receipts from formal itemized invoices, and add a validation step: if the extraction doesn't match the detected document type, return a structured error and let the model retry against the corrected schema",
      "Add a `classify_document_type` tool that must run first, before either extractor can be invoked",
      "Keep `tool_choice: \"auto\"` and just add stronger prompt language about when each tool applies"
    ],
    "correct": 1,
    "explanation": "Sharpened, mutually exclusive tool descriptions reduce ambiguity up front, and a validation step that checks the extraction against the detected document type \u2014 returning a structured error and allowing a corrected retry when they don't match \u2014 handles the genuinely ambiguous cases that description quality alone won't fully resolve. A merged schema (A) is explicitly what the team is trying to avoid.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-058",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A pipeline computes per-field confidence (amount 0.95, vendor 0.93, category 0.38, date 0.87) and an `overall_confidence` as their geometric mean (0.78), auto-approving anything above 0.75. An audit finds approved receipts where category confidence was as low as 0.32 (masked by high amount/vendor scores) and the category field was wrong in downstream processing \u2014 while receipts where every field sits around 0.72, yielding an overall_confidence of 0.72, are correctly categorized every time they're checked. What's the actual design flaw?",
    "options": [
      "Geometric mean is the wrong statistic; switch to arithmetic mean instead",
      "A single very low field can be masked by the rest and still cause a real downstream failure; use a minimum-field threshold (e.g., auto-approve only if every field individually clears 0.70) instead of any single aggregate statistic",
      "Confidence scoring in general is unreliable here; replace it with a fixed percentage-based approval quota instead",
      "The 0.75 threshold is simply too high; lowering it to 0.60 would reduce review workload without changing anything else"
    ],
    "correct": 1,
    "explanation": "A geometric mean lets one very weak field hide behind several strong ones, which is exactly how a category confidence of 0.32 got auto-approved. A minimum-field threshold ensures no single field is silently the weak link, which is why the flat-0.72-across-the-board receipts perform better in the audit despite a lower \"overall\" score.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-059",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A vendor-name extraction repeatedly returns \"AMZN\" instead of \"Amazon.\" A retry loop re-prompts with \"always expand vendor names to their full legal name\" and retries, but after five attempts on the same document, the model still returns an abbreviation roughly 20% of the time. On a different, unrelated validation failure (\"vendor missing entirely\"), a single retry with the error message resolves the issue 85% of the time. What does this contrast suggest, and what's the right fix for the abbreviation case specifically?",
    "options": [
      "Increase retries to 10 for this category too \u2014 persistence eventually pays off",
      "The model is reproducing a real-world abbreviation it has strong prior associations with, and re-prompting won't reliably override that; add a deterministic post-processing step \u2014 an alias lookup table (e.g., \"AMZN\" \u2192 \"Amazon\") \u2014 applied before downstream validation, instead of relying on the retry loop",
      "This points to a model-capability gap; switch to a different model better suited to entity extraction",
      "Treat any abbreviation as a hard validation failure and reject the extraction outright rather than retrying"
    ],
    "correct": 1,
    "explanation": "A retry loop that plateaus after several attempts, especially when contrasted against a different failure class where a single retry mostly works, indicates the model is drawing on a strong learned association (\"AMZN\") that re-prompting won't reliably override. A deterministic post-processing alias lookup handles it outside the retry loop, which is more reliable than continuing to ask nicely (A) or discarding an otherwise-good extraction outright (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam4-060",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "After 50,000 documents over three months, the pipeline's error tracking only records `validation_failed: true/false` \u2014 nothing about *why*. The team suspects failures cluster around specific vendors, date formats, or document types, but can't confirm it or prioritize fixes with the data they're currently logging. What should be added to enable systematic root-cause analysis?",
    "options": [
      "A random UUID per extraction, to trace failures back to their source documents",
      "A `detected_pattern` field describing what characteristic triggered the extraction path taken (e.g., `\"date_format_ddmmyyyy\"`, `\"vendor_from_email_subject\"`, `\"amount_with_currency_symbol\"`), so failures can be aggregated by pattern and the highest-impact ones prioritized",
      "A `retry_count` field, to deprioritize documents that keep failing repeatedly",
      "A `model_version` field, to compare accuracy across model updates over time"
    ],
    "correct": 1,
    "explanation": "A `detected_pattern` field capturing what characteristic drove a given extraction path is what turns a flat pass/fail log into something that can actually be aggregated and prioritized by root cause (vendor, date format, document type). A trace ID (A) or retry count (C) don't explain *why* a failure happened, only that one did.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-001",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your support agent has an intake subagent that classifies incoming requests (simple: tracking/password/status | complex: refund/damage/billing), and an investigation subagent that handles complex cases. The intake subagent correctly marks requests as \"simple\" about 85% of the time, but 40% of requests marked simple still reach the investigation subagent, adding unnecessary latency. The system prompt says \"skip investigation for simple cases,\" but logs show it's ignored. What's the most reliable fix?",
    "options": [
      "Increase the intake classification model's temperature to make decisions more decisive",
      "Add a step in the coordinator that reads the intake classification and only invokes the investigation subagent for cases marked complex",
      "Include 5 few-shot examples in the intake prompt showing requests classified as simple",
      "Increase the token budget for the intake subagent so it has more confidence in its decisions"
    ],
    "correct": 1,
    "explanation": "A system-prompt instruction (\"skip investigation for simple cases\") provides only probabilistic compliance. The reliable fix is a deterministic gate in the coordinator that simply never invokes the investigation subagent for cases the intake subagent already marked simple, enforcing the decision at the control-flow level instead of hoping the model follows a prose instruction.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-002",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your `process_refund` and `request_refund_exception` tools have descriptions: \"Process a refund\" and \"Request an exception for refund eligibility.\" Both accept the same inputs (order_id, amount, reason). The agent calls the wrong one 25% of the time on policy-edge cases. You've already tried improving the descriptions with input formats, but misrouting persists. What's the next step on the fix ladder?",
    "options": [
      "Add 8 few-shot examples showing correct tool selection for ambiguous cases",
      "Rename `request_refund_exception` to `escalate_refund_exception_review` and add explicit \"use this when policy does NOT allow the refund\" guidance",
      "Merge both tools into one and add an internal `action: \"approve\" | \"request_exception\"` input parameter",
      "Split the tools into separate subagents, each with their own tool, to eliminate the choice entirely"
    ],
    "correct": 1,
    "explanation": "Once description improvements alone haven't resolved misrouting, renaming the ambiguous tool to make its purpose unmistakable \u2014 `escalate_refund_exception_review`, with explicit \"use this when policy does NOT allow the refund\" guidance \u2014 is the next rung on the fix ladder, ahead of merging tools with an internal parameter (C) or splitting into separate subagents (D), both more disruptive changes.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-003",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "After 12 turns investigating a disputed charge, your agent has verified the customer, retrieved three years of billing history, and identified the root issue ($200 overcharge on order #7743 from March). But when asked to \"process the refund,\" it hesitates and asks \"just to confirm, the order with the issue was...?\" instead of recalling the specific order number. What's the problem, and how should it be fixed?",
    "options": [
      "The model's context window is too small; increase it to preserve history better",
      "Extract a persistent \"case facts\" block containing critical details (customer ID, order number, issue amount, dates) that's carried separately from the narrative conversation history",
      "Reduce the number of turns allowed before summarization",
      "Require the customer to re-state the order number before proceeding"
    ],
    "correct": 1,
    "explanation": "This is context loss in a long investigation: specific numbers and identifiers can fade from a narrative history even though the conversation is nominally still \"about\" the same case. A persistent case-facts block (customer ID, order number, amount, dates) carried separately from the narrative is the direct fix \u2014 more targeted than simply enlarging the context window (A) or asking the customer to repeat themselves (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-004",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "You've split the support system into a coordinator plus two subagents: one for order investigation and one for risk assessment. A case arrives: \"I want a $500 refund due to damaged goods.\" Both subagents run, but the coordinator receives only risk-assessment findings (\"Low risk, proceed\") and no findings from the order-investigation subagent. Production logs show the order-investigation subagent ran but hit a backend timeout. The coordinator can't distinguish \"no issues found\" from \"investigation failed,\" so it proceeds with incomplete information. What change would best solve this?",
    "options": [
      "Restructure the case so order investigation always runs first, and risk assessment only if investigation succeeds",
      "Require both subagents to output a status field indicating success/failure/partial, plus structured error context (`errorCategory`, `isRetryable`) when something goes wrong",
      "Merge the two subagents into one",
      "Add a retry loop in the coordinator that automatically re-invokes failed subagents"
    ],
    "correct": 1,
    "explanation": "When a subagent fails, the coordinator needs a structured signal to tell \"nothing was found\" apart from \"the investigation itself failed.\" A status field (success/failure/partial) plus structured error context (`errorCategory`, `isRetryable`) gives the coordinator exactly that distinction; without it, a silent timeout can look identical to a clean negative result.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-005",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "The MCP backend exposes tools that list available refund policies, approved return-reason codes, escalation-queue names, and supported regions. In production, every new case triggers 4 discovery tool calls to learn what exists, consuming roughly 800ms of latency before any customer-specific lookup happens. These lists change weekly but are read-only. Logs show the agent burns token budget on discovery before it can act. What's the most appropriate integration change?",
    "options": [
      "Cache the tool outputs in a `CLAUDE.md` file so the agent reads them once",
      "Expose these catalogs as MCP **resources** (URI-addressable reference data) rather than **tools**, so the agent can read them directly without consuming a model decision or a round-trip",
      "Create a single `get_system_metadata` tool that returns all four catalogs at once",
      "Require the agent to skip discovery entirely and rely on its training knowledge of policies"
    ],
    "correct": 1,
    "explanation": "Read-only, rarely-changing catalogs that exist to be discovered rather than acted upon belong in MCP resources, not tools \u2014 removing the round-trip decision cost entirely. Caching in `CLAUDE.md` (A) still requires re-reading the catalogs into context every session, and merging into a single tool (C) still costs a round-trip.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-006",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A case is escalated to a human agent with a 72% confidence score and a note saying \"case seems complex.\" But investigation shows: customer identity is verified, order exists, refund window is open, damage evidence is clear, and refund amount is within policy. The escalation was triggered by an engineer's \"confidence < 80% \u2192 escalate\" rule. The confidence actually dropped to 72% only because the agent was uncertain whether a small warehouse fee was refundable, not because the case itself was complex. What's fundamentally wrong with this escalation signal?",
    "options": [
      "The confidence threshold is too strict; raise it to 60%",
      "Self-reported model confidence is poorly calibrated \u2014 it correlates weakly with actual case complexity and can be confidently wrong on the easiest cases while uncertain on genuinely simple ones",
      "Confidence scores should be averaged across the whole case, not reported per-turn",
      "Use turn count instead of confidence; escalate after 6 turns regardless of complexity"
    ],
    "correct": 1,
    "explanation": "Self-reported model confidence is a poorly calibrated proxy for actual case complexity \u2014 it can dip on a single unresolved sub-question even when every other part of the case is completely clear-cut, which is exactly what happened here. Escalation thresholds built on this signal will misfire in both directions: escalating clear cases and failing to escalate genuinely hard ones.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-007",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A customer asks, \"Can you process my refund now?\" The agent's response includes a tool-use block for `process_refund` with correct parameters, but the response text also says \"I've processed your refund \u2014 you should see it in 3\u20135 business days.\" The application's agentic loop terminates after seeing this final text and never executes the pending tool call, so the customer gets a confirmation message but no refund is actually issued. What's the design flaw?",
    "options": [
      "The model should never generate customer-facing text in the same response as a tool call",
      "The loop must check whether `stop_reason` is `\"tool_use\"` to know a tool call is pending; if so, it must execute the tool and continue the loop rather than treating the response as final just because text is also present",
      "The response should be split into two separate API calls to avoid mixing concerns",
      "Add a deterministic check for phrases like \"processed\" in the text to prevent premature loop termination"
    ],
    "correct": 1,
    "explanation": "The agentic loop must check whether `stop_reason` is `\"tool_use\"` to know a tool call is still pending, and execute it regardless of any accompanying text, rather than treating the presence of customer-facing text as a signal that nothing further needs to happen. Terminating early here means the tool call that should have processed the refund never actually runs.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-009",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Production analysis shows an inverted pattern: simple requests (resend tracking link, password reset) are escalated 35% of the time, while complex policy cases (international damage claims, subscription billing disputes) are resolved autonomously 28% of the time \u2014 both wrong outcomes. Investigation reveals the agent escalates using a heuristic: \"if the conversation has more than 5 turns, escalate.\" But simple cases often need 6\u20138 turns for data gathering (a customer didn't provide an order number initially, or an email needed clarifying), while some policy cases resolve in 3\u20134 turns given the right expertise. Why is this heuristic unreliable, and what should replace it?",
    "options": [
      "Use conversation length but adjust the threshold per case type; simple cases get a higher turn limit",
      "Escalation should be based on explicit, measurable criteria \u2014 policy ambiguity in the documentation, required customer data the customer can't provide, or conflicting information from backend systems \u2014 not proxy metrics like turn count",
      "Escalate only when the model's confidence score drops below 50%",
      "Always escalate cases with more than 4 tool calls, since tool-call count indicates complexity"
    ],
    "correct": 1,
    "explanation": "Turn count is a proxy that doesn't track actual complexity \u2014 a routine case can easily need extra turns just for data-gathering, while an expert can resolve a genuinely complex policy question in very few. Escalation should trigger on explicit, checkable conditions instead: policy ambiguity, missing customer-supplied data, or contradictory backend information.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-010",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator invokes a refund-decision subagent with a highly prescriptive prompt: \"Check if customer is verified AND order exists AND refund window is open AND damage evidence is provided. If all true, approve. If any false, escalate. If customer is verified but evidence is unclear, gather more details.\" On standard, well-documented cases this works, but on unusual cases (a customer claims damage but has no photo, or the return window is ambiguous due to international shipping), the subagent either escalates unnecessarily or asks for details the coordinator already tried to gather. What's the architectural flaw?",
    "options": [
      "The subagent needs the full conversation history passed explicitly",
      "The prompt over-specifies decision steps with rigid if-then-else logic, leaving no room for the subagent to reason about nuanced cases; it should instead receive investigation tools and clear decision criteria, but be allowed to assess independently whether those criteria are met",
      "The coordinator should call a different subagent for unusual cases",
      "The refund-decision subagent shouldn't have access to investigation tools at all"
    ],
    "correct": 1,
    "explanation": "A rigid, fully-enumerated if-then-else prompt leaves the subagent no room to reason when a real case doesn't map cleanly onto the enumerated conditions (missing photo evidence, ambiguous international shipping windows). The better design gives the subagent the same investigation tools and the underlying decision criteria, but lets it assess whether those criteria are satisfied given what it can actually observe, rather than forcing an exact literal match.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-011",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team creates a `/generate-component` skill with `argument-hint` in its SKILL.md frontmatter, requiring a component-name argument. Invoking `/generate-component` without arguments prompts for the component name. Later, the team adds feature-flags as a second required argument and updates SKILL.md. Developers who start a brand-new session after the edit get prompted for both arguments; a developer who had a session open from before the edit only ever gets prompted for component-name, never feature-flags, for the rest of that session. Why do the prompts differ?",
    "options": [
      "`argument-hint` only supports a maximum of two arguments",
      "SKILL.md frontmatter is read once when a session starts; a session already running doesn't pick up an edit made to the file after that point",
      "The feature-flags argument name conflicts with a reserved keyword",
      "Developers need to manually run a reload command before new arguments take effect in any session"
    ],
    "correct": 1,
    "explanation": "Skill frontmatter (including `argument-hint`) is read when a session starts, not re-read for a session that's already running. A session begun before the SKILL.md edit keeps operating on the old requirements for its entire lifetime; only a new session picks up the update \u2014 which is exactly the split behavior observed here.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-012",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `/refactor-tests` skill encodes a company's standard test-refactoring pattern. It was originally created at `~/.claude/skills/refactor-tests/SKILL.md` to test locally. Now 40 engineers need to use it consistently. What's wrong with the current location, and what's the correct migration path?",
    "options": [
      "Personal skills are faster; keep it at the user level and have each engineer copy the file manually to their own machine",
      "The user-level location is personal and not version-controlled; the skill should move to `.claude/skills/refactor-tests/SKILL.md` in the repo so every engineer inherits it via git and uses identical logic",
      "Create a duplicate at the project level while keeping the user-level version, so team members can use either",
      "Convert the skill into a slash command instead, since skills can't be shared across a team"
    ],
    "correct": 1,
    "explanation": "User-level configuration is personal and never shared through version control, no matter how good the skill is. Making a skill available consistently to 40 engineers means it has to live at the project level, where every clone of the repo inherits the identical file \u2014 not duplicated in two places (C) or manually distributed (A).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-013",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "During a long codebase exploration, a developer accumulates a large volume of context from verbose grep output, file reads, and traces. Claude starts answering vaguely \u2014 \"typical patterns\" instead of specific class names. The developer runs a context-compaction command with a verbose/debug flag enabled and sees no improvement; specific answers only return once they run the same command without that flag. Why did dropping the flag fix it?",
    "options": [
      "The compaction command requires two successive invocations regardless of flags; the first only validates configuration",
      "The verbose/debug flag re-expands the very content the compaction step is trying to condense, working against the goal; without it, the command can actually compact context and free up room for specific detail",
      "Compaction only takes effect if the session is fully restarted afterward",
      "The verbose flag is required for the compaction step to analyze context at all, so removing it should have broken the mechanism, not fixed it"
    ],
    "correct": 1,
    "explanation": "A verbose/debug flag on a compaction step re-expands exactly the content the step exists to condense, which is why running it produced no improvement \u2014 it was working against its own purpose. Dropping the flag let the command actually compact accumulated context and restore room for specific detail.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-014",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A skill spawns a subagent with `context: fork` to explore third-party API documentation and produce a long reference document summarizing it. When control returns to the main session, the developer asks Claude to use that reference for code generation, and Claude says it has no knowledge of any such reference. What's the underlying issue?",
    "options": [
      "`context: fork` writes to an isolated temporary sandbox, and any file the fork creates never exists outside it",
      "A forked subagent's internal reasoning and any artifacts it produced are not automatically available to the parent session; whatever the fork returns as its final result must be explicitly passed back as context (or written somewhere the main session actually reads) for the main session to use it",
      "Subagents are not permitted to produce long-form output when `context: fork` is set",
      "The reference exists, but the developer must use a memory-inspection command to view fork-isolated outputs"
    ],
    "correct": 1,
    "explanation": "A forked subagent's internal reasoning and any artifacts it generates don't automatically flow back to the parent session \u2014 only whatever the fork explicitly returns as its result does. If the main session needs the reference material, it has to be passed back directly or written somewhere the main session actually reads, not just produced somewhere inside the fork.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-015",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A project has two `PostToolUse` hooks configured in `.claude/settings.json` for the same `Edit|Write` matcher: one runs a formatter, the other validates the edited file against the team's linter. After an edit, the formatter reformats the code, but the linter \u2014 which ran moments earlier, before the formatter \u2014 reports a false violation based on the pre-formatted version of the file. What's the most likely cause, and the fix?",
    "options": [
      "Multiple hooks on the same matcher fire in a nondeterministic order; the fix is to combine both actions into a single hook script so ordering can't vary",
      "The hooks are configured to run in an order where the linter executes before the formatter; the fix is to reorder them (or have the linter re-read the file after the formatter has run) so validation happens against the final, formatted version",
      "Hooks always run concurrently regardless of configuration, so this failure is unavoidable",
      "This is expected; the linter should be configured to tolerate whatever formatting prettier-style tools produce"
    ],
    "correct": 1,
    "explanation": "Multiple hooks on the same matcher run in a defined order, and when the linter happens to run before the formatter, it necessarily validates against the pre-formatted version of the file \u2014 producing a false violation against formatting that's about to change anyway. Reordering the hooks (or having the linter re-read the file post-format) fixes the sequencing, not the linter's rules themselves.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-016",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `/code-review` skill is configured with `allowed-tools: [\"Read\", \"Grep\"]` in its frontmatter, and the team's intent is that it must never be able to run Bash, even though Bash is enabled in the parent session. During a review, Claude suggests running a diagnostic script and requests to use Bash. What actually happens?",
    "options": [
      "The request is silently blocked, because Bash isn't in `allowed-tools`",
      "Claude can still request Bash \u2014 `allowed-tools` pre-approves the listed tools for frictionless use, it doesn't remove every other tool from what Claude may ask for \u2014 so the request goes through the normal approval path (or succeeds if Bash happens to already be broadly approved)",
      "The request is blocked only if the user is not present to approve it in real time",
      "`allowed-tools` and `disallowedTools` are equivalent; listing tools in one automatically excludes every other tool"
    ],
    "correct": 1,
    "explanation": "`allowed-tools` is a pre-approval convenience list, not a hard restriction on everything else \u2014 a tool left off the list can still be requested and go through the normal approval flow. Treating it as a security boundary here is the mistake; a genuine hard block on Bash would require something like `disallowedTools` or a blocking hook, not reliance on `allowed-tools` alone.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-017",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer is implementing a distributed caching layer in a service they've never worked with before. They ask Claude to implement it directly, with a long, detailed prompt describing the desired behavior. After review, they discover the design doesn't account for TTL-based expiry, an important pattern in that service, forcing a rework. On a second, similar task in the same unfamiliar service, they instead ask Claude to first surface open design questions before writing any code; Claude asks about TTL handling, consistency guarantees, and cache scope, all of which shape the eventual implementation. Why did this approach work better here?",
    "options": [
      "Interviewing Claude before implementation always produces objectively better code, regardless of context",
      "In an unfamiliar domain where the relevant tradeoffs and constraints aren't already known, surfacing design questions before coding catches gaps that a single detailed upfront prompt is likely to miss, since the prompt-writer doesn't yet know what they don't know",
      "The interview approach is faster because it skips implementation",
      "The interview approach forces more thorough documentation as a side effect"
    ],
    "correct": 1,
    "explanation": "The interview pattern earns its value specifically in unfamiliar territory, where the person writing the prompt doesn't yet know which tradeoffs matter (like TTL-based expiry here) and so can't have specified them upfront. Surfacing design questions before implementation catches exactly the kind of gap that a single detailed prompt \u2014 however thorough it feels \u2014 is likely to miss when the domain itself is the unknown.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-018",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer is refactoring a function signature used across 30 files and updating its 15 call sites. After 12 files, they discover the new signature breaks an edge case they hadn't planned for and need to work out a fix. Should they fork the session to explore the fix, or keep working in the main session?",
    "options": [
      "Fork the session to explore the fix in isolation, then bring the result back into the main refactoring",
      "Continue in the main session \u2014 it retains full context of the 12 files already changed, avoiding lost work; forking here would isolate the fix but strip away the surrounding refactoring context the fix actually needs",
      "Restart the whole task from scratch with updated requirements",
      "Forking is only appropriate for documentation work, never for code changes"
    ],
    "correct": 1,
    "explanation": "Continuing in the main session preserves the accumulated context of the 12 files already changed, which the fix genuinely depends on; forking at this point would isolate the fix into a context that's missing exactly the surrounding refactoring work it needs to stay consistent with.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-019",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `.claude/rules/api-validation.md` file has frontmatter `paths: [\"src/api/**/*.ts\"]`, containing rules about validating all API inputs. A developer creates `src/api-client/index.ts` \u2014 a sibling directory, not a subdirectory of `src/api/` \u2014 and asks Claude to implement an API client there. The validation rules never apply to this file. Why?",
    "options": [
      "The glob `src/api/**/*.ts` only matches paths under `src/api/`; `src/api-client/` is a different directory that happens to share a name prefix, so the pattern simply doesn't match it \u2014 a broader pattern would be needed to cover both",
      "`.claude/rules/` files only apply to files that already existed when the session started",
      "Glob patterns are case-sensitive and the path casing doesn't match",
      "Rule paths require an exact directory match, and sibling directories are always excluded by design"
    ],
    "correct": 0,
    "explanation": "Glob matching is literal path matching: `src/api/**/*.ts` matches only paths that actually fall under `src/api/`, and `src/api-client/` is a distinct sibling directory that happens to share a prefix, not a match for that pattern. A broader pattern (or an additional rule) would be needed to cover both directories.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-020",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer spends four hours refactoring a component library. Two hours in, Claude reads and correctly restates an explicit architectural constraint: \"all async operations must use Suspense; no raw promises directly in JSX.\" At hour four, asked to add a new async feature, Claude writes a component that awaits a promise directly inside a `useEffect`, violating that constraint without comment. The developer points it out, Claude fixes it, and then the same category of violation resurfaces an hour later in a different component. What would most reliably prevent this recurrence?",
    "options": [
      "Restart the session every two hours to keep context \"fresh\"",
      "Maintain a scratchpad file (e.g., a running constraints doc) recording critical architectural invariants as they're discovered, and have Claude reference it before generating new async code \u2014 giving the constraint a durable source of truth instead of relying on it staying salient in a long, growing conversation",
      "Run a context-compaction command every hour regardless of what's happening",
      "Ask Claude to restate the constraint out loud every 30 minutes"
    ],
    "correct": 1,
    "explanation": "A running scratchpad of architectural constraints, checked before generating new code in the affected area, gives a long session a durable place for a constraint to live outside the conversation's own \"salience,\" which is what silently erodes as the session grows and moves on to new topics. Restarting periodically (A) or compacting on a fixed schedule (C) don't specifically preserve this kind of constraint \u2014 they just change what else gets lost along with it.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-021",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator needs to explore two mutually exclusive research hypotheses at once: one line of investigation assuming \"policy X accelerates adoption\" and another assuming \"policy X has no measurable effect.\" Using ordinary named subagents, each spawned fresh with only its own hypothesis in its prompt, the coordinator still finds that reasoning clearly built on one hypothesis leaks into the write-up for the other \u2014 findings that should only make sense under \"accelerates\" show up justifying \"no effect\" too. What's the most direct fix for exploring genuinely incompatible branches like this?",
    "options": [
      "Add `allowedTools: [\"Task\"]` to the coordinator's configuration, since parallel spawn requires it",
      "Fork the session at the point where the branches diverge, so each hypothesis is explored in its own isolated copy of the accumulated investigation state, then compare the two forks' conclusions afterward",
      "Parallel `Task` calls cannot accept differing prompts; switch to strictly sequential delegation instead",
      "Have the synthesis agent automatically detect and remove cross-hypothesis contamination after the fact"
    ],
    "correct": 1,
    "explanation": "Forking at the point where two genuinely incompatible investigations diverge gives each hypothesis its own isolated copy of the shared context to build on independently, preventing conclusions grounded in one hypothesis from leaking into the other's write-up. Ordinary fresh named subagents don't solve this on their own if the coordinator's framing or the shared setup still lets assumptions bleed across branches.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-022",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator delegates \"research the EU's approach to a regulatory topic\" to a named search subagent, and later delegates \"research the US's approach to the same regulatory topic\" to that same subagent. In between, the coordinator's own conversation has built up 15 turns of discussion establishing shared terminology and which document sources are authoritative for this topic. The second delegation comes back sparse and generic, as if the subagent doesn't share any of that established framing. What's the most accurate explanation?",
    "options": [
      "Subagents automatically inherit the coordinator's full conversation history, so the sparseness must mean the second request itself was too narrow",
      "A subagent only receives what's explicitly included in its own invocation prompt; context the coordinator built up in its own conversation \u2014 terminology, source guidance \u2014 isn't automatically available to a subagent unless the coordinator restates it in that subagent's prompt",
      "The first delegation exhausted the subagent's usable sources, degrading the second",
      "Subagents share a temporary memory keyed by topic, but that memory had already expired between the two delegations"
    ],
    "correct": 1,
    "explanation": "A subagent only has what's explicitly included in its own invocation prompt. Terminology and source guidance the coordinator built up in its own conversation over 15 turns doesn't automatically travel with a new delegation \u2014 it has to be restated in that subagent's prompt, which is exactly what was missing here.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-023",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A synthesis agent constantly needs to fact-check small claims mid-report \u2014 \"is 2023 the right year for that report,\" \"did that agency actually issue this,\" \"is this within the stated margin of error.\" Every check currently routes through the coordinator to a full-capability search subagent, adding a few seconds of round-trip latency each time, and the synthesis agent makes 80+ such checks per report. What tool-distribution change is most appropriate?",
    "options": [
      "Give the synthesis agent unrestricted access to the same web-search and document-analysis tools the other subagents use",
      "Give the synthesis agent one narrow, scoped tool built specifically for quick single-fact verification, so the common case resolves locally, while genuinely complex verification still routes through the coordinator",
      "Batch all 80+ checks into one large request sent to the coordinator at the very end",
      "Remove fact verification from the synthesis step entirely to save latency"
    ],
    "correct": 1,
    "explanation": "A narrow, purpose-built verification tool for simple single-fact checks lets the high-frequency, low-complexity case resolve locally without a coordinator round-trip, while genuinely complex verification still goes through the coordinator. Giving the synthesis agent full search/analysis tool access (A) reintroduces the coordination and scope problems that scoped tools are meant to avoid.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-024",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A research pipeline runs parallel subagents, then sends their combined output straight to a report-writing step with no intermediate check. Reviewers later find citation mismatches (a claim attributed to one source that actually came from another) and outright contradictions between two sections of the same report. Every individual subagent's own output looks reasonable in isolation. Where is the defect, and what's the most effective fix?",
    "options": [
      "One specific subagent must have misattributed a source; re-run that subagent with stricter instructions",
      "The report-writing step is introducing the citation errors itself; add a citation-cleanup pass after report generation",
      "Add an explicit coordinator-level checkpoint that evaluates the combined findings against citation-accuracy and cross-section-consistency criteria before handing off to report generation",
      "The problem is in how tool responses format citations; normalize citation format with a hook"
    ],
    "correct": 2,
    "explanation": "Every subagent looking correct in isolation doesn't guarantee the combined output is coherent \u2014 that's exactly why an explicit checkpoint evaluating the aggregated findings against citation-accuracy and cross-section-consistency criteria, before report generation runs, catches problems that no individual subagent would ever surface on its own.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-025",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator launches three subagents in parallel \u2014 search, document analysis, and synthesis \u2014 for a request that fundamentally depends on reconciling conflicting findings across topics. Search and document analysis both succeed; synthesis crashes partway through with an unrecoverable internal error. The coordinator now has two successful results and one hard failure, for a task where the missing synthesis step was the part actually responsible for resolving the conflicts the user asked about. What should the coordinator do?",
    "options": [
      "Always return the two successful results as a partial report, since some information is better than none",
      "Reason about whether the failed piece was essential to what was actually asked \u2014 since here the synthesis step was the entire point (reconciling conflicts), a partial report without it would misrepresent the state of the research, so this case should escalate rather than quietly return partial output",
      "Retry the synthesis step exactly once more and return whatever it produces, succeed or fail",
      "Discard everything and start the whole three-subagent pipeline over"
    ],
    "correct": 1,
    "explanation": "The right call depends on whether the failed piece was essential to what was actually asked. Here, reconciling conflicts across topics was the entire point of the request, and synthesis was the step responsible for that \u2014 so a \"successful\" partial report from just search and document analysis would misrepresent whether the actual question got answered, and escalating is more honest than quietly returning an incomplete result.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-026",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A document-analysis subagent is scoped to extract findings only from a fixed, pre-approved set of internal PDFs. To let it double-check facts against the source text, it's given general-purpose web-search access as well. Within weeks, logs show it routinely uses that web-search access to pull in and cite outside sources the coordinator never approved, expanding scope well past the original document set. What's the most direct fix?",
    "options": [
      "Remove web search entirely and tell the subagent, via the system prompt, to rely only on the approved documents",
      "Replace the general web-search tool with a narrowly scoped verification tool that can only check claims against the specific approved document set, not the open web",
      "Add a stronger prompt warning against using search to expand scope",
      "Let the coordinator strip out any external citations from the subagent's output after the fact"
    ],
    "correct": 1,
    "explanation": "The scope-creep problem is a tool-design problem, not a prompting problem: replacing general web search with a tool that can only verify claims against the already-approved document set makes scope expansion structurally impossible, rather than relying on the model to voluntarily stay within bounds it technically still has the power to exceed.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-028",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A multi-day research session is interrupted right after the search subagent finishes but before document analysis begins. The team wants to resume without re-running search from scratch. They restart the coordinator, and it sends document analysis a fresh prompt describing the new task \u2014 but never tells it what search already found. What's the most maintainable way to resume this kind of interrupted pipeline?",
    "options": [
      "Just resume and let document analysis redo any lookups it needs; some redundant work is an acceptable tradeoff",
      "Have each subagent export its completed state to a known location as it finishes, and have the coordinator load a manifest of that state on resume, re-injecting whatever a subsequent step actually needs",
      "Manually copy-paste the search subagent's raw output into every future prompt for the rest of the session",
      "Discard everything from before the interruption and start the whole pipeline over"
    ],
    "correct": 1,
    "explanation": "Structured state exports plus a coordinator-loaded manifest on resume is the reliable crash/interruption-recovery pattern: each subagent's completed work is captured in a known location, and resuming means loading that manifest and re-injecting only what a subsequent step actually needs, rather than redoing work or manually threading raw output through every future prompt.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-029",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator runs one named search subagent through three sequential, topically distinct tasks in a row \u2014 one on a renewable-energy policy, one on a nuclear-regulation topic, one on carbon pricing \u2014 clearing its own coordinator-side history between each. Even so, the response to the third task includes stray, unprompted references to the nuclear-regulation topic from the second task, and the second task's response likewise mentions the first task's subject in passing. Each individual response is factually correct about its own topic. Why is this happening?",
    "options": [
      "The coordinator didn't fully clear its own history, so the subagent must be inferring context from coordinator-side leftovers",
      "Even though each task is meant to be independent, if the coordinator reuses the same prompt template or phrasing pattern for all three Task invocations, that structural similarity \u2014 not shared state \u2014 is what's causing the model to draw an unintended thematic connection between them; the fix is to frame each invocation as a genuinely self-contained task",
      "The subagent is configured to automatically retain context across every invocation by default",
      "The underlying search tool is caching and returning stale results from the earlier queries"
    ],
    "correct": 1,
    "explanation": "Clearing the coordinator's own history rules out state leaking through the coordinator itself; what's left is that reusing the same prompt template or phrasing pattern across three notionally-independent Task invocations gives the model a structural cue to connect them thematically, even with no shared state at all. Framing each invocation as genuinely self-contained \u2014 not just clearing history \u2014 is what actually isolates them.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-030",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team completes a multi-day research project on a fast-moving regulatory topic, citing a dozen sources. Two weeks later, they resume the same line of research to expand on one sub-topic, and simply re-inject all the prior findings as-is into the new session before continuing. A week after publishing the expanded report, they learn that two of the originally-cited sources have since been formally retracted or substantially revised, and the report's now-outdated claims are actively misleading readers. What practice would have caught this before publication?",
    "options": [
      "Store every source as a permanent, stable URL so readers can always find the original text themselves",
      "When resuming research after a significant time gap, explicitly validate whether previously-cited sources are still current before re-using them, rather than re-injecting old findings wholesale and treating them as still authoritative",
      "Have a policy of never citing anything more than six months old",
      "Re-run the entire original research pipeline from scratch every time any new work touches the same topic"
    ],
    "correct": 1,
    "explanation": "Time-sensitive research doesn't stay valid forever; resuming after a real time gap and re-injecting old findings as if they're still current risks exactly this outcome \u2014 publishing on sources that have since been retracted or substantially revised. Explicitly validating source currency before reuse, rather than treating a prior session's findings as permanently authoritative, is what would have caught it.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-031",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An agent explores a repository using an MCP tool for definition lookup and another for call-site discovery. Some calls fail during a long exploration session, and the integration currently returns every failure as `{\"isError\": true, \"message\": \"Tool unavailable\"}`, whether the cause is a transient network blip, a malformed query, or a rate limit. The agent retries every failure the same way, sometimes looping for a long time on a query that will never succeed no matter how many times it's retried. What must be added to the tool responses to fix the retry logic?",
    "options": [
      "Raise the maximum retry count and add exponential backoff uniformly across all retried calls",
      "Log additional detail in the failure message so a human can read it later",
      "Add an `errorCategory` (e.g. transient / validation / permission) and an `isRetryable` boolean to each error response, so the agent can distinguish a worthwhile retry from a hopeless one",
      "Remove the retry mechanism entirely and fail immediately on any error"
    ],
    "correct": 2,
    "explanation": "An `errorCategory` plus an `isRetryable` flag lets the agent tell a worthwhile retry (transient) apart from a hopeless one (a malformed query that will fail identically every time). Without that distinction, uniform retry logic (A) burns time on exactly the calls retrying can never fix, and failing immediately on everything (D) throws away the retries that would have actually succeeded.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-032",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A shared catalog of approved integrations (REST APIs, webhook destinations, supported SDK versions) is exposed as an MCP tool, `list_integrations`. During a typical 2-hour exploration session, the agent calls this tool 15+ times just to check what's available, and each call consumes a tool-use decision step even though the underlying list rarely changes within a session. What's the most efficient way to expose this catalog?",
    "options": [
      "Merge several related discovery tools into one larger tool with a more detailed description",
      "Cache the tool's output into `CLAUDE.md` so the agent can reference it as static project memory",
      "Expose the integration catalog as an MCP **resource** rather than a tool, so it can be read directly without spending a tool-use decision each time",
      "Add the integration list as literal text in the system prompt"
    ],
    "correct": 2,
    "explanation": "A catalog that's mostly static within a session and exists to be looked up, not acted on, is a textbook fit for an MCP resource \u2014 it can be read directly without spending a tool-use decision on every check. Caching into `CLAUDE.md` (B) still requires a file read each time it's needed and goes stale silently; a single combined tool (A) still costs a round trip per call.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-033",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "During analysis, an agent needs the contents of three unrelated source files as baseline context before proposing any changes. It currently reads file A, waits for the result, reads file B, waits, then reads file C \u2014 three sequential tool-use round trips for three independent, non-dependent reads. What change improves efficiency here without changing what's actually being read?",
    "options": [
      "Use a single Bash command to concatenate all three files with a shell glob instead of using the file-reading tool",
      "Emit all three read calls together in one response, as separate tool-use blocks, so the client can execute them concurrently and return all three results at once",
      "Split the analysis across three separate sessions, one file per session",
      "Keep reading sequentially, but cache each file's contents locally to avoid reading it again later"
    ],
    "correct": 1,
    "explanation": "When several reads are genuinely independent of each other, emitting them together as separate tool-use blocks in one response lets the client run them concurrently and return all results at once, rather than paying three sequential round trips for work that never depended on being sequential in the first place.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-034",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "One MCP database tool returns `{\"isError\": true, \"errorCategory\": \"transient\", \"isRetryable\": true}` on one call and `{\"isError\": true, \"errorCategory\": \"validation\", \"isRetryable\": false}` on a different call. If the agent's recovery logic treats every error identically and simply retries both the same way, what actually happens?",
    "options": [
      "Both eventually succeed on retry; the transient one just takes a bit longer",
      "The transient failure may well succeed on retry, but the validation failure (a malformed query, say) will keep failing identically every time, since retrying with the same bad input doesn't fix the input \u2014 wasting attempts and context on a call retrying can't help",
      "Both fail regardless, and the agent should escalate both to a human immediately",
      "Neither will ever succeed, so all retries should simply be disabled everywhere"
    ],
    "correct": 1,
    "explanation": "Treating every error identically wastes effort specifically on the validation failure, since retrying the same malformed input produces the same malformed result every time \u2014 only the transient failure has any real chance of resolving on retry. The fix isn't fewer or more retries across the board, it's recognizing which category is actually retryable.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-035",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer-productivity agent has 22 tools available at once: 5 built-ins, 12 MCP tools for various kinds of code search (keyword search, cross-reference lookup, type-hierarchy exploration, and more), and 5 more for generating boilerplate. Logs show the agent occasionally reaches for a slower, more generic search tool when a faster, more specific one would clearly have been better \u2014 even after descriptions were already improved. What's the next lever to pull?",
    "options": [
      "Cut the least-used tools until the total count is 10 or fewer",
      "Switch to a model with a larger context window so tool-selection reasoning has more room",
      "Narrow which tools are actually available per task type \u2014 e.g. an exploration-focused pass gets only a handful of high-signal search tools, while an implementation-focused pass gets the editing and boilerplate tools \u2014 reducing the live decision space itself rather than relying on ever-better descriptions alone",
      "Build a separate preprocessing step that decides which tool to call before the agent ever sees the request"
    ],
    "correct": 2,
    "explanation": "Narrowing which tools are actually available for a given task phase reduces the live decision space itself, which is a more direct fix for misselection among 22 similar-looking tools than hoping ever-better descriptions alone will fully resolve it, or assuming a bigger context window (B) somehow improves the underlying selection judgment.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-036",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A system requires that all file modifications stay within an explicitly approved `workspace_root` directory. A developer asks an agent to \"clean up unused dependencies,\" and without any programmatic boundary check in place, the agent occasionally ends up running Bash commands that touch directories outside that approved root. What is the most reliable way to enforce this boundary?",
    "options": [
      "Add a hook that runs after the Bash command completes, checking whether it touched an out-of-scope path and rolling back if so",
      "Have the agent itself run a path-check command before the real modification, as a self-imposed safeguard",
      "Add a prompt instruction stating the boundary rule and monitor logs afterward for any violations",
      "Add a hook that runs *before* the Bash tool executes, validates the target path against `workspace_root`, and blocks the command outright with feedback if it falls outside that boundary"
    ],
    "correct": 3,
    "explanation": "A hook that runs before the Bash tool executes and can validate the target path against `workspace_root` \u2014 blocking the call outright when it falls outside \u2014 is the only one of these options that can actually prevent an out-of-scope modification from happening. A post-hoc check (A) or a self-imposed pre-check the agent might skip (B) both allow the violation to occur first; a prompt instruction (C) is advisory, not enforced.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-037",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An MCP tool call returns an error with `errorCategory: \"permission\"`. What does this most likely indicate, and what should the agent do next?",
    "options": [
      "The operation timed out and will likely succeed if retried with backoff",
      "The agent lacks sufficient authorization for this operation (missing credentials or an insufficient scope); retrying the same call won't change that outcome, so the right move is to escalate, request different credentials, or skip the operation rather than keep retrying",
      "The input was malformed and should be reformatted before retrying",
      "The operation actually succeeded, just with an empty result, and can be treated as a no-op"
    ],
    "correct": 1,
    "explanation": "A `\"permission\"` error category signals an authorization problem \u2014 missing credentials or an insufficient scope \u2014 which retrying the identical call will never resolve. The right response is to escalate, obtain different credentials, or skip the operation, not to keep retrying as if the failure might eventually clear on its own.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-038",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator delegates codebase analysis across three subagents \u2014 one traces API handlers, one traces database writes, one analyzes tests \u2014 and each returns its findings as free-form prose summaries. When an implementation-focused step later tries to act on those summaries, it struggles to cite exact file paths, line numbers, or code snippets, since the prose only describes what was found in general terms. What change most improves reliability downstream?",
    "options": [
      "Have the coordinator manually go back through the prose afterward and try to reconstruct file paths and line numbers from it",
      "Reduce the number of subagents to one or two so there's less to reconcile",
      "Require each subagent to return structured findings \u2014 the claim, the exact file path, a line range, and a short source excerpt \u2014 instead of unstructured prose, so precise attribution survives all the way through to the implementation step",
      "Merge every subagent's findings into a single combined document and have the implementation step search for the referenced code itself"
    ],
    "correct": 2,
    "explanation": "Structured findings (claim, file path, line range, source excerpt) preserve exactly the precision that free-form prose summaries lose \u2014 without them, a later step has to try to reconstruct file-level detail from a paragraph that was never designed to carry it. Manually reconstructing that detail after the fact (A) is error-prone and doesn't scale, and merging everything into one document (D) doesn't restore detail that was never captured in the first place.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-039",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team wants a slash command that only ever operates on files matching a specific pattern (e.g., generated API client files under a particular directory), regardless of which developer runs it or what else is open in their session. They configure this by adding `disallowedTools` to the command's own definition to block file types outside that pattern. In testing, the command still successfully edits files outside the intended pattern when a developer runs it from a broader working context. What's actually going wrong?",
    "options": [
      "`disallowedTools` blocks entire tools (like `Edit` or `Write`) from being used at all \u2014 it has no concept of restricting a tool to only certain file paths, so it cannot enforce a pattern-based boundary on its own; a path-based restriction needs to be enforced elsewhere, such as through a hook that inspects the target path before allowing the edit",
      "`disallowedTools` only applies to MCP tools, never to built-in tools like `Edit` and `Write`",
      "The command definition is being overridden by a broader project-level configuration every time",
      "`disallowedTools` requires an accompanying `allowed-tools` entry to take effect at all"
    ],
    "correct": 0,
    "explanation": "`disallowedTools` operates at the level of whole tools, not individual file paths within a tool's use \u2014 it can prevent `Edit` from being used at all, but it has no mechanism for saying \"only allow edits to files matching this pattern.\" Enforcing a path-based restriction requires something that actually inspects the target path before the edit happens, such as a hook, not a tool-level allow/deny list.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-040",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer-productivity agent needs to hand off from a broad, exploratory investigation phase to a narrow, high-precision code-modification phase for the same task, without losing the context gathered during exploration. Using two entirely separate agent definitions with no shared context would solve the tool-scoping problem but would also force the modification phase to start blind. What approach best preserves context while still narrowing tool access for the second phase?",
    "options": [
      "Keep a single agent and rely on prompt instructions to describe which tools are appropriate for which phase, without changing what's actually available",
      "Delegate the modification phase to a subagent that receives the exploration phase's key findings explicitly in its invocation prompt, and is scoped to a narrower toolset appropriate for making the actual edits \u2014 preserving continuity through the handoff while still tightening tool access for the higher-risk phase",
      "Run the whole task in one phase with all tools available throughout, since narrowing access isn't worth the coordination overhead",
      "Have the developer manually copy relevant findings into a new session before the modification phase begins"
    ],
    "correct": 1,
    "explanation": "Delegating the modification phase to a subagent that receives the exploration phase's key findings explicitly, while restricting its own toolset to what modification actually needs, preserves the continuity a fully separate, context-blind agent (the alternative being ruled out here) would lose, while still tightening tool access for the riskier, higher-precision phase.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-041",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A CI pipeline runs two independent jobs against the same PR: one does a general code review, the other runs a security-focused scan. Each spawns its own separate Claude Code invocation, and both happen to flag the same underlying issue (a missing null check on one specific line). Each job posts its own PR comment, so the same line gets two near-identical comments from two different \"reviewers.\" Developers complain about the redundant notifications. What's the most effective way to prevent this specific kind of duplication?",
    "options": [
      "Merge the two jobs into a single long-lived session so both sets of findings are produced together and can be reconciled before either is posted",
      "Have whichever job runs second receive the first job's findings on the same PR as part of its input, with an instruction to skip anything the other job already flagged",
      "Store every finding in a central datastore and run a deduplication pass across all findings from both jobs before anything is posted to GitHub",
      "Force the two jobs to run strictly one after the other rather than in parallel, so the second can read a results file the first one wrote"
    ],
    "correct": 1,
    "explanation": "When two independent jobs can flag the same underlying issue, having the second job receive the first job's findings as input \u2014 with an explicit instruction to skip anything already flagged \u2014 removes the duplication at the source. Merging the jobs into one long-lived session (A) creates the same kind of context-carryover risk seen elsewhere in CI reviews, and a purely infrastructure-level dedup pass (C) is a heavier solution than simply passing the first job's output forward.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-042",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A test-generation step produces unit tests referencing a fixture path like `/opt/ci-fixtures/seed-data.json`. These tests pass on every developer's local machine, but roughly 60% of them fail once run inside the containerized CI runner, where that absolute path doesn't exist. What's the most likely root cause, and the most direct fix?",
    "options": [
      "The generated code assumes Unix-style paths; rewriting the tests to use Windows-style paths would resolve the CI failures",
      "The test-generation prompt was never told that fixture paths must be relative to the repository root, and the project's `CLAUDE.md` doesn't document the test fixtures, helper utilities, or test-data layout actually available in the CI environment \u2014 so generation has no way to know the local absolute path won't exist there",
      "CI containers mount volumes differently than developer machines; the fix belongs in the container configuration, not the generated tests",
      "The test-generation step runs with `context: fork`, which is why it can't see the rest of the repository"
    ],
    "correct": 1,
    "explanation": "The generated tests fail in CI specifically because nothing available to the test-generation step describes the CI environment's actual fixture layout \u2014 the model has no way to know a developer-machine absolute path won't exist inside the container. Documenting the real fixture locations, helper utilities, and test-data structure in `CLAUDE.md` (or an equivalent always-loaded reference) gives every future invocation the information it's currently missing.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-043",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A code-review job outputs structured findings (`line_number`, `severity`, `description`) via enforced JSON schema output. Reviewing a sample of findings, several reference line numbers well outside the actual range of lines the PR touched \u2014 for example, a finding at line 287 on a PR that only modified lines 42\u2013156. These out-of-range findings still get posted as PR comments, where they read as irrelevant noise. What's the most reliable way to stop out-of-bounds findings from being posted?",
    "options": [
      "Add an instruction to the review prompt: \"only report findings within the changed lines of the diff\"",
      "Before posting each finding as a comment, validate its `line_number` against the PR diff's actual line range, and discard (or hold for manual review) anything that falls outside it",
      "Switch to a larger model on the theory that it will have a better understanding of file scope",
      "Lower the sampling temperature so line numbers come out \"more precise\""
    ],
    "correct": 1,
    "explanation": "A prompt instruction to \"only report changed lines\" doesn't stop the model from generating a line number outside that range in the first place; validating each finding's `line_number` against the PR's actual diff bounds before posting is the deterministic check that actually filters out-of-range findings, rather than hoping instruction-following prevents them.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-044",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `.claude/rules/security.md` file scoped with `paths: [\"src/**/*.ts\"]` contains guidance like \"wrap all async operations in try/catch.\" Applied uniformly, this guidance also fires on test files such as `src/auth.test.ts`, where patterns like `expect(promise).rejects.toThrow()` are the idiomatic way to test a rejection and genuinely don't need a surrounding try/catch. Developers have started dismissing these findings as \"doesn't apply to tests.\" What's the best way to separate production guidance from test-file guidance here?",
    "options": [
      "Add an informal exception clause directly into the security guidance's prose: \"...except in test files\"",
      "Add a second rule file scoped to test files specifically (e.g. `paths: [\"src/**/*.test.ts\"]`) containing test-aware guidance, so test files get conventions appropriate to tests instead of inheriting production-oriented rules wholesale",
      "Remove all path-scoped rules and rely solely on a single root-level project memory file for every convention",
      "Turn the security guidance off entirely until someone manually reviews every future finding"
    ],
    "correct": 1,
    "explanation": "A second rule file scoped specifically to test files lets test-appropriate conventions apply on their own terms, instead of inheriting a production-oriented rule (like mandatory try/catch wrapping) that doesn't fit idiomatic test patterns such as asserting on a rejected promise. This is more maintainable than an informal prose exception bolted onto the production rule (A), and it doesn't require giving up path-scoped guidance altogether (C).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-045",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A test-generation prompt says \"write thorough unit tests,\" and the resulting tests assert on implementation details \u2014 e.g. checking that a specific internal helper function was called a specific number of times \u2014 rather than on observable outcomes. The tests pass initially, but as soon as the implementation is reorganized (with identical external behavior), they break, generating churn complaints even though nothing user-facing changed. The prompt already includes \"focus on behavior.\" What's the most effective next step?",
    "options": [
      "Lower `max_tokens` to force shorter, and hopefully simpler, tests",
      "Provide 2\u20133 concrete before/after examples contrasting an implementation-detail test with a behavior-driven test for the same function, and document the distinction as a standard in `CLAUDE.md`",
      "Switch to a larger model, expecting it to have an inherently better grasp of testing philosophy",
      "Have developers manually rewrite every generated test to remove implementation-detail assertions"
    ],
    "correct": 1,
    "explanation": "\"Focus on behavior\" alone hasn't resolved the ambiguity because \"behavior\" itself needs to be pinned down concretely; before/after examples contrasting an implementation-detail assertion with a behavior-driven one, documented as a standard, gives the model a concrete boundary to apply consistently \u2014 which a vague prose instruction, a smaller `max_tokens` budget, or a different model don't provide on their own.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-046",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A test-generation step is given the existing test file as context specifically to avoid creating duplicate tests. It still generates a new test with the exact same name as an existing one in that file \u2014 both are named identically. When the suite runs, the second definition silently overwrites the first, and the original test never executes again without anyone noticing. What's the most direct fix?",
    "options": [
      "Run the test-generation step multiple times and have a developer manually reconcile any conflicts",
      "Adopt a policy requiring every test name in the codebase to be globally unique, enforced by developer discipline",
      "Include an explicit list of the existing test names already present in that file as part of the context, with an instruction to avoid reusing any of them",
      "Disable test generation entirely for any file that already has existing tests"
    ],
    "correct": 2,
    "explanation": "The generation step already had the existing test file as context, but nothing told it those exact names were already taken; explicitly listing the existing test names and instructing the model to avoid reusing any of them gives it the specific information needed to prevent a silent, accidental name collision.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-047",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `PostToolUse` hook runs a code formatter after every file write, keeping the repository consistently formatted. A code-review job separately reads source files to analyze them and produce line-numbered findings as JSON. Because the review job's own file reads don't trigger the formatter, that's not the issue \u2014 instead, a separate process reformats the PR's files as part of an unrelated pre-review step, and the review job's line numbers, computed after that reformatting, no longer line up with the original PR diff's line numbers. Posted comments end up pointing at the wrong lines. What's the underlying issue, and the fix?",
    "options": [
      "The review job should read from a snapshot of the files exactly as they existed in the PR diff, before any reformatting step touches them, so its line numbers stay aligned with what reviewers actually see in the diff",
      "The formatter is changing line counts when it shouldn't; configure it to never alter line counts, even when reformatting",
      "This is expected and unavoidable; the review prompt should instruct the model to guess at likely line-number drift",
      "The review job needs a larger context window so it can somehow account for the reformatting on its own"
    ],
    "correct": 0,
    "explanation": "Once a separate process reformats the PR's files before review reads them, any line numbers the review computes are aligned to the reformatted version, not to the diff reviewers are actually looking at. Reading from a snapshot taken before that reformatting step keeps the review's line numbers aligned with the PR diff itself, which is what the posted comments need to match.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-048",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A code-review tool call returns findings with fields including `finding_type` (an enum: bug / style / performance / security) and `description` (free text). Every finding passes schema validation \u2014 the JSON is well-formed and every field has a legal value. But some findings are miscategorized: a finding with `finding_type: \"security\"` has a `description` reading \"variable naming could be more concise,\" which is clearly a style comment, not a security issue. This routes the finding to the wrong downstream review queue, and schema validation doesn't catch it. What's the most reliable fix?",
    "options": [
      "Add more fine-grained values to the `finding_type` enum to reduce ambiguity between categories",
      "Add a deterministic post-generation check that cross-references `finding_type` against keyword/pattern signals in `description`, flagging likely category mismatches before the finding is routed anywhere",
      "Switch to a larger model on the assumption it will have better categorical judgment",
      "Lower `max_tokens` to encourage more concise, and hopefully more accurate, categorization"
    ],
    "correct": 1,
    "explanation": "Schema validation only confirms the JSON is well-formed and each value is a legal enum member \u2014 it has no way to check whether the chosen category actually matches the finding's own description. A deterministic post-generation check that cross-references category against description content catches exactly this class of semantically-wrong-but-syntactically-valid output, which more enum granularity or a different model wouldn't reliably fix.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-050",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A test-generation job runs in a completely fresh session for each PR, producing tests that technically pass locally but consistently fail once merged into the team's CI suite \u2014 because they use generic ad hoc mocking instead of the repository's established test harness, custom fixtures, and helper utilities. The invocation only receives the changed code; none of the team's testing conventions or available utilities are documented anywhere the generation step can see them. What combination of changes would most improve generated test quality here?",
    "options": [
      "Move testing guidance to an external wiki that developers are expected to read themselves; tests will improve once humans internalize the conventions",
      "Document the team's testing conventions, available fixtures/helpers, and test-harness setup in `CLAUDE.md` so every test-generation invocation has that context available, and include a short example showing correct use of the existing test infrastructure",
      "Restrict test generation to only the simplest, dependency-free utility functions",
      "Stop using Claude Code for test generation on anything that depends on shared test infrastructure"
    ],
    "correct": 1,
    "explanation": "The generated tests fail in CI because nothing in the invocation describes the team's actual test infrastructure; documenting conventions, fixtures, and helpers in `CLAUDE.md` (giving every invocation that context) combined with a concrete example of correct usage (showing, not just telling, what \"correct\" looks like) directly targets the missing information, rather than relying on developers to catch it after the fact or restricting generation to only the simplest possible cases.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-051",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An invoice-extraction pipeline using `tool_use` with a strict JSON schema produces syntactically valid JSON every time, but a downstream review flags that a `vendor_name` value like \"Acme Corp\" sometimes appears in the output even though no such name exists anywhere in the source document. The schema defines `vendor_name` as a required string. What change would most reliably catch this kind of hallucination going forward?",
    "options": [
      "Lower the temperature to force more deterministic output",
      "Make `vendor_name` nullable instead of required",
      "Add a `vendor_source_location` field (e.g., \"letterhead,\" \"signature block,\" \"table header,\" or null) documenting where in the source the vendor name was actually found, forcing the extraction to ground its claim in something checkable",
      "Add a few-shot example that explicitly instructs the model not to hallucinate"
    ],
    "correct": 2,
    "explanation": "Schema validity only confirms the JSON is well-formed, not that a claimed value actually exists in the source. A `vendor_source_location` field forces the extraction to ground its claim in a specific, checkable part of the document \u2014 a null value there signals the vendor genuinely wasn't found, making hallucination visible in a way a required-but-ungrounded string field never was.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-052",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A contract-extraction pipeline has two tools: one for prose clauses, one for tabular terms. Many real contracts contain both. The two tool descriptions currently say one extracts \"contract text\" and the other extracts \"document tables,\" but in practice the model tends to call only one of the two tools even on documents that clearly contain both prose and tables. What's the most direct fix?",
    "options": [
      "Merge the two tools into a single combined extraction tool",
      "Rewrite both descriptions to clearly state which data each tool covers, and explicitly note that documents containing both prose and tables should trigger both tools in sequence",
      "Force `tool_choice` to a single specific named tool",
      "Add a preprocessing step that physically splits every document into separate table-only and prose-only files before extraction"
    ],
    "correct": 1,
    "explanation": "Tool descriptions are the primary signal driving selection; when they're vague about scope and silent on documents that need both tools, the model has no reason to call more than one. Making the descriptions explicit about what each covers \u2014 and stating outright that a document with both prose and tables should trigger both \u2014 directly addresses the observed under-calling, ahead of merging the tools (A) or forcing a single named tool (C).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-053",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team processes 40 vendor invoices as a single long batch within one conversation. The first 10 or so extract cleanly, but starting partway through the batch, later invoices begin returning vendor names, account numbers, or reference codes that actually belong to an earlier invoice in the same batch, not the one currently being extracted. What change would most reliably eliminate this cross-document carryover?",
    "options": [
      "Increase `max_tokens` to give the model more room to extract carefully",
      "Split the batch into independent single-invoice extraction calls instead of processing all 40 within one shared conversation",
      "Add a scratchpad listing every vendor and reference number seen so far, instructing the model to avoid reusing any value already on the list",
      "Lower the model's temperature"
    ],
    "correct": 1,
    "explanation": "Processing all 40 invoices inside one shared conversation lets details from earlier documents bleed into later extractions as context accumulates \u2014 splitting the batch into independent, single-invoice calls removes the shared context that's causing the carryover entirely, rather than just narrowing it (as a scratchpad, C, would) or hoping more tokens or a lower temperature changes the underlying behavior.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-054",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A purchase-order extraction schema requires a `po_number` field and also has a `document_type` enum (`\"purchase_order\" | \"invoice\" | \"quote\"`). In practice, many documents get classified as `\"purchase_order\"` even though they're actually invoices that never contained a PO number at all \u2014 and validation, which runs only after the full extraction is returned, then fails on the missing `po_number`. What change would most reliably improve accuracy here?",
    "options": [
      "Keep retrying the same prompt until validation happens to pass",
      "Make `po_number` nullable so invoices no longer fail validation, while keeping `document_type` required as-is",
      "Restructure extraction into two steps: first classify the document type from its structure/headers, then only require `po_number` when that first step actually confirms the document is a purchase order",
      "Drop the `po_number` requirement from the schema entirely"
    ],
    "correct": 2,
    "explanation": "Since whether `po_number` should even be expected depends entirely on the document actually being a purchase order, classifying the document type first and only then conditionally requiring `po_number` prevents the mismatch from ever reaching validation, instead of discovering it only after the full extraction already ran (A) or giving up the requirement across the board (B, D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-055",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A contract-extraction schema has a required `contract_start_date` field. Some contracts state both an \"executed date\" (when the parties signed) and a separate \"effective date\" (when obligations actually begin), and these differ. The model picks inconsistently between the two across otherwise-similar contracts, and adding a couple of generic few-shot examples hasn't resolved the inconsistency. What's the next step?",
    "options": [
      "Increase `max_tokens` to give the model more room to reason about which date to pick",
      "Merge both dates into a single freeform text field instead of picking one",
      "Add few-shot examples that include the explicit reasoning for the choice (e.g., \"when both dates appear, prefer the effective date, since that's when obligations actually begin\") plus a schema-level comment stating that precedence rule directly",
      "Switch to a larger model and hope it infers the right precedence on its own"
    ],
    "correct": 2,
    "explanation": "Generic before/after examples weren't enough because they didn't convey *why* one date should be preferred over the other; adding the explicit precedence reasoning to the examples, backed by a schema-level comment stating the same rule, gives the model a concrete, repeatable basis for the choice instead of leaving it to infer a pattern from examples alone.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-056",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Two extraction tools, one for pulling out defined terms from a contract and one for pulling out the parties' actual obligations, both currently have descriptions that vaguely claim to cover \"important contract terms.\" Developers have observed that the terms-extraction tool is sometimes relied on to also capture obligations, leading to silently incomplete extractions when it doesn't. What's the most effective first fix?",
    "options": [
      "Rewrite both descriptions to explicitly separate their scope \u2014 state precisely what each tool does and doesn't cover, with a short example for each, so the overlap in \"important contract terms\" no longer blurs the boundary",
      "Force the pipeline to always call both tools on every document regardless of content",
      "Merge the two tools into a single combined extraction tool",
      "Add a validation check after extraction that tries to detect whether obligations are missing from the output"
    ],
    "correct": 0,
    "explanation": "Both tools currently describe themselves with the same vague phrase (\"important contract terms\"), which is exactly what's letting one substitute for the other. Rewriting the descriptions to state precisely what each does and doesn't cover, with an example apiece, removes the ambiguity directly \u2014 well ahead of forcing both tools to always run (B) or merging them outright (C), which gives up the distinction the team wants to keep.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-058",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team processes 500 supplier invoices every business day and wants to move extraction to the Message Batches API to capture a meaningful cost discount. Current same-day processing takes about 2 hours from submission. Downstream financial-close processes need results by 9 AM the next business day. The Batches API carries no latency SLA and can, in the worst case, take up to 24 hours. If a batch is submitted at 6 PM, what's the latest it might reasonably return under that worst case, and what does that imply?",
    "options": [
      "Always by 8 AM the next morning, so the move is safe as planned",
      "As late as 6 PM the following day (24 hours after submission) in the worst case \u2014 which would blow past the 9 AM downstream deadline entirely, meaning this workflow shouldn't rely on the Batches API for its full volume without a real fallback plan",
      "Within roughly 2 hours, the same as the current synchronous process",
      "There's a documented, guaranteed 18-hour turnaround specifically for financial workloads"
    ],
    "correct": 1,
    "explanation": "With no latency SLA, a 6 PM submission could in the worst case take the full 24 hours, landing right around 6 PM the following day \u2014 well past the 9 AM downstream deadline. Treating \"up to 24 hours\" as if it were a guaranteed same-morning turnaround (A) or assuming it behaves like the current 2-hour synchronous process (C) both mistake an unbounded worst case for a reliable one.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-059",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A vendor-management schema classifies every vendor with an enum: `\"supplier\" | \"contractor\" | \"service_provider\" | \"reseller\"`. In practice, some real vendor relationships (joint ventures, co-managed partnerships, regional distributor arrangements) don't cleanly fit any of the four categories, and the model is forced into a misclassification every time one comes up. What schema change best handles this kind of long-tail extensibility?",
    "options": [
      "Drop the enum constraint entirely and make `vendor_category` a free-text string",
      "Add an `\"other\"` value to the enum, plus an optional `vendor_category_detail` string field for a free-text explanation whenever `\"other\"` is chosen",
      "Create an entirely separate extraction tool for every additional vendor type as it's discovered",
      "Add a confidence score to the category field and route anything below a threshold to manual review, without changing the enum itself"
    ],
    "correct": 1,
    "explanation": "An `\"other\"` enum value paired with a free-text detail field lets the schema stay structured and queryable for the common cases while still accommodating the genuine long tail of relationships that don't fit any predefined category \u2014 without either abandoning structure entirely (A) or requiring a brand-new tool every time a new edge case appears (C).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam5-060",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Six months into production, a team wants to analyze why certain extractions get rejected by downstream reviewers. Current logs record only `document_id`, `field_name`, `extracted_value`, and a final `disposition` of accepted or rejected \u2014 nothing about the document itself. The team suspects failures cluster around things like poor-quality scans, handwritten amounts, very long multi-page contracts where key terms appear late in the document, or particular vendor formats, but the existing logs give no way to confirm or prioritize any of that. What should be added to enable real root-cause analysis?",
    "options": [
      "A random UUID per extraction, purely for tracing a record back to its source document",
      "Structured document metadata logged alongside each extraction \u2014 source type (scanned vs. native), an OCR-quality signal where applicable, page count, and roughly where in the document the field was found \u2014 so rejections can be correlated with the actual characteristics of the input that produced them",
      "A separate machine-learning model trained specifically to predict which documents are likely to fail",
      "A recurring manual review of a random sample of rejections, done by hand, to look for patterns"
    ],
    "correct": 1,
    "explanation": "Logging the actual characteristics of the input alongside each extraction \u2014 scan quality, page count, roughly where in the document a field was found \u2014 is what makes it possible to correlate rejections with real causes (a long contract, a poor scan, a particular vendor's layout) instead of treating every rejection as an undifferentiated data point with nothing to explain it.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-001",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your resolution agent must check customer account status and recent order history before acting on a case. The two lookups have no ordering dependency on each other, but the coordinator currently dispatches them as two sequential subagent calls, and high case volume is making that round-trip latency a real bottleneck. What's the most effective fix?",
    "options": [
      "Merge both lookups into a single combined subagent that performs both investigations in one turn",
      "Emit both `Task` calls within a single coordinator response so the two subagents run concurrently, then collect both results before proceeding",
      "Add a batching layer that packs multiple subagent invocations into one API request",
      "Increase `max_tokens` so each lookup resolves faster"
    ],
    "correct": 1,
    "explanation": "Emitting both `Task` calls within a single coordinator response is what actually runs the two subagents concurrently; merging them into one subagent (A) loses the modularity of separate investigations, and neither a generic batching layer (C) nor a bigger token budget (D) changes the fact that the calls are currently dispatched sequentially.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-002",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your refund tool exposes `refund_reason_code` (an enum: \"defective,\" \"not_as_described,\" \"customer_request,\" \"policy_exception\") and `refund_justification` (free text for additional context). Logs show the agent frequently stuffs long explanatory text into `reason_code` and leaves `justification` blank, even on cases where a bare code isn't enough detail for the finance team to evaluate. Both parameters already have descriptions. What's the clearest next fix?",
    "options": [
      "Rename both parameters to something else entirely, on the theory that new names alone will resolve the confusion",
      "Merge them into a single free-text `refund_reason` field and parse category and detail out of it server-side",
      "Expand both parameter descriptions with concrete guidance: `reason_code` gets \"must be exactly one of the enum values, never free text\"; `justification` gets an example of what to write when the code alone doesn't capture enough context",
      "Add a hook that rejects the call outright whenever `justification` is empty"
    ],
    "correct": 2,
    "explanation": "Concrete guidance in the description \u2014 exactly what belongs in the enum vs. what belongs in free text, with an example of when justification is actually needed \u2014 is the direct, lowest-effort fix for this kind of field-misuse pattern, ahead of renaming (A), merging the fields (B), or bolting on a rejection hook (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-003",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A customer disputes charges across three orders plus one account-level adjustment, requesting a $620 total refund. An initial lookup surfaces all four transaction amounts. After two subagents separately investigate return eligibility and account reconciliation, the synthesis step produces a final recommendation of \"approve $105\" \u2014 referencing the adjustment but dropping the three order amounts entirely, even though both subagents' own outputs were correct and complete. What's the most direct fix?",
    "options": [
      "Increase the context window so intermediate results never need to be summarized",
      "Maintain a persistent \"case facts\" block (each transaction ID and amount) carried alongside every prompt, outside the part of the conversation that gets condensed into a narrative summary",
      "Re-run both subagent investigations at a higher temperature for more thorough coverage",
      "Have the customer restate all four disputed amounts before the agent finalizes anything"
    ],
    "correct": 1,
    "explanation": "A persistent case-facts block carried outside the part of the conversation that gets condensed is what keeps specific numbers from disappearing during synthesis, which is exactly what happened to three of the four transaction amounts here. A bigger context window (A) doesn't stop summarization from happening; higher temperature (C) adds noise, not fidelity; and asking the customer to repeat themselves (D) is a workaround, not a fix.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-004",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your single general-purpose resolution agent handles returns, billing disputes, and account-security cases, with access to every relevant tool across all three areas. First-contact resolution varies sharply by category: returns succeed 88% of the time, billing disputes only 59%, and account-security cases are occasionally escalated based on insufficient identity verification depth. What's the most effective structural fix?",
    "options": [
      "Give the single agent even more tools, including advanced financial-analysis and multi-factor-auth capabilities",
      "Introduce a lightweight intake step that classifies each case and routes it to a specialized subagent per category (returns, billing, security), each scoped to only the tools relevant to its own case type",
      "Keep one general agent, but add 15+ few-shot examples spanning all three case types",
      "Split the system into three fully separate backend services, one per case type, with no shared coordinator at all"
    ],
    "correct": 1,
    "explanation": "Routing each case to a specialized subagent scoped to only its own category's tools directly addresses uneven performance across very different case types, without expanding any single agent's tool surface (A) or relying on examples alone to cover three very different domains (C). Splitting into fully separate backend services (D) throws away the shared coordinator without actually fixing tool scoping.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-005",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "`escalate_to_human` is meant to always carry structured context (customer ID, root cause, attempted actions), and the system prompt says so explicitly and emphatically. Logs still show a meaningful share of escalations going out with minimal or blank context, and the coordinator doesn't stop them. What's the most direct, deterministic fix?",
    "options": [
      "Make the system-prompt wording even stronger and more emphatic",
      "Define `escalate_to_human`'s input schema so `customer_id`, `root_cause`, and `attempted_actions` are required parameters the call cannot be made without",
      "Add a hook that inspects the call after the fact and flags escalations with thin context for follow-up",
      "Split `escalate_to_human` into two separate tools, one for routine escalations and one for emergencies"
    ],
    "correct": 1,
    "explanation": "Making the required fields part of the tool's own input schema means the call literally cannot be made without them \u2014 a deterministic guarantee that stronger prompt wording (A) or a hook that only flags problems after the fact (C) can't provide. Splitting the tool in two (D) doesn't address the missing-context problem itself.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-006",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your written policy explicitly covers defective items (90-day window) and wrong items shipped (30-day window), but says nothing about unopened, resalable items returned outside either window \u2014 a real request that comes up in about 5% of cases. The agent currently escalates every one of these, which is dragging down first-contact resolution, even though the policy's spirit plausibly supports approving some of them. Under what condition should a case like this actually go to a human?",
    "options": [
      "Whenever it involves more than one order or a large dollar amount",
      "When the agent has genuinely run out of applicable policy to reason from \u2014 the request falls into real silence or ambiguity in the documented rules \u2014 and further tool calls won't resolve that gap",
      "Once the agent has made at least three tool calls, since that indicates a thorough-enough investigation",
      "Whenever sentiment analysis on the customer's message indicates frustration or urgency"
    ],
    "correct": 1,
    "explanation": "The right trigger for escalation is a genuine gap or silence in the documented policy that no further investigation can resolve on its own \u2014 not proxies like order count, dollar amount, tool-call count, or sentiment, all of which correlate poorly with whether the agent is actually equipped to decide the case.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-007",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A pilot workflow needs three sequential checks \u2014 eligibility, account reconciliation, fraud assessment \u2014 where a red flag at any step should escalate immediately rather than continuing to the next step. The current coordinator runs all three regardless, and only checks for red flags once every step has already finished, wasting effort on cases that should have escalated at step one. What's the best fix?",
    "options": [
      "Bake a rigid, fully-enumerated if-then-else decision tree directly into the coordinator's prompt",
      "Have the coordinator inspect each subagent's result before dispatching the next one, and escalate immediately the moment a red flag appears, instead of always running the full sequence",
      "Remove the subagent layer and have one agent call all the underlying tools directly with branching logic",
      "Run all three checks in parallel, then escalate afterward if any of them raised a flag"
    ],
    "correct": 1,
    "explanation": "Checking each step's result before dispatching the next lets the coordinator escalate the moment a red flag appears, instead of always paying for every remaining step regardless of outcome. A rigid pre-baked decision tree (A) is brittle against cases outside its exact enumerated conditions, and running everything in parallel (D) doesn't save any of the wasted work this fix is meant to eliminate.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-009",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A subagent tasked with verifying a customer's shipping address calls an address-validation tool twice; both attempts time out. It returns `{\"status\": \"complete\", \"findings\": \"Address verification unavailable\"}`. The coordinator reads this as \"verification succeeded, address is fine\" and proceeds to process the refund \u2014 but the address was actually wrong, and the shipment later fails. What's the core issue, and the fix?",
    "options": [
      "The subagent's retry logic is too conservative; it should keep retrying until the backend eventually responds",
      "The subagent needs a way to clearly distinguish \"I investigated and got a definitive answer\" from \"I was unable to investigate at all,\" using a distinct status or explicit failure marker \u2014 so the coordinator can't mistake an inability to verify for a successful verification",
      "Address validation is too unreliable to be part of this workflow and should be removed",
      "The coordinator should automatically escalate any case where address data comes back unavailable"
    ],
    "correct": 1,
    "explanation": "The subagent needs a way to say \"I could not verify this\" that's structurally distinct from \"I verified this and it's fine\" \u2014 without that distinction, the coordinator has no way to avoid treating an inability to check as a clean pass. Retrying indefinitely (A) doesn't solve the reporting problem, dropping the check (C) loses real value, and blanket auto-escalation (D) overcorrects for a problem that's really about signal clarity.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-010",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A complex billing dispute has two defensible outcomes given the exact same underlying facts (verified identity, order history, account status): a strict-policy calculation of $280, and a goodwill-exception calculation of $420. You want to reason through both paths independently \u2014 without one path's assumptions contaminating the other \u2014 but re-verifying the same facts from scratch in two completely separate sessions wastes backend calls and risks the two paths ending up with subtly inconsistent fact bases. What approach best threads this needle?",
    "options": [
      "Stay in one session and add explicit labels at each step noting which path is currently being reasoned about",
      "Run two entirely independent fresh sessions for the two paths, accepting the duplicated backend calls and the risk of drifting fact bases as an unavoidable cost",
      "Branch into two isolated sessions from the same already-verified shared fact base, explore each path independently within its own branch, then bring both conclusions back together for a final recommendation",
      "Have the agent keep detailed written notes and re-read them each time it switches between the two paths"
    ],
    "correct": 2,
    "explanation": "Branching from an already-verified shared fact base into two isolated explorations avoids both cross-contamination between the two paths (which a single shared session risks) and the wasted, potentially-inconsistent re-verification of two fully separate sessions (B). Manual labeling within one session (A) or note-taking between path switches (D) both rely on discipline rather than actual isolation.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-011",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your `.claude/settings.json` has a `PreToolUse` hook matching the `Write` tool that runs a validation script \u2014 exit code 0 for a valid file, non-zero for an invalid one. A developer's edit would produce a configuration file that fails that validation. What happens?",
    "options": [
      "The file is written first, and the validation failure is only reported afterward",
      "The write is blocked outright \u2014 the hook's non-zero exit prevents the tool call from executing at all",
      "The hook only applies to `Bash`-style commands, so a `Write` call bypasses it entirely",
      "The write proceeds regardless, since hooks are advisory rather than enforced"
    ],
    "correct": 1,
    "explanation": "A `PreToolUse` hook that exits non-zero blocks the tool call outright, before it ever executes \u2014 that's the entire point of the mechanism, not an advisory suggestion layered on top of it. The hook fires for the `Write` call regardless of file type (ruling out C), and the block happens before, not after, anything gets written (ruling out A and D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-012",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A convention needs to apply consistently to API-related code scattered across several unrelated directory trees, not confined to one folder. A developer creates `.claude/rules/api-validation.md` with `paths: [\"src/api/**\", \"lib/api/**\"]`. Later, new code is added under `server/api/handlers/`. Does the existing rule apply there?",
    "options": [
      "Yes \u2014 the presence of \"api\" anywhere in a path is enough to match",
      "No \u2014 `src/api/**` and `lib/api/**` only match those two specific directory trees; a path like `server/api/**` needs to be added explicitly (or a broader pattern like `**/api/**` used instead)",
      "Yes, but only once the new files have been committed to version control",
      "No, because rules never apply to any directory that didn't exist when the rule file was first created"
    ],
    "correct": 1,
    "explanation": "Glob patterns are literal path matches: `src/api/**` and `lib/api/**` only cover those two specific trees, and a new directory like `server/api/` needs to be added explicitly (or covered by a broader pattern such as `**/api/**`) \u2014 it isn't automatically included just because it also contains the word \"api.\"",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-013",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A skill at `.claude/skills/design-phase/SKILL.md` uses `context: fork` to keep a long back-and-forth about architecture options out of the main conversation, and returns a final structured proposal as its result. Does the main session also retain the intermediate questions, dead ends, and exploratory reasoning that happened inside that fork?",
    "options": [
      "Yes \u2014 `context: fork` only changes what's displayed; all the underlying reasoning is still part of the session",
      "No \u2014 the fork's exploratory reasoning stays isolated to keep the main session's context clean; only the final result the skill actually returns comes back",
      "Only if the skill happens to summarize its own reasoning as part of that final output",
      "Yes, but only after a manual step re-merges the fork's context into the main thread"
    ],
    "correct": 1,
    "explanation": "`context: fork` exists specifically to keep a skill's exploratory reasoning out of the main session's context; only the final result the skill actually returns comes back, not the intermediate questions and dead ends that led to it.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-014",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A task is described simply as \"remove unused dependencies from `package.json` and update three import statements.\" On investigation, it turns out this actually means reconciling 15 separate package removals with genuinely competing priorities from eight different teams that depend on different subsets of them. Given that complexity, what's the more appropriate approach?",
    "options": [
      "Direct execution \u2014 dependency removal is inherently a simple, mechanical task",
      "Plan mode \u2014 the real work here is resolving competing priorities and removal order across teams, which is a design question that benefits from being worked out before any file gets touched",
      "Direct execution, switching to plan mode only if something unexpected comes up along the way",
      "Neither \u2014 this specific kind of cross-team coordination is out of scope for Claude Code entirely"
    ],
    "correct": 1,
    "explanation": "Once the real shape of the task turns out to be reconciling genuinely competing priorities across eight teams, that's exactly the kind of design question plan mode is suited to work through before any file gets touched \u2014 a very different situation from the surface-level \"update three imports\" framing the task started with.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-015",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `/generate-tests` skill produces new test files with a lot of repeated boilerplate \u2014 fixture setup, mock definitions, assertion patterns \u2014 duplicated nearly identically across runs. Re-invoking it with an added instruction to \"avoid boilerplate\" doesn't change the output. What's the most direct fix?",
    "options": [
      "Include the team's existing test files as context, and document the available fixtures and standard assertion patterns the team already has in `CLAUDE.md`",
      "Increase `max_tokens` so the skill has more room to vary its output",
      "Add one \"good\" example test at the very start of the prompt as a single few-shot example",
      "Decrease `max_tokens` to force shorter, simpler generated tests"
    ],
    "correct": 0,
    "explanation": "Giving the model the team's actual existing tests as context, plus documenting available fixtures and assertion patterns in `CLAUDE.md`, gives it concrete, specific patterns to reuse instead of reinventing boilerplate each time \u2014 which a token-budget change (B, D) or a single extra example (C) don't reliably provide.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-016",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `validateUser` function needs three interdependent checks: the user must be active, must have an assigned role, and that role must pass a whitelist. Across two separate attempts at implementing this, Claude structures the interaction between the three checks differently each time \u2014 once checking all three independently, once only checking the role if the user is already active. What's the most effective way to pin down the exact intended behavior?",
    "options": [
      "Repeat the requirement more forcefully: \"make sure all three conditions are checked consistently\"",
      "Provide a small test suite covering every meaningful combination (active/inactive \u00d7 role-present/missing \u00d7 role-valid/invalid) and share the actual failures after each attempt",
      "Ask Claude to \"be more careful about edge cases this time\"",
      "Generate five separate attempts and manually pick whichever looks best"
    ],
    "correct": 1,
    "explanation": "A small test suite covering every meaningful combination of the three interdependent conditions, with real failures shared back after each attempt, pins down the exact intended behavior far more reliably than repeating the same prose requirement more forcefully (A, C) or picking a favorite among several blind attempts (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-017",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Before implementing a cache-eviction strategy in a service the developer has never worked in, they want Claude to first surface open design questions (TTL vs. LRU, single- vs. multi-tier, what triggers invalidation) rather than go straight to an implementation. Which technique fits best?",
    "options": [
      "Test-driven iteration, backed by a comprehensive test suite covering cache behavior",
      "The interview pattern \u2014 have Claude ask clarifying design questions before proposing any implementation",
      "Plan mode, working from a detailed architectural brief the developer writes upfront",
      "Direct execution, just with a longer and more specific initial prompt"
    ],
    "correct": 1,
    "explanation": "The interview pattern is built for exactly this situation: a domain unfamiliar enough that the developer can't yet know which tradeoffs (TTL vs. LRU, tiering, invalidation triggers) actually matter, so surfacing those questions before implementation catches gaps a detailed upfront prompt would likely miss.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-018",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your `.claude/settings.json` has two separate `PreToolUse` hooks: one matching `Write` that runs a formatting check, and one matching `Edit` that runs a type-checking validation. A developer performs an `Edit` on a file that would fail the formatting check but pass type-checking. Which hook(s) actually run?",
    "options": [
      "The formatting hook runs first alphabetically, blocks the call, and type-checking never runs",
      "Both hooks run regardless of which tool was called \u2014 formatting is checked, then type-checking",
      "Only the type-checking hook runs, since it matches `Edit`; the formatting hook is scoped to `Write` and doesn't fire here at all",
      "Neither hook runs, since hooks are only evaluated for `Write`, never for `Edit`"
    ],
    "correct": 2,
    "explanation": "Hooks are scoped by their `matcher`; a hook matching `Write` simply doesn't fire for an `Edit` call, and vice versa. Since this operation is an `Edit`, only the type-checking hook (matched to `Edit`) runs \u2014 the formatting hook never gets a chance to block anything here.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-019",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A skill at `.claude/skills/security-audit/SKILL.md` has `allowed-tools: [\"Read\", \"Grep\"]` in its frontmatter, meant to keep it to pure file analysis. Mid-run, it decides it needs to actually execute a quick `node --check` on a module to confirm it's syntactically importable, and attempts to use `Bash`. What stops this from working?",
    "options": [
      "`Bash` isn't in the skill's `allowed-tools` list, so the skill cannot invoke a tool outside that set",
      "`allowed-tools` is only advisory \u2014 the call goes through, just with an extra permission prompt",
      "`Bash` is categorically disallowed inside any skill, regardless of configuration",
      "`allowed-tools` doesn't actually restrict anything; a skill can use any tool available to the parent session"
    ],
    "correct": 0,
    "explanation": "`allowed-tools` genuinely restricts a skill to the listed tools; a skill can't reach for `Bash` if it isn't on that list, full stop \u2014 this isn't an advisory setting (B) or a blanket ban on `Bash` specifically (C), and it does actually constrain what the skill can do (ruling out D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-020",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A developer is deep into a four-hour refactoring session, having created 25+ new utility functions along the way. The session started with an explicit constraint: \"every new utility function must include a full parameter/return-type doc comment.\" Around the three-and-a-half-hour mark, Claude quietly stops following that convention and starts writing bare one-line comments on new utilities instead. The developer doesn't want to restart and lose the accumulated refactoring context. What's the most effective fix?",
    "options": [
      "Restart the session to reset context and re-establish the constraint from scratch",
      "Maintain a short scratchpad file stating the doc-comment constraint explicitly, and have Claude check it before writing a new utility, giving the rule a durable anchor outside the flow of an increasingly long conversation",
      "Increase `max_tokens` so Claude has more room to \"remember\" the constraint",
      "Repeat the constraint verbally in the chat with extra emphasis whenever it's noticed slipping"
    ],
    "correct": 1,
    "explanation": "A short scratchpad stating the constraint explicitly, checked before writing a new utility, gives the rule a durable anchor outside the conversation's own shifting \"salience\" \u2014 which is what quietly erodes over a long session and is why the convention started slipping around hour three and a half. Restarting (A) throws away the accumulated refactoring context the developer explicitly wants to keep, and repeating the constraint verbally (D) is exactly the kind of reminder that already stopped working once.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-021",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A research coordinator runs a fixed pipeline \u2014 search, then analyze, then synthesize, then report \u2014 with no step in between that re-evaluates whether coverage is actually adequate. On topically broad requests (e.g., \"AI regulation across multiple jurisdictions\"), the resulting reports keep coming back with real regional gaps, even though every individual subagent completed its assigned piece without error. What architectural change addresses this?",
    "options": [
      "Give the search subagent access to more search tools so it can generate extra results upfront",
      "After synthesis, have the coordinator evaluate whether real coverage gaps remain and, if so, conditionally spawn targeted follow-up searches before finalizing the report",
      "Simply increase the number of initial parallel search queries at the start",
      "Let each subagent decide on its own whether to spawn additional follow-up investigations"
    ],
    "correct": 1,
    "explanation": "Adding an explicit coverage check after synthesis \u2014 and conditionally spawning follow-up searches only when real gaps remain \u2014 is what lets the pipeline adapt to what it actually finds, instead of running the same fixed sequence regardless of whether the topic turned out to need more regional coverage than initially planned.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-022",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator runs three subagents in parallel \u2014 web search, document analysis, and source synthesis \u2014 then passes all three outputs into a single, very long block of text for a final synthesis pass. The resulting report draws heavily on the search and document-analysis findings, but almost never references the source-synthesis subagent's output, even though that subagent completed successfully and returned substantive material. What's the most likely cause?",
    "options": [
      "The third subagent's output was never actually included in what was sent to the final synthesis step",
      "A separate follow-up turn is required before synthesis can incorporate a third input source",
      "The third subagent's findings ended up buried in the middle of a very long combined prompt, with nothing structurally marking them as important, so they got less attention than the material at the start and end",
      "The document-analysis subagent's output silently overwrote the third subagent's data before synthesis ran"
    ],
    "correct": 2,
    "explanation": "When several subagents' outputs are concatenated into one very long prompt with nothing marking which parts matter, material buried in the middle predictably gets less attention than what's near the start or end \u2014 the classic \"lost in the middle\" effect, not a case of the data having been dropped or overwritten (A, D) or needing an extra turn (B).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-023",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator has access to a `discover_available_sources` tool that returns a static, pre-curated catalog of about 150 approved research sources. In practice, the coordinator calls this tool near the start of almost every research task just to see what's available, before doing anything else \u2014 an extra round-trip nearly every time, for content that barely changes. What's the most appropriate fix?",
    "options": [
      "Improve the tool's description so its purpose is clearer",
      "Expose the source catalog as an MCP **resource** instead of a tool, since it's read-only reference material the coordinator needs to see, not an action the model is actively deciding to take",
      "Force `tool_choice` so the discovery call always happens as the very first step",
      "Hard-code the entire source list directly into the coordinator's system prompt"
    ],
    "correct": 1,
    "explanation": "A largely static, read-only catalog that exists to be looked up \u2014 not acted on \u2014 is exactly what MCP resources are for; exposing it that way removes the tool-call decision and round-trip entirely, rather than just making the tool's description clearer (A) or forcing when the call happens (C).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-024",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator delegates \"research recent regulatory changes on topic X\" to one subagent and \"research historical precedent for topic X\" to a second subagent, reusing the exact same prompt template for both and only swapping the topic phrase. The \"recent changes\" report later turns out to reference \"established historical patterns\" and \"prior precedent,\" despite being explicitly scoped to recent developments only. What's the most likely cause?",
    "options": [
      "The two subagents share some kind of common memory pool that lets findings bleed between them",
      "Reusing the identical prompt template for both tasks carries unintended thematic association from one into the other \u2014 the shared phrasing, not any shared state, is what's pulling \"precedent\" language into the recent-changes report",
      "The coordinator's own system prompt wasn't specific enough to keep the two request types apart",
      "The two delegations should have run sequentially instead of in parallel"
    ],
    "correct": 1,
    "explanation": "With no shared state between the two delegations, what's actually carrying \"precedent\" language into the recent-changes report is the identical prompt template itself \u2014 the phrasing pattern, not any shared memory \u2014 pulling in an unintended thematic association. The fix is differentiating how each task is framed, not adjusting the coordinator's own system prompt (C) or the parallel-vs-sequential structure (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-025",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "In a coordinator's pipeline, the report-generation subagent is meant to run only after the synthesis subagent has returned its findings \u2014 but the pipeline itself has no runtime mechanism enforcing that order, only an implicit assumption. During testing, report generation occasionally starts before synthesis has actually completed, producing polished-looking sections with citations that can't be verified against anything synthesis was supposed to have vetted. What's the most reliable way to prevent this?",
    "options": [
      "Add explicit ordering language to both subagents' own system prompts",
      "Add a hook on the coordinator's dispatch step that blocks a report-generation call from proceeding until synthesis's result is actually present",
      "Add several few-shot examples showing the two steps happening in the correct order",
      "Increase the coordinator's context window so it \"remembers\" the intended order better"
    ],
    "correct": 1,
    "explanation": "A hook that actually blocks the report-generation dispatch until synthesis's result exists enforces the ordering deterministically; prompt-level ordering language (A), few-shot examples (C), or a bigger context window (D) are all still just probabilistic nudges toward an order the pipeline itself doesn't actually guarantee.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-026",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A synthesis subagent frequently needs to verify simple facts mid-synthesis \u2014 a publication date, an author's name, a cited statistic \u2014 and today every single one of these routes through the coordinator to a full search subagent and back, even though roughly 85% of these checks are genuinely simple lookups. The remaining 15% require real investigative depth. What's the best fix?",
    "options": [
      "Give the synthesis subagent unrestricted access to the same full search and analysis tools every other subagent uses",
      "Give the synthesis subagent one narrowly scoped `verify_fact`-style tool for the common, simple case, while still routing the rarer, genuinely complex checks through the coordinator",
      "Batch every verification and run them all in one dedicated pass only after synthesis has otherwise finished",
      "Drop fact verification from the synthesis step entirely to reduce latency"
    ],
    "correct": 1,
    "explanation": "A narrowly scoped verification tool lets the common, simple 85% of checks resolve locally without a coordinator round-trip, while the rarer, genuinely complex 15% still get routed through the coordinator where that overhead is actually justified. Full tool access for synthesis (A) reintroduces the coordination and scope problems scoped tools exist to avoid.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-028",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A search subagent times out partway through and returns structured context: \"provider timeout, transient, retryable, 60 of an expected 150 results collected.\" The coordinator now has to decide whether to return the partial 60 results, retry, or escalate to a human. What should actually drive that decision?",
    "options": [
      "Always return the partial results immediately, since some information beats none",
      "Always escalate, since any incomplete research inherently needs a human to weigh in",
      "Judge whether the 60 results already collected are enough to satisfy what the user actually asked for; if the missing 90 would plausibly change the conclusions, retry or escalate instead of quietly returning a report built on an incomplete picture",
      "Keep retrying indefinitely until the full 150 results are eventually collected"
    ],
    "correct": 2,
    "explanation": "Whether to return partial results, retry, or escalate should depend on whether the 60 already-collected results are actually enough to answer what the user asked \u2014 not a blanket rule to always return whatever exists (A), always escalate (B), or retry forever regardless of diminishing returns (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-029",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A document-analysis subagent hits transient errors (timeouts, rate limits) reasonably often, and the coordinator's current policy is simply \"retry once, then fail the whole run.\" As a result, roughly 8\u201310% of research runs fail outright because of one subagent's temporary hiccup. What's a more effective error-recovery design here?",
    "options": [
      "Retry every subagent indefinitely until it eventually succeeds, no matter how long that takes",
      "Use a graduated retry policy with exponential backoff (e.g., 100ms, then 500ms, then 2s) up to a small fixed attempt limit, and only then escalate or continue with a documented partial result",
      "Remove retries entirely and fail the run immediately on the very first transient error",
      "Always escalate any transient error straight to a human without attempting any recovery first"
    ],
    "correct": 1,
    "explanation": "A graduated backoff-and-retry-limit policy handles the realistic middle ground between giving up too easily (C, D) and retrying forever regardless of cost (A) \u2014 it gives genuinely transient failures a real chance to resolve without letting one subagent's hiccup indefinitely stall the whole pipeline.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-030",
    "domain": "Context Management & Reliability",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A synthesis pass works through 50 research documents in one long invocation to build a report outline. Reviewers notice a clear pattern: the first 15 sources are cited with real specificity (exact dates, study design, sample sizes), while by document 40 the synthesis is only extracting broad, generic themes. Early report sections are well-supported; later ones are coherent but noticeably vaguer about their sources. What's the most effective architectural fix?",
    "options": [
      "Increase the context window so the model can hold onto specificity across all 50 documents at once",
      "Split synthesis into two phases: a \"map\" phase that extracts detailed, specific claims from each source independently, followed by a \"reduce\" phase that reconciles and synthesizes across those per-source outputs",
      "Simply process fewer source documents per run, trimming to whatever the model's effective attention span seems to be",
      "Have the model attach a confidence score to each claim and drop everything below a cutoff from the final report"
    ],
    "correct": 1,
    "explanation": "Splitting into a \"map\" phase (detailed, per-source extraction, each source getting full attention on its own) and a \"reduce\" phase (synthesizing across those already-detailed outputs) directly counters the attention tapering that a single 50-document pass produces. A bigger context window (A) doesn't stop attention from tapering within it, and simply processing fewer documents (C) or filtering by a confidence score after the fact (D) don't address why detail degrades as the pass goes on.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-031",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A code-search MCP tool intermittently returns timeouts, but the agent has no way to tell whether a retry is likely to help or whether the underlying query itself is simply malformed \u2014 every failure comes back as `{\"isError\": true, \"message\": \"Operation failed\"}`. As a result, the agent sometimes retries a hopeless malformed query indefinitely, and sometimes gives up too early on a call that would have succeeded with one more attempt. What's the most direct fix?",
    "options": [
      "Add an internal timeout to the tool itself so it fails faster on every kind of error",
      "Add `errorCategory` (e.g. \"transient\" vs. \"validation\") and an `isRetryable` boolean to the tool's error responses, so the agent has an actual basis for deciding whether to retry",
      "Remove the tool and have the agent fall back to `Grep` instead",
      "Add a system-prompt instruction telling the agent to \"always retry timeouts, never retry validation errors\""
    ],
    "correct": 1,
    "explanation": "An `errorCategory` plus an `isRetryable` flag gives the agent an actual signal to reason from, rather than treating every failure identically \u2014 which is what's currently causing it to sometimes retry a hopeless malformed query forever and sometimes give up on a call that would have succeeded with one more attempt.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-032",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A `list_available_migrations` MCP tool returns a catalog of known database migrations. An agent calls it near the start of nearly every migration-related task just to see what's available, before doing any real analysis \u2014 an extra round-trip each time for content that's largely static within a session. What's the most efficient fix?",
    "options": [
      "Remove the tool from the agent's available tools and require the migration to be named explicitly upfront in every request",
      "Expose the available migrations as an MCP **resource** the agent can read directly, without spending a tool-call decision on pure discovery",
      "Merge every migration-related tool into one larger, more general tool",
      "Cache the tool's result in `CLAUDE.md` so at least the second call within a session can be skipped"
    ],
    "correct": 1,
    "explanation": "A largely static catalog that exists purely to be discovered, not acted on, is exactly the case MCP resources are meant for \u2014 the agent can read it directly without spending a tool-use decision on pure discovery, which merging (C) or caching into `CLAUDE.md` (D) don't actually eliminate.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-033",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An MCP server offers `list_all_tasks` (returns every task in the system) and `search_tasks` (filters by keyword). Agents sometimes still reach for `list_all_tasks` on large task inventories when `search_tasks` would clearly serve better \u2014 most often on genuinely ambiguous requests like \"find tasks updated in the last week.\" The team has already rewritten both descriptions with explicit use/non-use guidance and example queries, and the remaining mistakes are concentrated in exactly these edge cases. What's the next lever to try?",
    "options": [
      "Remove `list_all_tasks` from the toolset entirely",
      "Add 2\u20133 few-shot examples with explicit reasoning showing correct tool selection specifically for these ambiguous, edge-case queries",
      "Rename `search_tasks` to something that sounds more appealing",
      "Force `tool_choice` so `search_tasks` is always selected regardless of the request"
    ],
    "correct": 1,
    "explanation": "Once description-level fixes have already been applied and the remaining mistakes are concentrated in genuinely ambiguous edge cases, few-shot examples with explicit reasoning are the next lever \u2014 well short of removing a legitimate tool (A) or forcing selection regardless of fit (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-034",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An MCP tool `compute_code_metrics` bundles three distinct capabilities \u2014 complexity scoring, test-coverage percentage, and dependency counting \u2014 behind one generic description that lists all three. A much lighter, purpose-built `count_functions` tool also exists for the narrower job of just counting functions, and is meaningfully faster for that specific need. Logs show agents reaching for the heavier, generic tool even for requests the lightweight tool would answer just fine. What's the issue, and the fix?",
    "options": [
      "`compute_code_metrics` is simply too slow and should be deprecated",
      "The generic tool's description gives no signal about when a narrower, faster tool would serve better, so it reads as the safe general-purpose default; the fix is making that boundary explicit in the descriptions",
      "The model needs more few-shot examples covering this exact case",
      "The two tools should be merged into a single combined tool"
    ],
    "correct": 1,
    "explanation": "A generic description that never mentions a faster, narrower alternative reads as \"use me, I'm the safe default\" by omission; making that boundary explicit in the description is the direct fix, ahead of deprecating the tool (A), adding more examples for a problem that's really about missing information (C), or merging the two (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-035",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An MCP tool `fetch_repository_metadata` returns a repo's `package.json` contents, top-level README, and directory-tree structure \u2014 data that essentially never changes within a session. A productivity agent calls it near the start of almost every codebase-exploration task, adding latency to every single session even though the underlying data was already fetched the last time. What's a more efficient design here?",
    "options": [
      "Embed the metadata directly into the system prompt for every session",
      "Cache the metadata inside the agent's `CLAUDE.md` file",
      "Expose the repository metadata as an MCP **resource** instead of a tool, so it can be referenced directly without a tool-call decision each time",
      "Require developers to paste the metadata into their initial request manually"
    ],
    "correct": 2,
    "explanation": "Data that's effectively static within a session and exists to be referenced, not acted on, belongs behind an MCP resource rather than a tool \u2014 removing the repeated round-trip cost that embedding in the system prompt (A), caching in `CLAUDE.md` (B), or manual developer input (D) don't actually solve as cleanly.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-036",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A code-complexity MCP tool expects a single file path and returns detailed per-function metrics. On a vague request like \"analyze the whole codebase,\" the agent sometimes passes a directory path by mistake, and the tool responds with an enormous combined JSON blob covering every file in that tree \u2014 overwhelming the context window and burying whatever signal actually mattered. What's the best way to prevent this?",
    "options": [
      "Validate the input inside the tool itself \u2014 reject anything that isn't a single file path, with a clear error explaining the expected input shape",
      "Add a `PostToolUse` hook that trims the response down to top-level metrics after the fact",
      "Expand the tool's description with a warning against passing directories",
      "Remove the tool and require this kind of analysis to be done manually instead"
    ],
    "correct": 0,
    "explanation": "Validating the input shape inside the tool itself, before the expensive (and here, enormous) operation runs, stops the problem at its actual source; a `PostToolUse` hook (B) only trims the damage after the huge response has already consumed context and time, and a description-only warning (C) is easy for a vague request to slip past.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-037",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A productivity agent has 22 tools available at once \u2014 a handful of built-ins plus 19 different MCP integrations for code analysis. Given the narrow task \"find memory leaks in this service,\" evaluation runs show the agent frequently reaching for debugging, profiling, and monitoring tools in various combinations, and only occasionally landing on the one static-analysis tool that's actually best suited to this exact job \u2014 a tool that, used alone, produces better results 80% of the time in manual comparisons. What does this pattern suggest, and what's the fix?",
    "options": [
      "The prompt needs clearer language specifically about memory-leak detection",
      "Too many simultaneously available, similar-looking tools increase selection complexity; narrowing which tools are actually available for this kind of focused task (rather than leaving all 22 live at once) directly reduces the chance of picking a worse combination",
      "The static-analysis tool's description needs to be more generic so it stands out less",
      "The agent needs a larger context window to properly weigh all 22 options"
    ],
    "correct": 1,
    "explanation": "With 22 similar-looking tools live at once, narrowing which ones are actually available for a focused task like this one directly reduces the selection space causing the misfires \u2014 a more direct fix than better prompting (A), a more generic description (C), or hoping a larger context window somehow improves the underlying selection judgment (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-038",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An MCP server exposes `fetch_openapi_spec` (the full spec, on the order of 200KB) and `search_api_endpoints` (a keyword-filtered search over endpoint definitions, typically a few KB). For a query like \"find the endpoint that returns user profiles,\" logs show the agent frequently pulling the entire spec and searching through it manually, when the dedicated search tool would answer the same question directly. Both tools work correctly and neither is erroring. What's the most direct fix?",
    "options": [
      "Remove `fetch_openapi_spec` since the search tool is more efficient",
      "Make `fetch_openapi_spec` return only a summary instead of the full document",
      "Sharpen `search_api_endpoints`'s description to explicitly explain when it's the better choice over fetching the whole spec, with example queries it handles well",
      "Raise the model's temperature to encourage broader tool exploration"
    ],
    "correct": 2,
    "explanation": "Making `search_api_endpoints`'s description explicitly state when it beats fetching the entire spec is the direct fix for this kind of under-selection; removing the full-spec tool (A) breaks legitimate cases that need it, and shrinking its response (B) or raising temperature (D) don't address why the search tool isn't being reached for in the first place.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-039",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A generic `refactor_code` tool handles three unrelated jobs \u2014 renaming symbols globally, restructuring module boundaries, and updating dependency declarations \u2014 and CI/CD runs occasionally apply the wrong one of the three (e.g., a symbol-rename operation gets applied where a module-boundary restructure was actually needed, causing cascading breakage). The team splits it into three purpose-specific tools: `rename_symbols`, `restructure_modules`, `update_dependencies`. To further reduce the odds of the wrong tool being applied to the wrong kind of change specifically in CI/CD, what should also be added?",
    "options": [
      "A `PreToolUse` hook that inspects which of the three new tools is being invoked together with its target path, and blocks the call if that combination doesn't make sense for the kind of change actually being made (e.g., blocking a `rename_symbols` call whose target sits inside a migrations directory)",
      "Set `tool_choice` to force one specific tool for every CI/CD invocation, regardless of task",
      "Increase `max_tokens` so the agent has more room to reason before choosing",
      "Move all refactoring guidance out of `CLAUDE.md` and into a custom `/refactor` skill that must be invoked manually every time"
    ],
    "correct": 0,
    "explanation": "A `PreToolUse` hook that inspects the specific tool being called together with its target path is what can actually block a mismatched combination (like a rename operation aimed at a migrations directory) before it executes \u2014 this is a real, path-aware enforcement mechanism, unlike `.claude/rules/`, which scopes what *guidance text* loads for matching files but has no ability to restrict which *tools* are available based on path. Forcing one tool globally via `tool_choice` (B) would break the other two legitimate use cases, and more reasoning room (C) or a manually-invoked skill (D) don't add any actual enforcement.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-040",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A coordinator splits codebase exploration across several subagents, each with `Read`, `Grep`, and its own specialized MCP tools. When something goes wrong, the three subagents report failures in three different shapes: one returns structured JSON with `error_type`/`is_recoverable` fields, another returns free-text error prose, and a third returns an empty result set marked as a plain success. The coordinator's recovery logic can't reliably decide whether to retry, escalate, or proceed with partial data, because it's working from three incompatible failure formats. What should be fixed first, and why does it span two domains at once?",
    "options": [
      "Add normalization logic inside the coordinator that translates all three formats into one internal shape",
      "Standardize what every subagent's underlying tools report on failure \u2014 a consistent `errorCategory`, `isRetryable`, and actionable context \u2014 which is a tool-design fix that in turn is what makes a reliable, consistent coordinator-level retry/escalation policy possible in the first place",
      "Merge all the subagents into one larger agent so there's only one place errors can come from",
      "Give each subagent its own `PostToolUse` hook that normalizes its own errors before reporting back to the coordinator"
    ],
    "correct": 1,
    "explanation": "Standardizing what tools report on failure is a tool-design fix (D2) that's the actual prerequisite for a reliable coordinator-level retry/escalation policy (D1) \u2014 without a consistent shape to react to, no amount of coordinator-side logic (A) can reliably tell the three formats apart. Merging subagents (C) or pushing normalization down into each subagent separately (D) both sidestep fixing the inconsistency at its source.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-041",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A CI review agent must only ever perform read operations \u2014 `Read`, `Glob`, `Grep` \u2014 and should never be able to modify files, run shell commands, or reach out through any MCP tool, no matter who runs it or how the invocation is configured. The team wants this enforced consistently for every developer who clones the repo, not left to individual discipline. What's the most direct mechanism?",
    "options": [
      "Add a prominent note in `CLAUDE.md` instructing Claude to avoid `Write` and `Bash`",
      "Add a broad-matcher `PreToolUse` hook in `.claude/settings.json` that intercepts every tool call and manually re-implements the same allow logic each time",
      "Configure permissions in `.claude/settings.json` so only `Read`, `Glob`, and `Grep` are allowed and everything else is denied by default",
      "Remove `Write`, `Bash`, and every MCP tool from the project's tool registry entirely"
    ],
    "correct": 2,
    "explanation": "Configuring `.claude/settings.json` permissions so only the three read-only tools are allowed, with everything else denied by default, is a declarative, version-controlled restriction every developer's session inherits automatically \u2014 more direct and more maintainable than reimplementing the same allow logic inside a hook (B), a prompt note that depends on the model following it (A), or physically stripping tools from the whole project's registry (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-042",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team runs five review agents in parallel across a large monorepo, each covering a different subsystem, then merges all five sets of findings into one consolidated PR comment. Which specific design choice here is what actually prevents the \"a session reviewing its own generated code\" bias?",
    "options": [
      "Running the analyses in parallel, since parallel work is inherently more thorough than sequential work",
      "Each of the five review agents is its own fully independent Claude Code invocation, carrying no context from whatever session originally generated the code under review",
      "Consolidating the five sets of findings afterward, which lets duplicate issues get filtered out",
      "Using JSON output format, which makes findings more reliable regardless of how the sessions themselves are structured"
    ],
    "correct": 1,
    "explanation": "What actually removes the generation-reasoning bias is that each of the five review agents is a fully independent invocation carrying no context from whatever session wrote the code in the first place \u2014 parallelism alone (A) doesn't provide that independence, and neither does deduplicating findings afterward (C) or the choice of output format (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-043",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A review finding schema defines `{\"violation_type\": ..., \"description\": ..., \"remediation\": ...}`. Every finding validates against the schema successfully, but in practice, proposed fixes routinely end up written into `description` while `remediation` gets a vague one-liner like \"add validation\" \u2014 exactly backwards from what each field is meant to hold. The model clearly understands the JSON structure itself. What's the actual problem here?",
    "options": [
      "The fields should be marked required when they're currently optional; tightening that constraint will fix the mix-up",
      "The model understands the shape of the schema but not the intended purpose of each individual field; adding 2\u20133 few-shot examples showing correct field assignment per violation type teaches that distinction directly",
      "An `evidence_required` list should be added to force more precision automatically",
      "Force `tool_choice` onto the findings tool to remove any remaining ambiguity"
    ],
    "correct": 1,
    "explanation": "The model already produces schema-valid JSON, so the problem isn't structural \u2014 it's that the model hasn't internalized which content belongs in which field. A few concrete field-assignment examples per violation type teach that distinction directly, which tightening required-ness (A), adding an unrelated list field (C), or forcing tool choice (D) don't address.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-044",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Over three sprints, the \"possible inconsistency in error-handling patterns\" finding category has a 35% developer dismissal rate, while actual bug findings sit under 5%. The prompt already says \"only report high-confidence issues.\" What's the most effective next step to protect developer trust in the review overall?",
    "options": [
      "Add even stronger wording: \"be even more conservative about pattern consistency\"",
      "Temporarily disable the specific \"inconsistency\" category, keep the well-performing categories (bugs, crashes, security) active, and only bring it back once its criteria have been tightened and re-measured",
      "Lower the model's temperature to make output more deterministic",
      "Require developers to write a detailed justification every time they dismiss a comment"
    ],
    "correct": 1,
    "explanation": "Temporarily pulling the one category driving nearly all the dismissals \u2014 while leaving the well-performing categories active \u2014 protects trust in the parts of the review that are actually working, and buys room to fix that category's criteria properly. Stronger wording (A) and a lower temperature (C) haven't moved this kind of false-positive rate before and aren't likely to now; requiring justification for every dismissal (D) adds friction without addressing the underlying noise.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-045",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Your team wants materially different review standards for code PRs (correctness, performance, security) versus documentation-only PRs (accuracy, link validity, tone), but both currently load the exact same root `CLAUDE.md`, so doc-only PRs end up getting flagged with irrelevant guidance about concurrency and database migrations. Where should the code-specific guidance move so it only loads when actual code files are involved?",
    "options": [
      "A `.claude/rules/code-standards.md` file with `paths` frontmatter scoped to source file patterns (e.g. `src/**/*.{js,ts}`), so it only loads when those files are actually being touched",
      "Two separate root files, `code-review-CLAUDE.md` and `docs-review-CLAUDE.md`, with CI deciding which one to load based on PR labels",
      "Move the code standards into an MCP tool the model can optionally call if it thinks it's relevant",
      "Leave everything in the root `CLAUDE.md` and trust the model to disregard whatever doesn't apply"
    ],
    "correct": 0,
    "explanation": "A path-scoped rules file means the code-specific guidance only loads when Claude is actually working with matching source files, leaving doc-only PRs unaffected \u2014 without duplicating content across two full root files that both still need to be kept in sync (B), moving guidance somewhere the model has to decide to consult (C), or hoping the model selectively ignores irrelevant content it's always being fed (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-046",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A review job's MCP tool config in `.mcp.json` includes `\"auth_token\": \"${COMPLIANCE_API_TOKEN}\"`. The CI runner's job definition sets `COMPLIANCE_API_TOKEN` as an environment variable for the job overall, but the Claude Code invocation inside that job still fails to authenticate against the compliance tool. What's the most likely cause?",
    "options": [
      "`.mcp.json` doesn't actually support `${VAR}`-style expansion at all; the token needs to be hardcoded instead",
      "The variable is set at the CI job level, but the specific process Claude Code runs in doesn't automatically inherit it unless it's actually exported into that process's own environment before Claude Code starts",
      "The MCP server's URL is misconfigured",
      "Claude Code's permission system is independently blocking this specific MCP tool"
    ],
    "correct": 1,
    "explanation": "Setting an environment variable at the CI job level doesn't guarantee every process spawned within that job automatically inherits it \u2014 if Claude Code is invoked from a context that never actually received that variable in its own process environment, expansion will fail even though the syntax and the job-level setting are both correct. This is a process/environment-scoping issue, not a syntax limitation (A), a server misconfiguration (C), or a permissions block (D).",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-047",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A PR accumulates new commits as a developer responds to earlier feedback. Each commit triggers a fresh review run, but because upstream lines were deleted, several newly-generated findings reference line numbers that belonged to the *previous* commit's version of the file \u2014 so a comment reading \"line 215 has a concurrency bug\" now points at code that isn't even related to that issue anymore. How should the pipeline handle this across commits?",
    "options": [
      "Stop re-running review after the first commit and only ever review the final version once",
      "After each run, export findings (with their file/line references) to a state file; on the next run, before posting anything new, drop any previously-tracked finding whose referenced line no longer exists in the current diff, and only post genuinely new issues",
      "Regenerate a full-context diff and manually recompute every old line reference by hand before each new review",
      "Post every finding as-is, with a blanket disclaimer that line numbers may have shifted since it was originally flagged"
    ],
    "correct": 1,
    "explanation": "Persisting prior findings and then explicitly dropping any that no longer correspond to a real location in the current diff \u2014 before deciding what's actually new \u2014 keeps the review current with the code as it stands, without silently mislabeling old, no-longer-relevant lines as bugs in the new code. Reviewing only the final commit (A) throws away the benefit of fast per-commit feedback; manual line renumbering (C) doesn't scale; a blanket disclaimer (D) doesn't fix the underlying misattribution.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-048",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A review schema includes a `performance_impact_ms` integer field. A finding claims \"this change saves 15ms,\" and the JSON is perfectly valid with every required field present \u2014 but the PR in question contains no benchmark, profiler output, or any other measurement backing that number up; it's pure speculation dressed as data. The schema itself allows any integer. Where should a check for this actually go?",
    "options": [
      "Add stricter JSON-schema-level constraints that ban integers outside some plausible range",
      "Add a post-generation validation step that checks whether a performance claim is actually backed by concrete evidence present in the PR (a benchmark, a profiler trace, a measurement comment) before it's allowed to stand",
      "Remove the `performance_impact_ms` field from the schema entirely to eliminate the possibility of speculation",
      "Lower the model's temperature to reduce how speculative its claims are"
    ],
    "correct": 1,
    "explanation": "Schema validity only confirms the JSON is well-formed and the value is an integer \u2014 it says nothing about whether that number is actually grounded in anything. A deterministic check that looks for real supporting evidence in the PR before accepting a quantitative claim is what catches this, which tighter integer ranges (A), removing the field (C), or a lower temperature (D) don't reliably provide.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-050",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Review standards genuinely differ by PR type \u2014 \"breaking-changes\" PRs need strict API-compatibility analysis, \"performance-optimization\" PRs need benchmarking evidence, \"documentation\" PRs need no code review at all \u2014 and a single do-everything prompt has become unmaintainable. The team wants to load the right guidance for the right PR type without hand-rolling a large conditional block inside one prompt. How should this actually be structured?",
    "options": [
      "Use shell environment variables in the CI job to swap in a different `CLAUDE.md` file depending on PR type before invoking Claude Code",
      "Add a `labels` field to `.claude/rules/` frontmatter so Claude Code automatically detects the PR's GitHub labels and loads the matching rule file on its own",
      "Create separate skills for each review type (e.g., `/review-breaking-changes`, `/review-performance`, `/review-docs`), each with its type-specific guidance built in, and have the CI job read the PR's actual labels (via the GitHub API) and invoke whichever skill matches",
      "Keep everything in one prompt and add `if`/`then` conditional logic to the review-invocation script itself"
    ],
    "correct": 2,
    "explanation": "Separate skills, each carrying the guidance specific to one review type, with the CI job itself reading the PR's real labels (via the GitHub API, which is ordinary CI scripting, not a Claude-Code-specific feature) and invoking the matching skill, uses only real, documented building blocks. There's no `labels` field in `.claude/rules/` frontmatter \u2014 path-scoped rules only match against file paths Claude actually reads locally, not external metadata like GitHub labels, so option B describes a capability that doesn't exist. Swapping `CLAUDE.md` files via environment variables (A) is a real but clunkier alternative to the same end, and keeping everything in one prompt with inline conditionals (D) is exactly the unmaintainable pattern the team is trying to get away from.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-051",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "An expense-extraction schema requires an `approval_date` field on every document. Testing shows the model fabricates a plausible-looking date on cost estimates that explicitly say \"to be determined upon approval\" \u2014 documents that genuinely have no approval date yet \u2014 while purchase orders, which do contain a real approval date, extract that field correctly. What change best addresses this without losing the field where it's genuinely available?",
    "options": [
      "Make the field nullable across the board, for every document type",
      "Classify the document's subtype first (estimate vs. purchase order), and only require `approval_date` once that classification confirms it's the kind of document that should actually have one",
      "Add stricter validation requiring the date to match a known approver's signature date",
      "Lower the model's temperature to reduce fabrication"
    ],
    "correct": 1,
    "explanation": "Since whether an approval date should even be expected depends entirely on the document actually being a purchase order rather than an estimate, classifying that first and only then conditionally requiring the field prevents the mismatch that's causing fabrication on documents that were never going to have a real date in the first place.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-052",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A vendor tax-ID field keeps returning plausible, correctly-formatted values that pass a regex check but fail when cross-referenced against the company's actual vendor registry \u2014 spot checks show some extracted IDs are off by a single digit from the real registered value. What change would most improve accuracy here?",
    "options": [
      "Make the field optional and validate it downstream instead of at extraction time",
      "Tighten the regex further to reject more implausible-looking formats",
      "Cross-check extracted tax IDs against the vendor registry before accepting them, or require a source-location/evidence field so the model has to point to exactly where in the document it read the ID",
      "Raise the model's temperature to encourage more varied output"
    ],
    "correct": 2,
    "explanation": "A plausible, correctly-formatted value can still be wrong, which is exactly what a registry cross-check or a source-location/evidence requirement catches and a regex never can \u2014 regex only verifies shape, not whether the specific digits are actually correct.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-054",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A retry loop currently resends a failed extraction with only \"please fix the invalid fields and try again.\" The actual validation failure is specific: `\"line_items structure invalid: expected an array of {quantity: number, price: number} objects; received a mix of strings and nested objects.\"` Repeated retries keep failing on the same document. What change would most improve the retry success rate?",
    "options": [
      "Add 3\u20135 few-shot examples showing correctly structured `line_items`",
      "Include the original document, the failed extraction output, and the specific validation error message itself in the retry prompt",
      "Lower the model's temperature so retries are more conservative",
      "Increase `max_tokens` to give the model more room to reconsider"
    ],
    "correct": 1,
    "explanation": "A retry needs the original document to re-read, the failed output to see what actually went wrong, and the specific validation error to understand exactly why \u2014 a vague \"fix it\" retry (implicitly what's happening now) gives the model no new information to correct against, which is why it keeps failing the same way.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-055",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A contract-extraction pipeline requires a `dispute_resolution_clause` field. Testing shows 11% of extractions return null for it even though human review confirms the clause is genuinely present \u2014 consistently on pages 6\u20138 of longer, multi-page contracts. Logs show the model's actual output starts trailing off in detail around page 4, well before those later pages get proper attention, and `max_tokens` is already set high enough that raising it further would meaningfully increase cost. What's the best way to reliably capture required fields that live late in long documents?",
    "options": [
      "Make the field optional instead of required",
      "Keep raising `max_tokens` regardless of the cost impact",
      "Run multi-page documents through extraction in two separate passes \u2014 one focused on early-page fields, one focused on fields expected later in the document",
      "Ask the upstream system to strip contracts down to only their early pages before extraction"
    ],
    "correct": 2,
    "explanation": "When a required field consistently lives late in long documents and detail is visibly trailing off well before that point, splitting extraction into an early-pages pass and a late-pages pass ensures the later pages get real attention, which is more cost-effective than indefinitely raising `max_tokens` (B) and doesn't sacrifice the field the way making it optional (A) or truncating the source document (D) would.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-056",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "Two extraction tools \u2014 one for software license agreements, one for software purchase orders \u2014 both have clear, detailed descriptions with examples and non-examples. Documents that are genuinely both at once (e.g., \"we are purchasing 50 seats of Software X under the following license terms...\") still get routed to the wrong single tool often enough to cause schema mismatches, and neither more prompt clarification nor more few-shot examples has closed the gap. What architectural change would most reliably handle documents that are genuinely, structurally ambiguous like this?",
    "options": [
      "Add an explicit document-type classification step first \u2014 licensing, purchase, or hybrid \u2014 and route based on that classification's result rather than asking either extraction tool to also do double duty as a classifier",
      "Switch from `tool_choice: \"any\"` to `\"auto\"` so the model can decline to extract at all if it's unsure",
      "Force `tool_choice` to always select one specific tool (say, the purchase-order tool) regardless of content",
      "Merge both tools into a single, multi-purpose extraction tool"
    ],
    "correct": 0,
    "explanation": "When a document is genuinely, structurally both things at once, no amount of sharpening either extraction tool's own description will fully resolve the ambiguity, because the ambiguity is a property of the document, not the tool definitions; an explicit classification step (including a genuine \"hybrid\" outcome) that then routes accordingly is what actually handles that case, rather than asking one of the two extraction tools to also silently double as a classifier.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-058",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team processes 8,000 invoices daily. Processing currently kicks off at 2 PM and results must be loaded into the accounting system by 5 PM the same day \u2014 a roughly 3-hour window. A cost-reduction proposal suggests moving this workload to the Message Batches API to capture a real cost discount. Is this workflow, as currently timed, a good fit?",
    "options": [
      "Yes \u2014 process the full daily batch via the Batches API; the window will comfortably cover it",
      "Partially \u2014 only use the Batches API for the portion submitted early enough in the day that a worst-case delay still lands before 5 PM, and keep the rest on synchronous calls",
      "No \u2014 the Batches API has no latency SLA and can, in the worst case, take up to 24 hours; that's fundamentally incompatible with a same-day, hard-deadline workflow like this one, so it should stay on synchronous calls entirely",
      "Yes, but only if every individual invoice document stays under a certain file size"
    ],
    "correct": 2,
    "explanation": "With no latency SLA and a documented worst case of up to 24 hours, the Batches API is fundamentally incompatible with a hard same-day deadline like this one \u2014 treating \"up to 24 hours\" as something that will comfortably fit inside a 3-hour window (A) misunderstands what \"no SLA\" actually means, and a partial migration for only the earliest-submitted invoices (B) still leaves the same unbounded risk for whatever doesn't make that early cutoff.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-059",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A schema extracts procurement data from both supplier quotes and purchase orders, and adds a new `bulk_discount_percentage` field meant to apply to both \u2014 but many real quotes and purchase orders simply don't have a bulk discount at all. Because the field is marked required, the model fabricates a plausible discount percentage whenever the source document doesn't actually mention one. What change most directly fixes this?",
    "options": [
      "Make the field optional/nullable, so its genuine absence in a source document no longer forces the model to invent a value",
      "Change the field to a free-text string that can describe a discount in prose, e.g. \"10% off for bulk orders\"",
      "Build entirely separate schemas for quotes and purchase orders, each handling discounts independently",
      "Remove the field from the schema and compute any discount downstream from other extracted values instead"
    ],
    "correct": 0,
    "explanation": "When a field is genuinely and legitimately absent from many real source documents, making it nullable is what stops the model from having to invent a value just to satisfy a required-field constraint \u2014 separate schemas per document type (C) don't address the actual mismatch (discount data that's optional within a single document type, not just across types), and a free-text field (B) or removing it downstream (D) both give up structure the pipeline still needs.",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-exam6-060",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Scenario 1: Customer Support Resolution Agent",
    "question": "A team processes 4,000 invoices weekly and already categorizes extraction errors by type \u2014 \"date format inconsistency\" (6%), \"currency mismatch\" (4%), \"line-item count off by one\" (3%) \u2014 but has no way to tell whether, say, date errors cluster around handwritten invoices, particular vendors, particular countries, or scanned-vs-native documents. That makes it hard to know where to actually invest effort on the prompt or validation rules. What should be added to the structured output to make that kind of root-cause analysis possible?",
    "options": [
      "A random UUID attached to each extraction, purely for tracing a record back to its source",
      "A `source_metadata` field recording document characteristics alongside each extraction \u2014 format (handwritten/scanned/digital), an OCR-confidence signal where relevant, vendor name, and vendor country \u2014 so errors can actually be grouped and analyzed by the characteristics of the input that produced them",
      "A free-text note field where the model can explain its own extraction in its own words",
      "A counter tracking how many retries a given extraction needed before it succeeded"
    ],
    "correct": 1,
    "explanation": "Logging the actual characteristics of the document alongside each extraction \u2014 format, OCR confidence where relevant, vendor, country \u2014 is what turns three flat error-rate percentages into something that can actually be correlated with a root cause, which a bare trace ID (A), a free-text note (C), or a retry counter (D) don't provide on their own.  ---",
    "referenceTitle": "Claude Certified Architect Blueprint",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q002",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "The API returns stop_reason: \"tool_use\". What is the correct next step in the agentic loop?",
    "options": [
      "Return the response text to the user and finish",
      "Run the tool Claude asked for, feed the result back as a new message, and continue the loop",
      "Resend the identical request once as a retry",
      "Look for the word \"done\" in the assistant text before deciding"
    ],
    "correct": 1,
    "explanation": "tool_use means Claude wants a tool: run it, return the result, keep looping until end_turn.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q003",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which is an acceptable use of a maximum-iteration cap in an agentic loop?",
    "options": [
      "As the primary signal that the task is complete",
      "As a runaway safety net, with termination still decided by stop_reason",
      "As a replacement for stop_reason, which is sometimes unreliable",
      "To limit how many tools Claude may call per turn"
    ],
    "correct": 1,
    "explanation": "A cap is only a safety net against runaway loops and cost. Termination must come from stop_reason.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q004",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which of these is NOT one of the three named agentic-loop anti-patterns?",
    "options": [
      "Parsing natural language to decide the loop is over",
      "Using a max-iteration cap as the primary stopping mechanism",
      "Inspecting assistant text content as a completion signal",
      "Feeding tool results back to Claude as new messages"
    ],
    "correct": 3,
    "explanation": "Feeding tool results back is the correct behaviour. The other three are the named anti-patterns.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q005",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A code-generation agent occasionally \"finishes early\" on long tasks. Logs show the loop exiting while stop_reason was still tool_use. What should you inspect first?",
    "options": [
      "Whether the termination condition mixes in checks on text content or iteration count",
      "Whether the Claude model version is out of date",
      "Whether tool return values are too large",
      "Whether the system prompt is too long"
    ],
    "correct": 0,
    "explanation": "stop_reason said continue but the loop exited, so the termination condition contains a non-stop_reason test \u2014 one of the anti-patterns.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q006",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What does stop_reason: \"end_turn\" mean?",
    "options": [
      "Claude wants to call a tool",
      "Claude has finished this turn; the loop should end and the result go to the user",
      "Claude hit the token limit",
      "An error occurred and a retry is needed"
    ],
    "correct": 1,
    "explanation": "end_turn means Claude is done \u2014 the task is complete and you reply to the user.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q007",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In a multi-agent research system, an architect wants two subagents to exchange intermediate findings directly to lighten the coordinator's load. What is wrong with that?",
    "options": [
      "It breaks hub-and-spoke: subagents must not communicate directly \u2014 communication, error handling and routing all belong to the coordinator",
      "It will drive token costs up",
      "The Agent SDK does not support that message format",
      "It will slow the subagents down"
    ],
    "correct": 0,
    "explanation": "Hub-and-spoke: the coordinator owns all subagent communication, error handling and information routing; subagents never talk directly.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q008",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A coordinator dispatched four subagents on the same topic and three reports came back largely duplicated. What is missing from the coordinator design?",
    "options": [
      "It failed to partition the research space and give each subagent a non-overlapping scope (by subtopic or source type)",
      "The subagents were not given enough tools",
      "Four subagents is too many; it should use one",
      "No maximum iteration count was set"
    ],
    "correct": 0,
    "explanation": "The coordinator\\",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q009",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A coordinator always runs \"search agent \u2192 document agent \u2192 verification agent \u2192 synthesis agent\" in fixed order, even for simple queries \u2014 slow and expensive. What should change?",
    "options": [
      "Let the coordinator select subagents dynamically instead of always running the full pipeline",
      "Merge all four agents into one large agent",
      "Shorten each agent\\",
      ","
    ],
    "correct": 0,
    "explanation": "Coordinator rule two: choose subagents dynamically rather than running a fixed pipeline.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q010",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "After synthesising a report, the coordinator notices one subtopic is clearly under-evidenced. What does the official guidance recommend?",
    "options": [
      "Publish the report and note the weak evidence",
      "Enter an iterative refinement loop: evaluate the synthesis, locate gaps, re-dispatch targeted subagents, repeat until coverage is sufficient",
      "Ask the user to rephrase the question",
      "Re-run every subagent from scratch"
    ],
    "correct": 1,
    "explanation": "Coordinator rule three: evaluate \u2192 find gaps \u2192 re-delegate with targeted queries \u2192 repeat until coverage is sufficient.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q012",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In the Agent SDK, which tool must appear in a coordinator's allowedTools for it to spawn subagents?",
    "options": [
      "Bash",
      "Task",
      "Read",
      "Grep"
    ],
    "correct": 1,
    "explanation": "The Task tool spawns subagents, so \"Task\" must be present in allowedTools.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q013",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A coordinator needs to investigate five independent subtopics in parallel. What is correct?",
    "options": [
      "Emit five Task calls in a single response",
      "Send one Task call per turn across five turns",
      "Write \"please investigate these five topics in parallel\" inside one Task prompt",
      "Use fork_session five times"
    ],
    "correct": 0,
    "explanation": "Parallel spawning means multiple Task calls in one coordinator response \u2014 not spread across turns.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q014",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Search-agent and document-agent results must reach a synthesis agent. What is the best way to pass context?",
    "options": [
      "Send a one-line summary and let the synthesis agent look things up again",
      "Put the prior agents\\",
      ",",
      ","
    ],
    "correct": 1,
    "explanation": "Best practice: complete findings in the prompt, with content and metadata separated to preserve attribution.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q015",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A coordinator prompt spells out \"first search X, then read document Y, then compare Z\". When an unexpected data shape appears, every subagent stalls. How should the prompt change?",
    "options": [
      "Add more detail, enumerating every branch",
      "State research goals and quality criteria rather than step-by-step procedure, so subagents can adapt",
      "Reduce the number of subagents",
      "Move the prompt into AgentDefinition\\"
    ],
    "correct": 1,
    "explanation": "Coordinator prompts should specify goals and quality criteria, not procedure \u2014 that is what enables adaptation.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q016",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A team wants to compare a \"migrate to Jest\" path against a \"migrate to Vitest\" path from the same codebase analysis, without the two explorations contaminating each other. What fits?",
    "options": [
      "--resume the same session and alternate between them",
      "fork_session, creating two independent branches from the shared baseline",
      "Two entirely separate new sessions, each starting from zero",
      "Put both options in one prompt and let Claude analyse them together"
    ],
    "correct": 1,
    "explanation": "fork_session exists precisely to branch independent explorations from a shared analysis baseline.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q017",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What does AgentDefinition configure?",
    "options": [
      "Each subagent type\\",
      ",",
      ",",
      ","
    ],
    "correct": 0,
    "explanation": "AgentDefinition is the subagent configuration: description, system prompt, tool restrictions.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q018",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Regarding subagent memory, which statement is correct?",
    "options": [
      "Subagents share memory across invocations",
      "Subagents neither share memory across invocations nor inherit parent context",
      "Subagents inherit parent context but do not share memory with each other",
      "Subagent memory is synchronised automatically via MCP resources"
    ],
    "correct": 1,
    "explanation": "Both are negative: no inherited parent context, no shared memory across invocations. Hence context must be passed explicitly.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q019",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A support agent occasionally issues refunds without verifying the customer's identity. Which option is the most reliable fix?",
    "options": [
      "Write \"identity must be verified first\" in bold in the system prompt",
      "Add a programmatic prerequisite: process_refund is blocked until get_customer returns a verified customer ID",
      "Provide three few-shot examples demonstrating correct verification",
      "Add \"please verify identity before calling\" to the tool description"
    ],
    "correct": 1,
    "explanation": "Money plus identity verification demands determinism, so it needs a programmatic hard limit. A prompt is advice; code is law.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q020",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An agent's reply formatting is occasionally inconsistent (sometimes with headings, sometimes without). No money or safety is involved. Best fix?",
    "options": [
      "Add a PreToolUse hook to intercept",
      "Tune the prompt / add few-shot examples",
      "Add a programmatic prerequisite",
      "Escalate to a human"
    ],
    "correct": 1,
    "explanation": "Formatting inconsistency is the \"probabilistic is fine\" case \u2014 prompt tuning is enough; no hard limit needed.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q021",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "One customer message raises three issues at once: refund status, exchange policy, and a login failure. Best handling?",
    "options": [
      "Answer the first only and let the customer ask again",
      "Split into separate items, investigate in parallel over shared context, then synthesise one unified reply",
      "Escalate immediately because there are too many issues",
      "Handle them serially, replying after each one"
    ],
    "correct": 1,
    "explanation": "Multi-issue requests: decompose, investigate in parallel over shared context, synthesise a single unified reply.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q022",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "The agent decides to escalate a case to a human. Best handoff?",
    "options": [
      "Forward the raw conversation transcript",
      "Provide a structured summary: customer ID, root cause, refund amount, recommended action",
      "Send \"customer needs help\" plus the ticket number",
      "Ask the customer to re-explain to the human"
    ],
    "correct": 1,
    "explanation": "A structured handoff summary means the human does not have to read the whole transcript.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q023",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which consequence REQUIRES a programmatic hard limit rather than prompt tuning?",
    "options": [
      "The tone is not friendly enough",
      "Summaries are sometimes too long, sometimes too short",
      "A refund was paid into the wrong customer\\",
      ","
    ],
    "correct": 2,
    "explanation": "Wrong refund = money plus wrong identity \u2192 deterministic requirement \u2192 programmatic hard limit. The rest are probabilistic style issues.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q024",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What does \"a prompt is advice, code is law\" mean in practice for architecture decisions?",
    "options": [
      "Prompts are never reliable; put all logic in code",
      "When failure is tolerable (formatting, style) use a prompt; when a rule must hold 100% (money, safety, identity) use programmatic enforcement",
      "Programmatic enforcement is cheaper, so prefer it",
      "Prompts work for conversation but not workflows"
    ],
    "correct": 1,
    "explanation": "The test is severity of consequence: probabilistic is fine \u2192 prompt; determinism required \u2192 programmatic.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q025",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Company policy: any refund over $500 must go to a human. Which mechanism is most reliable?",
    "options": [
      "State the limit in the tool description",
      "A PreToolUse hook that intercepts before execution and blocks over-limit refunds, routing to a human",
      "A PostToolUse hook that checks the amount after the refund",
      "Few-shot examples showing escalation when over the limit"
    ],
    "correct": 1,
    "explanation": "PreToolUse fires before the tool runs and exists for permission checks and blocking risky actions. Refund > $500 \u2192 block \u2192 human is the canonical example.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q026",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A tool returns Unix timestamps and you want them normalised to human-readable ISO 8601 before Claude sees them. What do you use?",
    "options": [
      "A PreToolUse hook",
      "A PostToolUse hook",
      "A system-prompt instruction telling Claude to convert them",
      "A different tool that returns ISO format"
    ],
    "correct": 1,
    "explanation": "PostToolUse fires after execution and exists for result transformation and format normalisation \u2014 this is the canonical example.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q027",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What is the core difference between a hook and a tool?",
    "options": [
      "Hooks are faster, tools are slower",
      "Hooks fire automatically and deterministically (Claude never sees them); tools are chosen by Claude and are probabilistic (it can pick wrong or forget)",
      "Hooks are read-only, tools can write",
      "Hooks are project-scoped, tools are user-scoped"
    ],
    "correct": 1,
    "explanation": "Hook = automatic + certain. Tool = chosen + probabilistic. Money and safety always require a hook.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q028",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "When should you use a hook rather than a prompt?",
    "options": [
      "When you want output in a particular language",
      "When a business rule must hold 100% of the time",
      "When you want replies to be more concise",
      "When you want Claude to call a certain tool more often"
    ],
    "correct": 1,
    "explanation": "A rule requiring 100% compliance needs a deterministic hook; style and formatting preferences are fine in a prompt.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q029",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In review someone proposes: \"make permission checking a check_permission tool and have Claude call it before sensitive operations.\" What is the flaw?",
    "options": [
      "Tool calls add latency",
      "A tool is chosen by Claude and therefore probabilistic \u2014 it may forget or misjudge, so it cannot guarantee 100% compliance; permission checks belong in a PreToolUse hook",
      "check_permission overlaps with other tool names",
      "It consumes an allowedTools slot"
    ],
    "correct": 1,
    "explanation": "Security and permissions must hold 100% of the time, so they need an automatic deterministic hook, not a tool Claude elects to call.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q030",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A hook fires and blocks a tool call. From Claude's point of view, what happens?",
    "options": [
      "Claude knows in advance and routes around it",
      "The hook is deterministic and system-executed; Claude cannot influence whether it fires",
      "Claude can ask to skip the hook in its prompt",
      "The hook is only a suggestion to Claude"
    ],
    "correct": 1,
    "explanation": "A hook is code that runs automatically on an event \u2014 deterministic and entirely outside Claude\\",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q031",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A 120-file PR was reviewed in one pass; Claude missed many local bugs and its conclusions contradicted each other. Best fix?",
    "options": [
      "Switch to a larger-context model and run one pass again",
      "Split into a per-file local pass (local bugs) and a cross-file integration pass (data-flow issues)",
      "Ask the developer to break it into smaller PRs",
      "Review only the 20 files with the most changed lines"
    ],
    "correct": 1,
    "explanation": "Large PR in one pass causes attention dilution and contradictions; multi-pass review splits local from integration concerns.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q032",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "The task is \"analyse each file statically, then integrate into a cross-file report\" \u2014 fixed and predictable. Which decomposition pattern?",
    "options": [
      "Dynamic decomposition",
      "Prompt chaining",
      "fork_session",
      "Evaluator\u2013optimizer"
    ],
    "correct": 1,
    "explanation": "Prompt chaining is a fixed ordered pipeline, ideal for predictable multi-step reviews (per-file analysis \u2192 cross-file integration).",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q033",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "The task is \"investigate potential performance problems in this unfamiliar codebase\" \u2014 you cannot know in advance what you will find. Which pattern?",
    "options": [
      "Prompt chaining",
      "Dynamic decomposition: map the structure, find hot spots, generate subtasks on the fly",
      "Batch API submission",
      "A PreToolUse hook"
    ],
    "correct": 1,
    "explanation": "Dynamic decomposition suits open-ended investigation: subtasks emerge from intermediate findings.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q034",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In multi-pass review, what is the cross-file integration pass responsible for finding?",
    "options": [
      "Null-pointer risk inside a single function",
      "Cross-file data-flow problems (e.g. a module changed its return shape and callers were not updated)",
      "Inconsistent code style",
      "Missing comments"
    ],
    "correct": 1,
    "explanation": "The local pass finds local bugs; the integration pass finds cross-file data-flow problems. That is the division of labour.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q035",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Yesterday you were halfway through debugging with Claude Code. The code has not changed and your earlier analysis still holds. What do you do?",
    "options": [
      "Start a new session and paste in a summary",
      "Use --resume <session-name> to resume the named session",
      "fork_session",
      "Redo the analysis from scratch"
    ],
    "correct": 1,
    "explanation": "When prior context is mostly still valid, --resume is the right mechanism for continuing across work sessions.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q036",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Last week's session read 30 files and built up understanding, but a colleague has since refactored most of them. What is most reliable?",
    "options": [
      "--resume the original session; Claude will notice the files changed",
      "Start a new session with an injected structured summary, because the old tool results are stale",
      "fork_session from the old session",
      "Keep the old session and just mention \"the code changed\" in the prompt"
    ],
    "correct": 1,
    "explanation": "When prior tool results are stale, a new session plus a structured summary beats resuming \u2014 resume drags a pile of outdated file contents back in.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q037",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "After --resume, you find three files have changed. Best move?",
    "options": [
      "Have the agent re-analyse the entire codebase",
      "Tell the agent exactly which three files changed and request a targeted re-analysis",
      "Ignore the changes and carry on",
      "Abandon the session and start over"
    ],
    "correct": 1,
    "explanation": "Name the specific changed files and do a targeted re-analysis rather than starting from scratch.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q038",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What is fork_session for?",
    "options": [
      "Resuming an interrupted investigation across work sessions",
      "Creating an independent exploration branch from a shared analysis baseline, e.g. to compare two approaches",
      "Running reviews in parallel in CI",
      "Clearing context and starting over"
    ],
    "correct": 1,
    "explanation": "fork_session branches independent explorations from a shared baseline (comparing two refactoring or testing strategies).",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q039",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An agent frequently confuses analyze_content and analyze_document. Most direct effective fix?",
    "options": [
      "Add three few-shot examples showing how to choose",
      "Rename to remove the overlap, e.g. analyze_content \u2192 extract_web_results",
      "Explain the difference in the system prompt",
      "Merge the two tools into one"
    ],
    "correct": 1,
    "explanation": "Overlapping names confuse the model \u2014 rename to remove the overlap. That comes before few-shot (rule things out first).",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q040",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which four things should a good tool description contain?",
    "options": [
      "Author, version, last updated, licence",
      "What it does, what input format it takes, when to use it (example queries), when not to use it (its boundary against similar tools)",
      "Return type, error codes, timeout, retry policy",
      "Cost per call, average latency, concurrency limit, rate limits"
    ],
    "correct": 1,
    "explanation": "Tool descriptions drive LLM tool selection. The four elements: what it does / input format / when to use / when not to use.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q041",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Analysis shows that when a user query contains the word \"report\", the agent picks the wrong tool 78% of the time; otherwise it is fine. The tool descriptions have been reviewed and are clear and non-overlapping. What next?",
    "options": [
      "Add few-shot examples for report scenarios",
      "Check the system prompt for unintentional keyword-based routing instructions",
      "Rename the tools",
      "Reduce the number of tools"
    ],
    "correct": 1,
    "explanation": "Descriptions are fine but selection is systematically biased by a keyword \u2014 inspect the system prompt for accidental routing instructions.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q042",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "One analyze_document tool extracts data points, writes summaries and verifies claims, and the agent uses it inconsistently. Best fix?",
    "options": [
      "Write a longer, more detailed description",
      "Split it into extract_data_points + summarize_content + verify_claim_against_source",
      "Set tool_choice: \"any\" to force a tool call",
      "Add a PostToolUse hook to normalise the return format"
    ],
    "correct": 1,
    "explanation": "An over-general tool doing too much should be split into single-responsibility tools.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q043",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "log_workout accepts many parameter combinations and telemetry shows 23% of calls use invalid combinations (e.g. sets and reps sent for cardio). Best fix?",
    "options": [
      "List every legal combination in the description",
      "Split into log_cardio_workout + log_strength_workout, designing the invalid states away",
      "Add validation and return an error so Claude retries",
      "Add few-shot examples showing correct parameters"
    ],
    "correct": 1,
    "explanation": "Eliminate invalid states: a tool with many mostly-invalid combinations should be split.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q044",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An agent calls check_availability then book_appointment; occasionally the slot is taken in between and the booking fails. Best fix?",
    "options": [
      "Auto-retry on failure",
      "Merge into one atomic operation, find_and_book_appointment",
      "Add a lock and shorten the interval between calls",
      "Add a PostToolUse hook to detect the failure"
    ],
    "correct": 1,
    "explanation": "A race condition caused by a window between two steps is fixed by making the operation atomic.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q045",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An agent pulls data from four APIs with different field names and shapes, and often mishandles them. Best approach?",
    "options": [
      "Describe all four shapes in the prompt and let Claude adapt",
      "Normalise inside the tool and return one uniform schema",
      "Provide a few-shot example for each shape",
      "Add a PreToolUse hook to validate arguments"
    ],
    "correct": 1,
    "explanation": "Uniform return schema: convert formats inside the tool and return one schema.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q046",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A research agent has a fetch_url tool that can reach any URL, and audits show it occasionally pulls unrelated social-media pages. What satisfies least privilege?",
    "options": [
      "List banned domains in the prompt",
      "Replace it with a narrower tool such as load_document, which only loads document formats",
      "Add a PostToolUse hook to filter results",
      "Word the fetch_url description more strictly"
    ],
    "correct": 1,
    "explanation": "Least privilege: an over-broad tool invites misuse \u2014 replace it with a narrower one (fetch_url \u2192 load_document).",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q048",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An MCP tool returns \"Operation failed\" for every kind of failure, so the agent keeps retrying business-rule violations. Best fix?",
    "options": [
      "Cap the agent at two retries",
      "Return structured errors: isError, errorCategory, isRetryable, and a human-readable description",
      "Make the error message a bit more detailed",
      "Add a PostToolUse hook to translate errors"
    ],
    "correct": 1,
    "explanation": "Structured MCP errors have four parts: isError / errorCategory (transient, validation, business, permission) / isRetryable / human-readable description.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q049",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "For the error \"refund exceeds policy limit\", what should isRetryable be, and what should the agent do?",
    "options": [
      "true; retry with exponential backoff",
      "false; do not retry pointlessly \u2014 tell the user",
      "true; try a different tool",
      "false; skip silently and move on"
    ],
    "correct": 1,
    "explanation": "A business-rule violation is isRetryable: false \u2014 the agent should not retry, it should tell the user.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q050",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "One search tool returns \"0 results\"; another returns \"timeout\". How should the coordinator treat them differently?",
    "options": [
      "Both are failures; retry both",
      "\"0 results\" is a successful query with no matches (a meaningful empty result); \"timeout\" means the query never completed (a failure requiring a retry decision)",
      "Both are successes; continue synthesising",
      "Escalate both to a human"
    ],
    "correct": 1,
    "explanation": "This distinction is heavily tested: 0 results \u2260 timeout; they mean different things and drive different coordinator decisions.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q051",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What are the typical values of errorCategory?",
    "options": [
      "low / medium / high / critical",
      "transient / validation / business / permission",
      "read / write / execute / admin",
      "info / warn / error / fatal"
    ],
    "correct": 1,
    "explanation": "errorCategory describes the failure type: transient, validation, business, permission.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q052",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A database query times out and returns an error. What should isRetryable be?",
    "options": [
      "false, because the query is faulty",
      "true \u2014 a timeout is a transient error and can be retried",
      "It depends on the query length",
      "Omit the field and let the agent decide"
    ],
    "correct": 1,
    "explanation": "A timeout is transient \u2192 isRetryable: true. Contrast with a business-rule violation \u2192 false.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q053",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A document pipeline has five extraction schemas (invoice, contract, CV\u2026) but you do not know the document type in advance. What should tool_choice be?",
    "options": [
      "tool_choice: \"auto\"",
      "tool_choice: \"any\"",
      "tool_choice: {\"type\":\"tool\",\"name\":\"extract_invoice\"}",
      "Leave tool_choice unset"
    ],
    "correct": 1,
    "explanation": "\"any\" forces a tool call without fixing which one \u2014 exactly right for several schemas and an unknown document type.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q054",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A workflow requires extract_metadata to be called first before any downstream processing. How do you configure the first turn?",
    "options": [
      "tool_choice: \"auto\"",
      "tool_choice: \"any\"",
      "tool_choice: {\"type\":\"tool\",\"name\":\"extract_metadata\"}",
      "Write \"please call extract_metadata first\" in the prompt"
    ],
    "correct": 2,
    "explanation": "When you need deterministic output through a specific tool, name it in tool_choice.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q055",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In a research system, one subagent needs simple fact verification 85% of the time but must queue back through the coordinator every time. Best optimisation?",
    "options": [
      "Grant it all of the coordinator\\",
      ",",
      ",",
      ","
    ],
    "correct": 1,
    "explanation": "Scoped tools: a narrow tool covers the high-frequency simple case; complex cases still go through the coordinator.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q056",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What is the core value of MCP?",
    "options": [
      "Automatic retries and rate limiting for tool calls",
      "A standard interface: write one MCP server and every MCP-compatible AI application can connect to it \u2014 build once, reuse everywhere",
      "A faster transport protocol than REST",
      "Built-in authentication and secret management"
    ],
    "correct": 1,
    "explanation": "MCP\\",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q057",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A team wants its MCP server configuration in version control so everyone shares it. Which file?",
    "options": [
      "~/.claude.json",
      ".mcp.json in the project root",
      ".claude/CLAUDE.md",
      ".claude/rules/mcp.md"
    ],
    "correct": 1,
    "explanation": "Project-level .mcp.json is the shared team configuration; user-level ~/.claude.json is personal.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q058",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An MCP configuration needs an API key. Correct approach?",
    "options": [
      "Put it directly in .mcp.json since the repository is internal",
      "Use ${ENV_VAR} expansion \u2014 never hard-code secrets in configuration",
      "Put it in CLAUDE.md with a \"do not share\" comment",
      "Encrypt it and store it in .mcp.json"
    ],
    "correct": 1,
    "explanation": "Never hard-code secrets; use environment-variable expansion.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q059",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An agent needs to know what issue summaries, documentation hierarchies and database schemas exist internally, and currently burns many turns discovering them through exploratory tool calls. Which MCP capability solves this?",
    "options": [
      "MCP tools",
      "MCP resources \u2014 expose a content catalogue so the agent knows what data is available",
      "MCP\\",
      ","
    ],
    "correct": 1,
    "explanation": "MCP resources expose content catalogues (issue summaries, doc hierarchies, database schemas) so no exploratory calls are needed.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q060",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A team added an MCP server offering advanced code search, but the agent still prefers the built-in Grep. Most likely cause and fix?",
    "options": [
      "The MCP server is too slow; optimise its performance",
      "The MCP tool description is too thin for the agent to see it beats Grep \u2014 write a detailed description",
      "Built-in tools have protocol-level priority over MCP tools and this cannot change",
      "Disable Grep in allowedTools"
    ],
    "correct": 1,
    "explanation": "Thin MCP tool descriptions make the agent fall back to built-ins like Grep; write the description in detail.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q061",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A team needs to integrate Jira (standard SaaS) and an in-house approval workflow. What is the recommendation?",
    "options": [
      "Build both in-house for consistency",
      "Use a community MCP server for Jira; build your own only for the in-house workflow",
      "Look for community servers for both",
      "Skip MCP and write plain tools"
    ],
    "correct": 1,
    "explanation": "Use community servers for standard integrations; build custom ones only for team-specific workflows.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q062",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "You need to find every place that calls calculateTax(). Which built-in tool?",
    "options": [
      "Glob",
      "Grep",
      "Read",
      "Bash"
    ],
    "correct": 1,
    "explanation": "Grep searches file contents \u2014 finding callers, locating error strings, tracing imports. Glob matches names and paths.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q063",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "You need to find every **/*.test.tsx file in the project. Which built-in tool?",
    "options": [
      "Grep",
      "Glob",
      "Read",
      "Write"
    ],
    "correct": 1,
    "explanation": "Glob matches file names and path patterns; finding **/*.test.tsx is the canonical case.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q064",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Edit keeps failing because the target text is not unique in the file. Best handling?",
    "options": [
      "Keep extending old_string until it is unique",
      "Read the whole file and Write it back",
      "Use Bash and sed to substitute",
      "Give up on modifying that file"
    ],
    "correct": 1,
    "explanation": "When Edit cannot find a unique anchor, fall back to Read + Write rather than fighting Edit.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q065",
    "domain": "Tool Design & Model Context Protocol (MCP) Integration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What is the recommended strategy for understanding an unfamiliar large codebase?",
    "options": [
      "Read every source file at once to build complete context",
      "Grep for entry points \u2192 Read to follow the import chain \u2192 build understanding incrementally",
      "Run tree in Bash to see the directory structure and stop there",
      "Have Claude write a speculative architecture document first"
    ],
    "correct": 1,
    "explanation": "Exploration strategy: Grep for entry points, Read to follow imports, build up incrementally rather than reading everything (which blows up the context).",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q164",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A subagent keeps failing to reach an external data source. After retrying five times it gives up and returns an empty \"nothing relevant found\" report. The coordinator takes that at face value and moves on to synthesis. What is the underlying design fault?",
    "options": [
      "The subagent disguised a failure as an empty result. Error handling belongs to the coordinator \u2014 the subagent should report the failure honestly and let the coordinator decide whether to retry, switch sources, or flag the gap",
      "The retry count is too low and should be raised to 20",
      "The coordinator should call that external source itself instead of delegating it",
      "The subagent should contact another subagent to get the data"
    ],
    "correct": 0,
    "explanation": "In hub-and-spoke, the coordinator owns communication, error handling and information routing. A subagent that swallows failures and disguises them as empty results conflates \"found nothing\" with \"never completed the lookup\" \u2014 the coordinator loses the basis for its decision and the gap goes unflagged.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q165",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "After collecting reports from four subagents, the coordinator concatenates all four verbatim and ships that as the final report. Users complain that one conclusion appears three times and two passages contradict each other. Which step did the coordinator skip?",
    "options": [
      "Result aggregation \u2014 the coordinator\\",
      ",",
      ",",
      ","
    ],
    "correct": 0,
    "explanation": "Aggregation is not concatenation: duplicate conclusions have to be collapsed and contradictions surfaced explicitly for the next step to handle. Concatenating just forwards the problem to the user.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q166",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A team audits an unfamiliar codebase for performance problems using Dynamic Decomposition. Their approach: have the agent map the directory structure once, then generate all 40 subtasks up front and work through them. At subtask 12 they discover the real bottleneck sits in a module that never made the list \u2014 but the plan is already fixed. What went wrong?",
    "options": [
      "The point of dynamic decomposition is that the plan keeps adjusting as dependencies surface \u2014 not that subtasks are frozen once mapping is done",
      "Mapping the directory structure was wasted effort; they should have gone straight to file-by-file analysis",
      "40 subtasks is too many; it should be under 10",
      "They should have used Prompt Chaining \u2014 a fixed pipeline is more reliable"
    ],
    "correct": 0,
    "explanation": "An adaptive investigation plan is: map the structure \u2192 identify high-impact areas \u2192 produce a prioritised plan \u2192 keep adjusting it as dependencies surface. Freezing the list turns dynamic decomposition back into a fixed pipeline, which is guaranteed to miss whatever you could not foresee.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q167",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A CI pipeline's PR review was split into a per-file local pass and a cross-file integration pass. To halve token spend the team merged them into one prompt: \"find both local bugs and cross-file problems.\" Local bug detection then dropped noticeably. Why?",
    "options": [
      "Merging back into a single pass reintroduces attention dilution \u2014 splitting into two passes exists precisely so each pass watches for one class of problem",
      "CI machines lack the compute; they need a bigger runner",
      "\"Local\" should come after \"cross-file\" in the prompt; the order is wrong",
      "The two problem classes must be handled by two different models"
    ],
    "correct": 0,
    "explanation": "A single pass over a large PR dilutes attention, which is the whole reason the review was split into local and integration passes. The tokens saved by merging buy the dilution problem straight back.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q168",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An investigation session has been idle for three weeks (the project was frozen and not a single line of the codebase changed). The team reasons \"that is far too long, the context cannot still be fresh\" and starts a new session from scratch. Is that judgement right?",
    "options": [
      "No \u2014 the test is whether the tool results have gone stale, not how much time passed. The code never changed, so the old file contents are still valid and --resume is right",
      "Yes \u2014 any session older than two weeks should be restarted",
      "Yes \u2014 the longer the gap, the more inconsistent the model becomes",
      "No \u2014 they should fork_session from the old session instead"
    ],
    "correct": 0,
    "explanation": "Choosing between --resume and a new session depends on whether the earlier tool results are still valid. The code did not change, so the earlier file reads are still accurate, and resuming is both cheapest and keeps the understanding already built. Elapsed time is not the test.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q066",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "The team rule \"every API change must update the OpenAPI spec\" is only honoured by about half the team's Claude sessions. Most likely cause?",
    "options": [
      "The rule is not written clearly enough",
      "It lives in user-level ~/.claude/CLAUDE.md, so only people who configured it get it \u2014 it belongs at project level, shared via the repo",
      "Claude versions differ across the team",
      "It needs to be a skill to take effect"
    ],
    "correct": 1,
    "explanation": "Classic diagnosis: \"works for some people, not others\" means the rule is at the wrong level \u2014 project-level content placed at user level.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q067",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which CLAUDE.md location travels with the repository and is shared with the team?",
    "options": [
      "~/.claude/CLAUDE.md",
      ".claude/CLAUDE.md or the root CLAUDE.md",
      "~/.claude.json",
      "/etc/claude/CLAUDE.md"
    ],
    "correct": 1,
    "explanation": "Project level = .claude/CLAUDE.md or root CLAUDE.md, version-controlled and team-wide.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q068",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In a monorepo, each package has its own coding-standards file and you want the root CLAUDE.md to stay modular instead of copying everything in. What do you use?",
    "options": [
      "@import syntax to reference external files",
      "MCP resources",
      "The paths field of a path rule",
      "A skill\\"
    ],
    "correct": 0,
    "explanation": "@import references external files to keep CLAUDE.md modular \u2014 each package pulls in its own standards.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q069",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A project CLAUDE.md has grown to 800 lines covering testing standards, API conventions, deployment and more. Best reorganisation?",
    "options": [
      "Delete half the content",
      "Split it into topic files under .claude/rules/ (testing.md, api-conventions.md, deployment.md)",
      "Move it all to ~/.claude/CLAUDE.md",
      "Convert it into commands"
    ],
    "correct": 1,
    "explanation": "An oversized CLAUDE.md should be split into topic-specific files under .claude/rules/.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q070",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Claude behaves inconsistently across sessions and you suspect a memory-file loading problem. Which command diagnoses it?",
    "options": [
      "/doctor",
      "/memory",
      "/config",
      "/hooks"
    ],
    "correct": 1,
    "explanation": "/memory shows which memory files loaded \u2014 the tool for diagnosing inconsistent cross-session behaviour.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q071",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "The team wants an IaC security standard to load automatically whenever Claude edits anything under terraform/, and not otherwise. Which mechanism?",
    "options": [
      "CLAUDE.md",
      "A path rule under .claude/rules/ with a paths glob",
      "A skill under .claude/skills/",
      "A command under .claude/commands/"
    ],
    "correct": 1,
    "explanation": "\"Automatic\" plus \"by file type or path\" means path rules: glob-matched, deterministic triggering.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q072",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A team has a pre-release checklist workflow needed only when preparing a release. Which mechanism?",
    "options": [
      "CLAUDE.md",
      "Path rules",
      "A skill (.claude/skills/)",
      ".mcp.json"
    ],
    "correct": 2,
    "explanation": "Skills are task-triggered (invoked manually or chosen by Claude) and suit task-specific workflows.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q073",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "The rule \"all code comments must be in English\" applies to every file and every task. Where does it belong?",
    "options": [
      "CLAUDE.md",
      "Path rules",
      "A skill",
      "A command"
    ],
    "correct": 0,
    "explanation": "CLAUDE.md always loads and does not discriminate by file \u2014 right for universal rules.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q074",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which set of trigger descriptions is entirely correct?",
    "options": [
      "CLAUDE.md task-triggered / path rules always loaded / skills path-matched",
      "CLAUDE.md always loaded / path rules glob-matched on file path (automatic, deterministic) / skills task-triggered",
      "CLAUDE.md path-matched / path rules task-triggered / skills always loaded",
      "All three always load; they differ only in content"
    ],
    "correct": 1,
    "explanation": "CLAUDE.md always loads; path rules fire deterministically on glob match; skills are task-triggered.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q075",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What is the core advantage of path rules over CLAUDE.md?",
    "options": [
      "They support richer Markdown syntax",
      "They load only when a matching file is edited, cutting irrelevant context and saving tokens",
      "They have higher priority and override CLAUDE.md",
      "They can call tools"
    ],
    "correct": 1,
    "explanation": "paths uses globs so the rule loads only for matching files \u2014 less irrelevant context, fewer tokens.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q076",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which frontmatter field in a path rule specifies which files it governs?",
    "options": [
      "files",
      "paths",
      "glob",
      "match"
    ],
    "correct": 1,
    "explanation": "Rule frontmatter fields are paths (a glob pattern) and description.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q077",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A testing convention must apply to every **/*.test.tsx file, scattered across more than twenty directories. Path rule or subdirectory CLAUDE.md?",
    "options": [
      "Subdirectory CLAUDE.md, one copy in each directory",
      "A path rule, because the convention spans directories and is keyed on file type",
      "The root CLAUDE.md",
      "A skill, invoked manually when writing tests"
    ],
    "correct": 1,
    "explanation": "A convention applying to files scattered across directories (every **/*.test.tsx) calls for a path rule; a convention belonging to one directory calls for a subdirectory CLAUDE.md.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q078",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A convention applies only to files inside services/billing/, which is fairly self-contained. Best mechanism?",
    "options": [
      "A path rule",
      "A CLAUDE.md inside that subdirectory",
      "The root CLAUDE.md",
      "A command"
    ],
    "correct": 1,
    "explanation": "A convention belonging to one directory belongs in that subdirectory\\",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q079",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A code-analysis skill produces very verbose output that fills the main session's context. What do you add to its frontmatter?",
    "options": [
      "allowed-tools: [Read]",
      "context: fork",
      "argument-hint: \"file path\"",
      "paths: [\"**/*.ts\"]"
    ],
    "correct": 1,
    "explanation": "context: fork runs the skill in an isolated subagent so its output does not pollute the main session \u2014 exactly for code analysis and brainstorming.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q080",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A skill should perform read-only analysis and must never write or delete files. What do you configure?",
    "options": [
      "context: fork",
      "allowed-tools, restricting the skill to read operations",
      "argument-hint",
      "paths"
    ],
    "correct": 1,
    "explanation": "allowed-tools restricts which tools a skill may use \u2014 e.g. reads only, no writes or deletes.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q081",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which field set belongs to a **rule**'s frontmatter rather than a skill's?",
    "options": [
      "context: fork, allowed-tools, argument-hint",
      "paths, description",
      "name, version, author",
      "model, temperature, max_tokens"
    ],
    "correct": 1,
    "explanation": "Rule frontmatter: paths (which files) and description. Skill frontmatter: context: fork, allowed-tools, argument-hint.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q082",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What is the core difference between commands and skills?",
    "options": [
      "Commands are project-only, skills are user-only",
      "Commands do not support frontmatter (plain text); skills support context: fork, allowed-tools and argument-hint",
      "Commands are faster, skills are slower",
      "Commands are chosen automatically by Claude, skills must be invoked manually"
    ],
    "correct": 1,
    "explanation": "Skills = commands + superpowers: isolated execution, tool restriction and argument prompting via frontmatter.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q083",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A team wants to share a set of skills with everyone. Where do they go?",
    "options": [
      "~/.claude/skills/",
      ".claude/skills/",
      "~/.claude.json",
      ".claude/rules/"
    ],
    "correct": 1,
    "explanation": "The universal rule: inside the project directory (.claude/) means shared and version-controlled; under ~/ means personal.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q084",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "You want a personal variant of a team skill without affecting anyone else. Best approach?",
    "options": [
      "Edit the team version in .claude/skills/",
      "Create your variant under ~/.claude/skills/ with a different name",
      "Shadow it with the same filename in .claude/skills/",
      "Delete the team skill and replace it with yours"
    ],
    "correct": 1,
    "explanation": "Personal skill variants go in ~/.claude/skills/ under a different name, leaving the team copy untouched.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q085",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which of these location mappings is WRONG?",
    "options": [
      "Skills: project .claude/skills/ ; user ~/.claude/skills/",
      "MCP servers: project .mcp.json ; user ~/.claude.json",
      "Path rules: project .claude/rules/ ; user ~/.claude/rules/",
      "Commands: project .claude/commands/ ; user ~/.claude/commands/"
    ],
    "correct": 2,
    "explanation": "Path rules exist only at project level (.claude/rules/); the user-level column is \"\u2014\". The other three are correct.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q086",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "You are splitting a monolith into microservices, touching 45+ files, with several viable designs. Which mode?",
    "options": [
      "Direct execution, adjusting as you go",
      "Plan mode \u2014 explore and design before making changes",
      "Batch API submission",
      "fork_session"
    ],
    "correct": 1,
    "explanation": "Plan mode fits large or cross-file architectural change, vague requirements and multiple approaches: design first, avoid rework.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q087",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "You are adding one date-format validation to a form: a single file, clear requirement. Which mode?",
    "options": [
      "Plan mode, producing a design first",
      "Direct execution",
      "An Explore subagent to investigate first",
      "Split it into a multi-pass review"
    ],
    "correct": 1,
    "explanation": "Direct execution suits simple, clear, small-scope changes. Plan mode here is over-engineering.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q088",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "During exploration Claude must read dozens of files, producing very verbose output, and the main session's context is nearly full. Best approach?",
    "options": [
      "Switch to a model with a larger context window",
      "Use an Explore subagent to isolate the exploration output so the main session receives only a compact summary",
      "Manually delete part of the history",
      "Move the exploration to the Batch API"
    ],
    "correct": 1,
    "explanation": "The Explore subagent isolates verbose discovery so the main session gets a summary \u2014 this is what prevents context exhaustion.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q089",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "You described the output format you want in prose, but Claude interprets it slightly differently every time. Most effective technique?",
    "options": [
      "Give 2\u20133 concrete input/output pairs",
      "Have Claude ask you questions first, then implement",
      "Write tests first and have it iterate",
      "Switch to plan mode"
    ],
    "correct": 0,
    "explanation": "Concrete I/O examples are for exactly this: prose descriptions producing inconsistent interpretations \u2014 give 2\u20133 pairs.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q090",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "You are implementing complex distributed-locking logic and want Claude to converge on a correct implementation. Best iteration mode?",
    "options": [
      "Give a few I/O examples",
      "Test-driven iteration: write the tests first, share the failures, converge",
      "The interview pattern",
      "Try variants in bulk via the Batch API"
    ],
    "correct": 1,
    "explanation": "Test-driven iteration suits complex implementations: tests first, share failures, converge step by step.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q091",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "You are designing in an area you do not know well (cache coherency) and are unsure what to even consider. Best pattern?",
    "options": [
      "Have Claude implement it and fix problems later",
      "The interview pattern: let Claude ask questions first (invalidation strategy? failure modes?) then implement",
      "Give I/O examples",
      "Write tests first"
    ],
    "correct": 1,
    "explanation": "The interview pattern suits unfamiliar domains: let Claude surface the dimensions you had not considered before implementing.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q092",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A CI pipeline calls claude and the job hangs forever. Which flag is most likely missing?",
    "options": [
      "--output-format json",
      "-p / --print (non-interactive mode)",
      "--json-schema",
      "--resume"
    ],
    "correct": 1,
    "explanation": "-p / --print is non-interactive mode and is mandatory in CI \u2014 without it the process hangs.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q093",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "CI must parse Claude's review output as structured data with a fixed field structure. Which flags?",
    "options": [
      "Just -p",
      "-p plus --output-format json plus --json-schema",
      "-p plus --resume",
      "--output-format json on its own"
    ],
    "correct": 1,
    "explanation": "The three flags escalate: -p (non-interactive) \u2192 --output-format json (parseable) \u2192 --json-schema (conforms to a structure).",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q094",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Claude in CI needs to know the team's testing standards, fixture conventions and review criteria. Least-effort approach?",
    "options": [
      "Concatenate the standards into the prompt on every invocation",
      "Put them in CLAUDE.md so CI-invoked Claude picks them up automatically",
      "Store them as MCP resources",
      "Put them in ~/.claude/CLAUDE.md"
    ],
    "correct": 1,
    "explanation": "CLAUDE.md supplies CI context: testing standards, fixture conventions and review criteria are picked up automatically.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q095",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In CI, one Claude session generates code and then reviews its own output, and almost never reports problems. Cause and fix?",
    "options": [
      "The model is not capable enough; use a bigger one",
      "Confirmation bias: the same session retains its generation reasoning and will not question its own decisions \u2014 review with an independent Claude instance",
      "The prompt does not say \"review strictly\" \u2014 strengthen the wording",
      "Raise the temperature"
    ],
    "correct": 1,
    "explanation": "Session isolation: a session reviewing its own output suffers confirmation bias; review must use an independent instance with no generation context.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q096",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A PR re-runs the Claude review on every push and the same comment has now been posted five times. Best fix?",
    "options": [
      "Review only once, when the PR is opened",
      "On re-run, pass in the prior findings and instruct Claude to report only new or still-unresolved issues",
      "Cache the review result and reuse it",
      "Reduce review frequency to once a day"
    ],
    "correct": 1,
    "explanation": "To avoid duplicate comments, carry the prior findings into the re-run and instruct Claude to report only what is new or unresolved.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q097",
    "domain": "Claude Code Configuration & Workflows",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Claude's suggested test cases in CI frequently duplicate existing tests. Best fix?",
    "options": [
      "Add \"do not suggest duplicate tests\" to the prompt",
      "Provide the existing test files so Claude knows what is already covered",
      "Turn off test suggestions",
      "Only run test suggestions on new files"
    ],
    "correct": 1,
    "explanation": "Supplying the existing tests tells Claude what scenarios are covered, so it stops proposing duplicates.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q098",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A code-review agent's prompt says only \"find problems in the code\", and the severity judgements come out wildly inconsistent. First step?",
    "options": [
      "Add few-shot examples",
      "Make the criteria explicit: define what counts as critical / major / minor",
      "Add a self-review stage",
      "Switch to a stronger model"
    ],
    "correct": 1,
    "explanation": "Rung one: the prompt is vague with no criteria \u2192 make the criteria explicit. The keyword \"no clear criteria\" points here.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q099",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "The prompt already states clear classification criteria, but the model still applies them inconsistently on borderline cases. Next step?",
    "options": [
      "Make the criteria even longer",
      "Add 2\u20134 few-shot examples covering the borderline cases and showing the reasoning",
      "Add self-review",
      "Add programmatic enforcement"
    ],
    "correct": 1,
    "explanation": "Rung two: criteria are clear but applied inconsistently \u2192 few-shot. The keyword is \"instructions already added but inconsistent\".",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q100",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An agent's support replies always leave something out, but **something different every time** (sometimes the timeline, sometimes next steps, sometimes the policy reference). Best approach?",
    "options": [
      "Make the criteria explicit",
      "Few-shot examples",
      "Self-review (evaluator\u2013optimizer): draft \u2192 checklist self-check \u2192 fill gaps \u2192 emit",
      "Programmatic hard limits"
    ],
    "correct": 2,
    "explanation": "Rung three: omissions that vary case by case \u2192 self-review. The keyword is \"gaps vary by case\".",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q101",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A code-review tool has a very high false-positive rate and developers now ignore every warning. Best way to stop the bleeding?",
    "options": [
      "Downgrade all findings to info",
      "Switch off the high-false-positive categories first, keep the high-precision ones, and re-enable gradually once the criteria improve",
      "Add \"be conservative, only report high-confidence issues\" to the prompt",
      "Reduce review frequency"
    ],
    "correct": 1,
    "explanation": "False-positive management: high noise destroying trust \u2192 disable the noisy categories to stop the bleeding, keep the precise ones, re-enable after fixing.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q102",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Why does \"only report high-confidence issues\" usually fail as a prompt instruction?",
    "options": [
      "The model does not understand English adjectives",
      "It is a vague instruction with no actionable basis for judgement \u2014 what is needed is concrete categorical criteria",
      "It makes the model report nothing at all",
      "It must be in the system prompt rather than the user prompt"
    ],
    "correct": 1,
    "explanation": "Vague instructions like \"be conservative\" or \"only high-confidence\" do not work \u2014 you need specific categorical criteria.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q103",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What is the correct order of the three-rung prompt ladder?",
    "options": [
      "few-shot \u2192 explicit criteria \u2192 self-review",
      "explicit criteria \u2192 few-shot examples \u2192 self-review (evaluator\u2013optimizer)",
      "self-review \u2192 few-shot \u2192 explicit criteria",
      "explicit criteria \u2192 self-review \u2192 few-shot"
    ],
    "correct": 1,
    "explanation": "Rung one, vague prompt \u2192 explicit criteria. Rung two, clear criteria but inconsistent \u2192 few-shot. Rung three, varying omissions \u2192 self-review.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q104",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What is the most important principle when designing few-shot examples?",
    "options": [
      "Give as many as possible; 10\u201315 covers more ground",
      "Target the cases the model actually gets wrong, show the reasoning, and keep it to 2\u20134 precise examples",
      "Give only the answers, never the reasoning",
      "Keep every example as short as possible"
    ],
    "correct": 1,
    "explanation": "Three principles: target actual failures (do not teach what it knows), show the reasoning (not just the answer), few and precise (2\u20134 beats 10\u201315 vague ones).",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q105",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Why should few-shot examples show \"why this option\" rather than just the answer?",
    "options": [
      "It makes the prompt look more professional",
      "So the model learns the reasoning process and can generalise to unseen but similar cases",
      "To add tokens and trigger deeper thinking",
      "To make the prompt easier for humans to review"
    ],
    "correct": 1,
    "explanation": "Showing the reasoning is one of the three principles: the model learns the basis for judgement rather than a surface mapping.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q106",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which of these should NOT be solved with few-shot examples?",
    "options": [
      "Tool selection in ambiguous cases",
      "Distinguishing acceptable code patterns from genuine issues (reducing false positives)",
      "Ensuring refunds never exceed the authorised limit",
      "Correct extraction from differently structured documents"
    ],
    "correct": 2,
    "explanation": "Few-shot is not a cure-all: money and safety require programmatic enforcement, not examples. The other three are genuine few-shot use cases.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q107",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In an extraction task the model occasionally hallucinates units of measure that are not in the source. Besides schema design, how can few-shot help?",
    "options": [
      "Show worked examples of how to handle informal units, reducing hallucination",
      "Give 15 examples covering every possible unit",
      "Demonstrate how to invent a plausible unit",
      "Few-shot has no effect on hallucination"
    ],
    "correct": 0,
    "explanation": "One documented use of few-shot is reducing hallucination in extraction tasks, e.g. handling informal units of measure.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q108",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which item is NOT on the \"rule this out first\" checklist before reaching for few-shot?",
    "options": [
      "Whether there are any baseline criteria at all",
      "Whether the tool descriptions or names are problematic",
      "Whether temperature is set too high",
      "Whether the system prompt contains accidental routing instructions"
    ],
    "correct": 2,
    "explanation": "The checklist: no criteria \u2192 write criteria; tool description problems \u2192 fix or rename; money/safety \u2192 programmatic; varying omissions \u2192 self-review; check the system prompt. Temperature is not on it.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q109",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What is the most reliable way to get consistently structured output from Claude?",
    "options": [
      "Ask for JSON in the prompt and show a format example",
      "Define a tool with a JSON schema and force structured output via tool_use",
      "Extract with regular expressions from free text",
      "Have Claude emit a Markdown table and parse it"
    ],
    "correct": 1,
    "explanation": "The most reliable approach is a tool with a JSON schema, using tool_use to force structured output.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q110",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "After moving to tool_use with a JSON schema, invoice extraction never produces malformed JSON again \u2014 but 8% of invoices still have line items that do not sum to the stated total. Why?",
    "options": [
      "The schema definition has a bug",
      "Tool use removes syntax errors (malformed JSON, missing fields) but not semantic errors (sums that do not add up, values in the wrong field)",
      "The model version is too old",
      "tool_choice should be set to \"any\""
    ],
    "correct": 1,
    "explanation": "Heavily tested: tool use eliminates syntax errors \u2705 but not semantic errors \u274c.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q111",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Following on: how do you automatically detect semantic errors like \"line items do not sum to the total\"?",
    "options": [
      "Raise temperature for more variety",
      "Add cross-check fields: calculated_total (sum of line items) alongside stated_total (as printed), and flag mismatches for human review",
      "Make the total field nullable",
      "Increase few-shot examples to 15"
    ],
    "correct": 1,
    "explanation": "Automatic cross-checking: calculated_total plus stated_total, flagged for human review on mismatch (or conflict_detected: true).",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q112",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Some invoices simply have no purchase-order number. How should the schema prevent hallucination?",
    "options": [
      "Mark it required so the model always fills it",
      "Make it nullable rather than required, allowing null when the value is not in the source",
      "Give it a default of \"N/A\"",
      "Remove the field from the schema entirely"
    ],
    "correct": 1,
    "explanation": "Schema design: when the value may be absent from the source, make it nullable rather than required \u2014 that prevents fabrication.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q113",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In sentiment analysis, some reviews are sarcastic and forcing a positive/negative call produces a high error rate. How should the schema change?",
    "options": [
      "Change sentiment to a 0\u2013100 score",
      "Add an \"unclear\" value to the enum",
      "Make sentiment nullable",
      "Add few-shot examples teaching sarcasm detection"
    ],
    "correct": 1,
    "explanation": "Schema design: when sentiment genuinely cannot be determined (sarcasm), add an \"unclear\" enum value.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q114",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A classification field's value set may grow later and cannot be enumerated now. How should the schema be designed?",
    "options": [
      "Use a free string with no enum",
      "Add \"other\" to the enum plus a detail string field",
      "Change the schema each time a new value appears",
      "Make it nullable"
    ],
    "correct": 1,
    "explanation": "Schema design for extensibility: \"other\" plus a detail string field.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q115",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "After a validation failure the system retries with an identical prompt and the same error recurs. Best fix?",
    "options": [
      "Raise the retry count to five",
      "On retry, include the original document, the failed extraction and the specific validation errors",
      "Retry with a different model",
      "Raise temperature for more varied output"
    ],
    "correct": 1,
    "explanation": "A blind retry reproduces the error \u2014 send the original document plus the failed extraction plus the specific validation errors.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q116",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Some documents never yield a \"contract effective date\" no matter how many times you retry; logs show the field simply is not in the source. What should the system do?",
    "options": [
      "Keep retrying until it succeeds",
      "Recognise that retrying is futile (the information is not in the document), stop, and mark it missing or route it to a human",
      "Have the model infer a plausible date from context",
      "Loosen validation so it passes"
    ],
    "correct": 1,
    "explanation": "The limit of retrying: if the information is not in the provided document, no number of retries helps \u2014 you must detect when retrying is futile.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q117",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "You want to analyse code-review false positives systematically \u2014 which findings developers dismiss and what they have in common. Which field do you add?",
    "options": [
      "severity",
      "detected_pattern \u2014 recording which code pattern triggered the finding",
      "timestamp",
      "reviewer_id"
    ],
    "correct": 1,
    "explanation": "detected_pattern records what triggered each finding, so dismissals can be analysed for false-positive patterns.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q118",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A self-check finds calculated_total and stated_total disagree. Best action?",
    "options": [
      "Overwrite stated_total with calculated_total automatically",
      "Set conflict_detected: true in the output and flag it for human review",
      "Discard the record",
      "Re-extract until they agree"
    ],
    "correct": 1,
    "explanation": "The self-check flow sets conflict_detected: true (and flags for review) rather than deciding on the user\\",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q119",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What are the two defining characteristics of the Batch API versus the synchronous API?",
    "options": [
      "Lower latency and higher cost",
      "Up to 24 hours of latency and a 50% cost discount",
      "Real-time responses at full price",
      "A guaranteed latency SLA and a 30% discount"
    ],
    "correct": 1,
    "explanation": "Batch API: up to 24 hours, 50% discount. Synchronous: real time, full price.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q120",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A pre-merge PR check blocks developers until it returns. Is the Batch API appropriate?",
    "options": [
      "Yes, it is half the price",
      "No \u2014 this is a blocking workflow and cannot wait up to 24 hours",
      "Yes, as long as you set a short timeout",
      "Yes, the Batch API usually returns within seconds"
    ],
    "correct": 1,
    "explanation": "One of the three hard limits: workflows that cannot wait are out. Blocking pre-merge checks need the synchronous API.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q121",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Can the Batch API be used for a research task where the agent calls tools over several turns, deciding each step from the last result?",
    "options": [
      "Yes, package all the tool calls into one batch",
      "No \u2014 the Batch API is fire-and-forget and does not support interactive multi-turn tool calling",
      "Yes, submit one batch per turn",
      "Yes, the Batch API has a built-in agentic loop"
    ],
    "correct": 1,
    "explanation": "Second hard limit: workflows needing multi-turn tool calls are out \u2014 it is fire-and-forget with no mid-request interaction.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q122",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A batch of 10,000 requests comes back with 37 failures. How do you identify and resubmit exactly those 37?",
    "options": [
      "By array index position",
      "By the custom_id carried on each request, correlating request to response and resubmitting only the failures",
      "Resubmit the whole batch",
      "Match on timestamps"
    ],
    "correct": 1,
    "explanation": "custom_id correlates batch requests and responses, so only the failed items need resubmitting.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q123",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Documents arrive continuously, batch processing takes up to 24 hours, and the business requires results within 30 hours of arrival. How often should batches be submitted?",
    "options": [
      "Every 24 hours",
      "Every 6 hours",
      "Every 30 hours",
      "Every hour"
    ],
    "correct": 1,
    "explanation": "Scheduling arithmetic: waiting window + 24h processing \u2264 30h \u2192 waiting window \u2264 6h \u2192 submit every 6 hours.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q124",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "You need to run extraction over 500,000 documents with the Batch API. Best process?",
    "options": [
      "Submit everything at once and deal with problems later",
      "Refine the prompt on a small sample \u2192 submit the full volume via Batch \u2192 resubmit failures in follow-up batches",
      "Use the synchronous API throughout for quality",
      "Submit half, observe for a week, then submit the rest"
    ],
    "correct": 1,
    "explanation": "Large-volume strategy: refine the prompt on a sample, submit the full run via Batch, then resubmit failures batch by batch.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q125",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Why is \"generate then review\" within a single session ineffective?",
    "options": [
      "The context grows too long and it forgets",
      "The model retains its generation reasoning, producing confirmation bias, so it rarely questions its own decisions",
      "Token costs are too high",
      "A single session cannot call review tools"
    ],
    "correct": 1,
    "explanation": "The limit of self-review: the same session keeps its reasoning context \u2192 confirmation bias \u2192 it does not challenge itself. The fix is an independent instance.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q126",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Following on, what is the correct fix?",
    "options": [
      "Add \"please review strictly\" to the same session",
      "Review with an independent Claude instance that has none of the generation context",
      "Raise temperature",
      "Run the review via the Batch API"
    ],
    "correct": 1,
    "explanation": "The fix is an independent Claude instance, which has no generation reasoning and therefore no confirmation bias.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q127",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Review findings must be routed by risk: high-confidence issues block the merge, low-confidence ones are advisory. How do you design this?",
    "options": [
      "Route by how long the finding text is",
      "Have the model self-report a confidence score per finding, enabling calibrated review routing",
      "Route by file path",
      "Route by a threshold on the number of findings"
    ],
    "correct": 1,
    "explanation": "Self-reported confidence per finding is what enables calibrated review routing.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q128",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What are the two classic symptoms of reviewing a large PR in one pass?",
    "options": [
      "Slowness and cost",
      "Attention dilution (local issues missed) and self-contradictory conclusions",
      "Malformed JSON and missing fields",
      "Timeouts and rate limiting"
    ],
    "correct": 1,
    "explanation": "A large PR in one pass causes attention dilution and contradictions \u2014 hence the split into local and integration passes.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q129",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In a long research context, findings in the middle are consistently overlooked by the agent. What is this called, and how is it fixed?",
    "options": [
      "Context overflow; switch to a larger-window model",
      "Lost in the middle; put the key-findings summary first and add section headers to help navigate the middle",
      "Confirmation bias; re-check with an independent instance",
      "Attention dilution; split into multiple passes"
    ],
    "correct": 1,
    "explanation": "Lost in the middle: LLMs attend to the start and end of long inputs and drop the middle. Fix: key summary first plus section headers.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q130",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "After a long conversation is auto-summarised, the agent misremembers a refund amount that was previously confirmed. Best fix?",
    "options": [
      "Disable summarisation and keep the full transcript",
      "Extract the hard facts (amounts, dates, order numbers, policy references) into a persistent \"case facts\" block that is excluded from summarisation and injected each turn",
      "Make the summaries longer",
      "Ask the customer to restate the amount each turn"
    ],
    "correct": 1,
    "explanation": "Summaries are lossy by nature. The fix is a persistent case-facts block excluded from summarisation and injected every turn.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q131",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An upstream subagent emits 155K tokens while the downstream synthesis agent performs best around 50K. Best fix?",
    "options": [
      "Insert an intermediate summarising agent to compress to 50K",
      "Have the upstream agent return only structured essentials (facts + citations + relevance scores), reducing volume at the source",
      "Truncate to the first 50K",
      "Give the downstream agent a larger-window model"
    ],
    "correct": 1,
    "explanation": "Filter at the source rather than summarising afterwards. An intermediate summariser is explicitly marked as treating the symptom.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q132",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Putting the key-findings summary at the very start of a long context primarily counteracts what?",
    "options": [
      "Token cost",
      "Lost in the middle (content in the middle is easily missed)",
      "Confirmation bias",
      "Race conditions"
    ],
    "correct": 1,
    "explanation": "Attention is strongest at the start and end, so key content goes first, with section headers to help navigate the middle.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q133",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A customer's situation is not covered by any company policy. What should the agent do?",
    "options": [
      "Extrapolate from the closest policy",
      "Escalate \u2014 this is a policy gap, and the agent must not invent rules",
      "Refuse service",
      "Tell the customer to look up the policy themselves"
    ],
    "correct": 1,
    "explanation": "One of the four escalation triggers: a policy gap means there is no rule to follow, and the agent must not make one up.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q134",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which situation should NOT be escalated to a human?",
    "options": [
      "A complaint requiring subjective, empathetic judgement",
      "A shipping dispute \u2014 the company has a standard procedure",
      "A refund above the agent\\",
      ","
    ],
    "correct": 1,
    "explanation": "Where a standard procedure exists (a shipping dispute), the agent handles it. The other three are genuine escalation triggers.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q135",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A customer raises four issues at once and the agent decides \"this is too much for me\" and escalates. Is that right?",
    "options": [
      "Yes, more issues means escalate",
      "No \u2014 \"several issues at once\" is not an escalation trigger; the agent should decompose, investigate in parallel and synthesise one reply",
      "Yes, because the context will overflow",
      "No, it should answer only the first issue"
    ],
    "correct": 1,
    "explanation": "Explicitly not an escalation trigger: multiple simultaneous issues. Decompose and handle them in parallel.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q136",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A customer lookup returns three customers with the same name. What should the agent do?",
    "options": [
      "Pick the one with the most recent order",
      "Do not guess \u2014 ask the user for an additional identifier (email, phone, order number)",
      "Escalate to a human",
      "Act on all three accounts"
    ],
    "correct": 1,
    "explanation": "Disambiguating multiple matches: do not guess, ask for another identifier.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q137",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "The rule \"refunds may not exceed $500\" \u2014 escalation or programmatic enforcement?",
    "options": [
      "Escalation: send every refund to a human for confirmation",
      "Programmatic enforcement (hook or prerequisite): the rule is explicit and simply must hold 100% of the time",
      "Neither; a prompt instruction is enough",
      "Escalation, because money is involved"
    ],
    "correct": 1,
    "explanation": "The distinction: escalation is for when a human judgement is needed (no rule exists); programmatic enforcement is for an existing rule that must hold 100% (refund caps, identity verification).",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q138",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Two of a research system's five data sources timed out. What must the agent absolutely NOT do?",
    "options": [
      "Continue synthesising with the remaining three sources",
      "Annotate which areas are well supported, which have gaps, and which sources failed",
      "Silently skip the failed sources and emit a report that looks complete",
      "Keep both values and flag the conflict where data disagrees"
    ],
    "correct": 2,
    "explanation": "Absolutely prohibited: silently skipping without reporting. Hiding the error leaves a hole in the output that nobody knows about.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q139",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "When some data sources fail, what does correct graceful degradation look like?",
    "options": [
      "Fail the whole task and return an error",
      "Continue synthesising with what is available, and annotate coverage and gaps explicitly in the output",
      "Retry automatically until everything succeeds",
      "Substitute guessed data for the failed sources"
    ],
    "correct": 1,
    "explanation": "Graceful degradation: keep working with the available data while clearly flagging the gaps.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q140",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Two sources give different values for the same metric. What should the subagent do?",
    "options": [
      "Pick whichever looks more credible",
      "Keep both values, flag the conflict, and let the coordinator decide",
      "Take the average",
      "Drop the metric"
    ],
    "correct": 1,
    "explanation": "On conflicting data, keep both values with the conflict flagged and let the coordinator decide \u2014 do not choose yourself.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q141",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A search tool returns \"0 results\". What is that?",
    "options": [
      "A failure requiring a retry",
      "A successful query with no matches \u2014 a meaningful empty result",
      "A timeout",
      "A permission error"
    ],
    "correct": 1,
    "explanation": "Heavily tested: \"0 results\" means the query succeeded and nothing matched; \"timeout\" means the query never completed and is a failure.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q142",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Why is silent skipping listed as something you must never do?",
    "options": [
      "It wastes tokens",
      "It hides the error \u2014 the final output has a gap that nobody knows about",
      "It triggers rate limiting",
      "It violates the MCP specification"
    ],
    "correct": 1,
    "explanation": "Hiding the error means downstream decisions are made on incomplete data without anyone realising.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q143",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Subagents emit so much output that downstream synthesis quality drops. What is the recommended principle?",
    "options": [
      "Post-hoc summarisation beats source filtering",
      "Source filtering beats post-hoc summarisation",
      "Increase the downstream agent\\",
      ","
    ],
    "correct": 1,
    "explanation": "The principle is that filtering at the source beats summarising afterwards: have upstream agents return structured essentials rather than adding an intermediate summariser.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q144",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In structured handoffs between agents, how should content and metadata be separated?",
    "options": [
      "Blend everything into one natural-language passage",
      "Content = facts, findings, quotations; metadata = source URL, document name, page number, relevance score",
      "Content = URLs; metadata = facts",
      "No separation is needed; the downstream agent will parse it"
    ],
    "correct": 1,
    "explanation": "Structured handoff separates content (facts, findings, quotations) from metadata (source URL, document name, page number, relevance score) to preserve attribution.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q145",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Why is \"add an intermediate summarising agent\" marked as a \u274c approach?",
    "options": [
      "Summarising agents are expensive",
      "It adds another processing layer and treats the symptom \u2014 the volume should be reduced at the source",
      "The Agent SDK does not support three-level agents",
      "Summarising agents create race conditions"
    ],
    "correct": 1,
    "explanation": "\u274c an intermediate summariser is another layer treating the symptom; \u2705 have upstream agents return structured essentials, cutting volume at the source.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q146",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What are the correct steps of the evaluator\u2013optimizer pattern?",
    "options": [
      "Emit the final reply directly and spot-check afterwards",
      "Draft the reply \u2192 self-check against a checklist (policy? timeline? next steps? did it answer the question?) \u2192 fill the gaps \u2192 emit the final reply",
      "Generate three versions in parallel and vote",
      "Ask the user what format they want, then generate"
    ],
    "correct": 1,
    "explanation": "Evaluator\u2013optimizer: draft \u2192 checklist self-check \u2192 fill gaps \u2192 final reply. It fits omissions that vary case by case.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q147",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "An extraction system now emits field-level confidence scores. How should human review be organised?",
    "options": [
      "Review only the low-confidence fields",
      "Prioritise low confidence for review, and also take a stratified random sample across every confidence band",
      "Review only the high-confidence fields",
      "Sample purely at random, ignoring confidence"
    ],
    "correct": 1,
    "explanation": "Review the low-confidence first; still sample the high-confidence, because high confidence can still be wrong.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q148",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which problem does the evaluator\u2013optimizer pattern fit best?",
    "options": [
      "A hard cap on refund amounts",
      "Omissions that vary from case to case",
      "Wrong tool selection",
      "Malformed JSON"
    ],
    "correct": 1,
    "explanation": "It fits omissions that vary case by case \u2014 rung three of the prompt ladder.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q149",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Why sample high-confidence extractions for review as well?",
    "options": [
      "To measure the confidence distribution",
      "Because high confidence can still be wrong \u2014 reviewing only low confidence lets those errors escape entirely",
      "To satisfy a compliance audit",
      "To source few-shot material"
    ],
    "correct": 1,
    "explanation": "High confidence can still be wrong, so stratified random sampling across bands avoids a systematic blind spot.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q150",
    "domain": "Prompt Engineering & Structured Output",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Faced with any \"the agent is underperforming\" problem, what is the universal priority framework?",
    "options": [
      "Architecture first \u2192 then tools \u2192 then the prompt",
      "Tune the prompt first \u2192 then tools and workflow \u2192 then architecture and infrastructure. Exception: money, safety or compliance go straight to programmatic enforcement",
      "Change the model \u2192 then the prompt \u2192 then add tools",
      "Add few-shot \u2192 then a hook \u2192 then split the agent"
    ],
    "correct": 1,
    "explanation": "Priority: 1) prompt (simplest, fastest, cheapest) 2) tools and workflow 3) architecture and infrastructure. Exception: money/safety/compliance \u2192 programmatic enforcement directly.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q151",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Late in a long codebase-exploration session, Claude starts giving inconsistent answers and cites \"the typical approach\" rather than the specific classes it actually read earlier. What is happening?",
    "options": [
      "Hallucination; switch to a stronger model",
      "Context degradation \u2014 the early findings have been diluted and the model falls back on generic priors",
      "Overlapping tool descriptions causing wrong tool selection",
      "Confirmation bias"
    ],
    "correct": 1,
    "explanation": "Official 5.4: inconsistent answers plus citing \"typical patterns\" instead of specific classes discovered earlier is the signature of context degradation.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q152",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "What does the official guidance recommend to counteract that context degradation?",
    "options": [
      "Re-read the whole codebase every turn",
      "Have the agent maintain scratchpad files recording key findings, and read them back on later questions",
      "Lower the temperature",
      "Shorten each question"
    ],
    "correct": 1,
    "explanation": "Scratchpad files persist key findings across context boundaries and are read back to counteract degradation.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q153",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Exploration has produced a lot of verbose output, the context is nearly full, and the task is not finished. Which in-session compaction mechanism does the official guide name?",
    "options": [
      "`/memory`",
      "`/compact`",
      "`--resume`",
      "`fork_session`"
    ],
    "correct": 1,
    "explanation": "/compact reduces context usage during extended exploration sessions when the window fills with verbose discovery output.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q154",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A long-running multi-agent analysis needs to survive crashes. What is the recommended design?",
    "options": [
      "Print all intermediate results to logs and have a human read them after a crash",
      "Each agent exports its state as a structured manifest to a known location; the coordinator loads it on resume and injects it into agent prompts",
      "Raise max_tokens to avoid interruptions",
      "Submit via the Batch API and let it retry automatically"
    ],
    "correct": 1,
    "explanation": "Official 5.4: design crash recovery around structured agent state exports (manifests) that the coordinator loads on resume and injects into agent prompts.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q155",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "A main agent is under heavy context pressure while exploring a large codebase. Which of these are officially recommended mitigations? (Select 3)",
    "options": [
      "Dispatch subagents for specific questions (e.g. \"find all test files\") while the main agent stays high-level",
      "Persist key findings in scratchpad files",
      "Read every source file at once to build complete context",
      "Summarise the previous phase before the next one and inject it into the initial context"
    ],
    "correct": 1,
    "explanation": "The three official skills for 5.4: subagents isolate verbose exploration, scratchpad files persist key findings, and phase summaries are injected between stages.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q157",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Two equally credible sources report different figures for the same metric. What should the synthesis agent do?",
    "options": [
      "Take the more recent one",
      "Annotate the conflict and preserve each source\\",
      ",",
      ","
    ],
    "correct": 1,
    "explanation": "Official 5.6: annotate conflicting statistics with source attribution rather than arbitrarily selecting one value; reconciliation is the coordinator\\",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q158",
    "domain": "Context Management & Reliability",
    "topic": "Exam Guide Task Statement Drill",
    "question": "In a synthesis report, 2023 market-size figures and 2026 figures were presented side by side as \"contradictory findings\". What should subagents be required to do to prevent this at the source?",
    "options": [
      "Use only the most recent year\\",
      ",",
      ",",
      ","
    ],
    "correct": 1,
    "explanation": "Official 5.6: require publication or data-collection dates in structured outputs so temporal differences are not misread as contradictions.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q159",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which of these are officially named agentic-loop anti-patterns? (Select 3)",
    "options": [
      "Parsing natural language to decide the loop is over (e.g. looking for \"Is there anything else?\")",
      "Using a max-iteration cap as the primary stopping mechanism",
      "Inspecting assistant text content as a completion signal",
      "Exiting when stop_reason is \"end_turn\""
    ],
    "correct": 0,
    "explanation": "The three anti-patterns are the first three. The fourth is the only correct loop-control mechanism.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q160",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "Which fields should a structured MCP error response carry so the agent can make sound recovery decisions? (Select 3)",
    "options": [
      "isError",
      "errorCategory",
      "isRetryable",
      "modelVersion"
    ],
    "correct": 0,
    "explanation": "The four elements of a structured MCP error: isError, errorCategory (transient/validation/business/permission), isRetryable, and a human-readable description.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q161",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "To call Claude Code in CI and get output that is both script-parseable and conformant to a fixed structure, which flags are needed? (Select 3)",
    "options": [
      "-p / --print",
      "--output-format json",
      "--json-schema",
      "--resume"
    ],
    "correct": 0,
    "explanation": "The three flags escalate: -p for non-interactive (mandatory in CI, or the job hangs) \u2192 --output-format json for parseability \u2192 --json-schema to enforce the structure.",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  },
  {
    "id": "cca-dojo-q163",
    "domain": "Agentic Architecture & Orchestration",
    "topic": "Exam Guide Task Statement Drill",
    "question": "After enforcing structured output with tool_use and a JSON schema, which problems can STILL occur? (Select 2)",
    "options": [
      "Malformed JSON",
      "Line items that do not sum to the stated total",
      "Missing required fields",
      "Values placed in the wrong field"
    ],
    "correct": 0,
    "explanation": "Tool use removes syntax-level errors (malformed JSON, missing fields) but not semantic errors (sums that do not add up, values in the wrong field).",
    "referenceTitle": "Claude Certified Architect Task Statements",
    "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
  }
];

if (typeof window !== "undefined") {
  window.DEFAULT_EXAM_QUESTIONS = DEFAULT_QUESTIONS;
}
