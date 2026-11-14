#!/usr/bin/env python3
"""
Deep Psychometric and Architectural Quality Audit of the 701 CCA-F Question Bank
"""

import os
import json
import re
from collections import Counter, defaultdict

BANK_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "full_question_bank.json")

with open(BANK_PATH, "r", encoding="utf-8") as f:
    questions = json.load(f)

total = len(questions)

# 1. Answer Key Distribution
ans_dist = Counter(q["correct"] for q in questions)
ans_labels = {0: "A", 1: "B", 2: "C", 3: "D"}

# 2. Length Metrics (Stems, Options, Explanations)
stem_lengths = [len(q["question"].split()) for q in questions]
stem_chars = [len(q["question"]) for q in questions]
expl_lengths = [len(q["explanation"].split()) for q in questions]

# Option length ratios: correct option length vs mean distractor length
option_ratios = []
for q in questions:
    c_idx = q["correct"]
    c_len = len(q["options"][c_idx])
    d_lens = [len(q["options"][i]) for i in range(4) if i != c_idx]
    mean_d = sum(d_lens) / len(d_lens) if d_lens else 1
    option_ratios.append(c_len / mean_d if mean_d > 0 else 1.0)

# 3. Domain Distribution
domain_dist = Counter(q["domain"] for q in questions)

# 4. Critical Anthropic Blueprint Concepts Coverage
KEY_CONCEPTS = {
    "stop_reason (tool_use / end_turn)": r'stop_reason|tool_use|end_turn',
    "Subagent context isolation": r'subagent|inherit.*context|delegat',
    "CLAUDE.md & CLI Config": r'CLAUDE\.md|claude.*code|\.claude',
    "Hooks (PreToolUse / PostToolUse)": r'hook|PreToolUse|PostToolUse|interceptor',
    "Model Context Protocol (MCP)": r'MCP|Model Context Protocol|stdio|resources/|SSE',
    "Tool Schema & is_error contract": r'input_schema|is_error|JSON Schema|tool.*description',
    "Prompt Caching mechanics": r'prompt.*caching|cache_control|ephemeral|prefix',
    "Structured Outputs (tool_choice)": r'tool_choice|structured.*json|pydantic|schema',
    "Extended Thinking": r'thinking|budget_tokens|reasoning.*token',
    "Prompt Injection & Security": r'prompt.*injection|sandwich|indirect.*injection|XML.*tags',
    "Message Batches API": r'batch|Message Batches|asynchronous.*24',
    "Rate Limiting & Backoff": r'rate.*limit|429|exponential.*backoff|jitter',
    "Plan Mode (/plan)": r'plan.*mode|/plan'
}

concept_hits = defaultdict(int)
for q in questions:
    full_text = f"{q['question']} {' '.join(q['options'])} {q['explanation']}".lower()
    for concept, pattern in KEY_CONCEPTS.items():
        if re.search(pattern, full_text, re.IGNORECASE):
            concept_hits[concept] += 1

# 5. Outlier Detection
short_stems = [q for q in questions if len(q["question"].split()) < 10]
short_expl = [q for q in questions if len(q["explanation"].split()) < 8]
length_biased_options = [q for i, q in enumerate(questions) if option_ratios[i] > 2.5]

print("=" * 60)
print(f"CCA-F MASTER QUESTION BANK QUALITY AUDIT REPORT (N = {total})")
print("=" * 60)

print("\n1. PSYCHOMETRIC METRICS")
print(f"  - Total Questions Analyzed:        {total}")
print(f"  - Avg Stem Length:                {sum(stem_lengths)/total:.1f} words ({sum(stem_chars)/total:.0f} characters)")
print(f"  - Min / Max Stem Length:           {min(stem_lengths)} / {max(stem_lengths)} words")
print(f"  - Avg Explanation Length:         {sum(expl_lengths)/total:.1f} words")
print(f"  - Avg Option Length Ratio (C/D):   {sum(option_ratios)/total:.2f} (Ideal: ~1.0, avoiding tell-tale giveaways)")

print("\n2. ANSWER KEY POSITION BALANCE")
for idx in sorted(ans_dist.keys()):
    count = ans_dist[idx]
    pct = (count / total) * 100
    print(f"  - Option {ans_labels.get(idx, idx)} ({idx}): {count:3d} questions ({pct:.1f}%)")

print("\n3. DOMAIN COMPLIANCE BREAKDOWN")
for domain, count in sorted(domain_dist.items(), key=lambda x: x[1], reverse=True):
    pct = (count / total) * 100
    print(f"  - {domain}: {count:3d} ({pct:.1f}%)")

print("\n4. ANTHROPIC ARCHITECTURAL TOPIC HIT COUNT")
for concept, hits in sorted(concept_hits.items(), key=lambda x: x[1], reverse=True):
    pct = (hits / total) * 100
    print(f"  - {concept:40s}: {hits:3d} questions ({pct:.1f}%)")

print("\n5. INTEGRITY & OUTLIER SCAN")
print(f"  - Stems with < 10 words:           {len(short_stems)} (Ideal: < 5)")
print(f"  - Explanations with < 8 words:     {len(short_expl)} (Ideal: 0)")
print(f"  - Correct option > 2.5x distractor: {len(length_biased_options)} (Giveaway risk: {len(length_biased_options)/total*100:.1f}%)")
print("=" * 60)
