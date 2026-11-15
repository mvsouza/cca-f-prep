# 🎬 CCAR-P Micro-Learning Short Video Scripts (30-to-60s Knowledge Pills)

> Complete, modular script catalog breaking down the **Anthropic Claude Certified Architect - Professional (CCAR-P)** curriculum into high-retention, Reels/TikTok-style micro-scripts.

---

## 📦 Domain 1: Integration & Protocols (19% Weight)

### ⚡ Reel 1.1: The 100-Tool Nightmare (Dynamic Tool Discovery)
* **Duration:** 45 seconds
* **Visual Hook:** Split screen: Left side shows an API request crashing with 100,000 prompt tokens; right side shows clean sub-second execution.
* **[0:00–0:07] Hook:** "If you register 50 tools directly into your Claude agent, your system will hallucinate and drain your budget on every turn. Here is how Anthropic architects fix it."
* **[0:08–0:30] Concept:** "Instead of dumping every tool schema into the root system prompt, use **Progressive Tool Discovery**. You provide a single meta-tool called `search_tools`. Claude calls it with a query like 'find billing actions', retrieves only the 2 required tool schemas dynamically, and binds them to the active turn."
* **[0:31–0:45] Exam Golden Rule:** "On the CCAR-P exam: whenever a question mentions high tool count, degradation of routing accuracy, or context bloat, the answer is always **dynamic discovery or hierarchical subagent delegation**, never increasing max tokens."

---

### ⚡ Reel 1.2: Stdio vs SSE/HTTP Transports in Production
* **Duration:** 40 seconds
* **Visual:** Terminal running local process vs distributed cloud containers.
* **[0:00–0:06] Hook:** "Why does local stdio MCP fail the moment you deploy to AWS or GCP?"
* **[0:07–0:28] Concept:** "`stdio` spawns a local child process. It is built for desktop apps like Claude Code or Claude Desktop on your laptop. In production Kubernetes clusters or serverless environments, you must use **SSE (Server-Sent Events) over HTTP** with mutual TLS (mTLS) and OAuth 2.0 bearer tokens."
* **[0:29–0:40] Exam Golden Rule:** "Production enterprise MCP = **SSE / HTTP transport with JWT authorization**. Stdio = single-user local workstation only."

---

### ⚡ Reel 1.3: Multi-Tenant RAG Without Data Leaks
* **Duration:** 45 seconds
* **Visual:** Database diagram showing Tenant A trying to access Tenant B documents.
* **[0:00–0:07] Hook:** "Never ask Claude to filter multi-tenant data in the prompt. That's a massive security vulnerability. Here is the architectural rule."
* **[0:08–0:30] Concept:** "If you tell Claude: 'Only show documents for Company A', an indirect prompt injection in the document can override it. The only compliant pattern is **deterministic pre-filtering at the vector database retrieval layer**: `metadata: { tenant_id: current_user.tenant_id }` before embeddings reach Claude."
* **[0:31–0:45] Exam Golden Rule:** "Security and tenant isolation must always be enforced **deterministically outside the LLM**, never probabilistically inside the prompt."

---

## 🏗️ Domain 2: Solution Design & Architecture (17% Weight)

### ⚡ Reel 2.1: Workflows vs Autonomous Agent Swarms
* **Duration:** 50 seconds
* **Visual:** Sequential flowchart vs web of chaotic ping-pong agent arrows.
* **[0:00–0:08] Hook:** "When should you NOT use an autonomous AI agent? The answer might surprise you on the Professional exam."
* **[0:09–0:33] Concept:** "If your enterprise task has strict SLAs (under 3 seconds), zero tolerance for deviation, and predictable sequential steps (like medical invoice parsing), an autonomous agent loop is a trap. Use **Chaining / Structured Workflows**: deterministic code orchestrating targeted Claude API calls with strict JSON validation."
* **[0:34–0:50] Exam Golden Rule:** "Reserve autonomous loops only for open-ended problem spaces (like coding or deep research). For auditability, compliance, and speed, **workflows beat autonomous loops every time**."

---

### ⚡ Reel 2.2: The 3-Tier Model Routing Trick (Save 85% Cost)
* **Duration:** 45 seconds
* **Visual:** Funnel showing 100k queries → 80% Haiku, 15% Sonnet, 5% Opus.
* **[0:00–0:06] Hook:** "Sending every enterprise query to Opus is throwing money into a furnace."
* **[0:07–0:30] Concept:** "Build a **Model Routing Cascade**: Use **Claude 3.5 Haiku** for sub-second triage, intent classification, and simple FAQ answers (80% of queries). Escalate tool use and multi-step workflows to **Claude 3.5 Sonnet** (15%). Reserve **Claude 3.5 Opus** exclusively for complex legal reasoning, high-stakes math, or multi-modal analysis (5%)."
* **[0:31–0:45] Exam Golden Rule:** "Architectural efficiency is measured in cost-per-successful-task. Model cascading is the primary pattern tested for SLA management."

---

## 🧪 Domain 3: Evaluation, Testing & Optimization (16% Weight)

### ⚡ Reel 3.1: The Cryptographic Secret of Prompt Caching
* **Duration:** 45 seconds
* **Visual:** Cache hit green light turning red the instant a dynamic timestamp moves to line 1.
* **[0:00–0:08] Hook:** "Why did your 40,000-token prompt cache hit rate drop to exactly zero percent? You made this 1-character mistake."
* **[0:09–0:30] Concept:** "Anthropic prompt caching is **strict prefix matching**. The cache hash is calculated from token zero. If you put a dynamic session ID, user query, or timestamp at the beginning of your prompt, you destroy the cache for everything below it. Always place static documents, schemas, and system instructions FIRST, followed by cache checkpoints, and dynamic user inputs at the very end."
* **[0:31–0:45] Exam Golden Rule:** "Cache prefix order: **Static System Prompt ➡️ Reference Docs/Tools ➡️ Cache Point ➡️ Dynamic User Query**."

---

### ⚡ Reel 3.2: Golden Datasets & LLM-as-a-Judge
* **Duration:** 45 seconds
* **Visual:** Automated evaluation pipeline showing pass/fail score distribution.
* **[0:00–0:07] Hook:** "How do enterprise architects know a new prompt version didn't secretly break production?"
* **[0:08–0:30] Concept:** "Never rely on casual manual checks. Curate a **Golden Dataset** of 200+ edge-case queries with validated ground truths. Run an automated evaluation pipeline using **LLM-as-a-Judge** with explicit scoring rubrics (evaluating faithfulness, completeness, and safety) combined with deterministic assertions for schema validity."
* **[0:31–0:45] Exam Golden Rule:** "Continuous evaluation against a frozen golden dataset is the only accepted method to catch behavioral regressions before deploying prompt updates."

---

## 🛡️ Domain 4: Governance, Safety & Risk (14% Weight)

### ⚡ Reel 4.1: Where Does Human-in-the-Loop (HITL) Belong?
* **Duration:** 40 seconds
* **Visual:** User approval modal popping up on high-risk wire transfer button.
* **[0:00–0:07] Hook:** "Putting human approval on every agent step destroys user experience. Omitting it creates catastrophic risk. Where is the line?"
* **[0:08–0:28] Concept:** "Read operations (calculating loans, searching records, checking balances) should be fully automated. Human-in-the-Loop gates must be placed strictly before **irreversible, high-consequence state mutations**: sending external wires, deleting records, or modifying production infrastructure."
* **[0:29–0:40] Exam Golden Rule:** "HITL belongs on **write/mutation operations with real-world blast radius**, never on idempotent read operations."

---

### ⚡ Reel 4.2: Indirect Prompt Injection Defense
* **Duration:** 45 seconds
* **Visual:** Malicious incoming email trying to instruct the LLM: '[SYSTEM OVERRIDE]'.
* **[0:00–0:08] Hook:** "What happens when an email sent to your support agent contains hidden instructions to steal database records?"
* **[0:09–0:30] Concept:** "This is **Indirect Prompt Injection**. Protect your system with 3 layers: (1) wrap all external untrusted content inside explicit XML delimiters like `<untrusted_content>`, (2) instruct Claude to treat text inside those tags strictly as data, and (3) grant sensitive tools strict least-privilege permissions requiring separate auth."
* **[0:31–0:45] Exam Golden Rule:** "Always delimit untrusted external data with XML tags and decouple execution permissions from extraction prompts."

---

## 📊 Domain 5: Stakeholder Communication & Lifecycle (14% Weight)

### ⚡ Reel 5.1: Model Deprecation Canary Rollout
* **Duration:** 40 seconds
* **Visual:** Traffic slider: 95% Model v1 / 5% Model v2.
* **[0:00–0:06] Hook:** "Anthropic just deprecated your production model snapshot. Do NOT just change the model string in production."
* **[0:07–0:28] Concept:** "New model snapshots have nuanced behavioral shifts. (1) Run your golden evaluation suite to benchmark accuracy changes, (2) tweak system prompts if schema adherence drifted, and (3) deploy using a **Canary Rollout** (5% ➡️ 25% ➡️ 100%) while monitoring latency and error rates."
* **[0:29–0:40] Exam Golden Rule:** "Model upgrades require formal regression benchmarking and staged canary releases, never instant all-at-once cutovers."

---

## 🧠 Domain 6: Models, Prompting & Context (13% Weight)

### ⚡ Reel 6.1: Guarantee 100% Deterministic JSON (Prefilling)
* **Duration:** 40 seconds
* **Visual:** Code snippet showing `messages: [..., { role: 'assistant', content: '{' }]`.
* **[0:00–0:07] Hook:** "Tired of Claude answering 'Sure, here is your JSON:' before the brackets? Here is the secret trick."
* **[0:08–0:28] Concept:** "Use **Assistant Message Prefilling**. In your API request, add an assistant turn at the end with `content: '{'`. Because Claude continues from the last token, it cannot output conversational text or markdown codeblocks. It immediately continues writing the JSON body."
* **[0:29–0:40] Exam Golden Rule:** "To eliminate markdown backticks and preambles in automated pipelines, always **prefill the assistant turn with `{`**."

---

## 💻 Domain 7: Developer Productivity & Enablement (7% Weight)

### ⚡ Reel 7.1: The Power of `CLAUDE.md` in CI/CD
* **Duration:** 40 seconds
* **Visual:** Git repository root showing `CLAUDE.md` being read by Claude Code.
* **[0:00–0:06] Hook:** "How do 100 developers maintain exact architectural standards when using Claude Code?"
* **[0:07–0:28] Concept:** "Commit a `CLAUDE.md` file at the root of your repository. Claude Code automatically reads it to understand build commands, testing frameworks, forbidden package imports, and directory conventions. No prompt copy-pasting needed."
* **[0:29–0:40] Exam Golden Rule:** "`CLAUDE.md` standardizes enterprise project conventions and context across distributed engineering teams."
