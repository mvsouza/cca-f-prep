#!/usr/bin/env python3
"""
Comprehensive Question Evaluator, Deduplicator, and Merger for CCA-F:
Sources:
1. Neerajkr7 (200 questions) - https://neerajkr7.github.io/cca-foundations-exam-practice/
2. Utkarsh1agarwal (342 questions) - 6 Mock Exams
3. Dojo (163 questions) - Task Statement Drills

Rules:
- Similar questions on same concept with different scenario contexts are KEPT.
- Near-identical duplicates (similarity > 0.80 on normalized stem) are REMOVED.
- All questions validated for 4 options, valid correct answer index, explanation, and mapped to the 5 official domains.
"""

import os
import re
import json
from collections import defaultdict

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
RAW_DIR = os.path.join(DATA_DIR, "raw")

NEERAJ_PATH = os.path.join(RAW_DIR, "neerajkr7_data.json")
UTKARSH_PATH = os.path.join(DATA_DIR, "utkarsh_360_questions.json")
DOJO_PATH = os.path.join(RAW_DIR, "dojo_questions.js")
DOJO_EN_Q1 = os.path.join(RAW_DIR, "dojo_content_en_q1.js")
DOJO_EN_Q2 = os.path.join(RAW_DIR, "dojo_content_en_q2.js")

# Domain mapping
DOMAIN_MAP = {
    "agentic": "Agentic Architecture & Orchestration",
    "claude_code": "Claude Code Configuration & Workflows",
    "prompting": "Prompt Engineering & Structured Output",
    "tools_mcp": "Tool Design & Model Context Protocol (MCP) Integration",
    "context_perf": "Context Management & Reliability",
    "d1": "Agentic Architecture & Orchestration",
    "d2": "Tool Design & Model Context Protocol (MCP) Integration",
    "d3": "Claude Code Configuration & Workflows",
    "d4": "Prompt Engineering & Structured Output",
    "d5": "Context Management & Reliability",
    "Agentic Architecture & Orchestration": "Agentic Architecture & Orchestration",
    "Claude Code Configuration & Workflows": "Claude Code Configuration & Workflows",
    "Prompt Engineering & Structured Output": "Prompt Engineering & Structured Output",
    "Tool Design & Model Context Protocol (MCP) Integration": "Tool Design & Model Context Protocol (MCP) Integration",
    "Context Management & Reliability": "Context Management & Reliability"
}

def load_neeraj():
    """Load and format Neerajkr7 questions"""
    if not os.path.exists(NEERAJ_PATH):
        return []
    with open(NEERAJ_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    items = data.get("ALL_QUESTIONS", [])
    formatted = []
    for item in items:
        domain = DOMAIN_MAP.get(item.get("domain", ""), "Agentic Architecture & Orchestration")
        formatted.append({
            "source": "neerajkr7",
            "id": f"cca-neeraj-{item.get('id', 0):03d}",
            "domain": domain,
            "topic": item.get("scenario", "Exam Scenario"),
            "question": item.get("question", "").strip(),
            "options": [opt.strip() for opt in item.get("options", [])],
            "correct": item.get("correct", 0),
            "explanation": item.get("explanation", "").strip(),
            "referenceTitle": "Claude Certified Architect Foundations",
            "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
        })
    return formatted

def load_utkarsh():
    """Load Utkarsh 6 mock exams"""
    if not os.path.exists(UTKARSH_PATH):
        return []
    with open(UTKARSH_PATH, "r", encoding="utf-8") as f:
        items = json.load(f)
    for item in items:
        item["source"] = "utkarsh"
        item["domain"] = DOMAIN_MAP.get(item.get("domain", ""), "Agentic Architecture & Orchestration")
    return items

def load_dojo():
    """Load Dojo questions"""
    from build_full_bank import parse_dojo_questions
    items = parse_dojo_questions()
    for item in items:
        item["source"] = "dojo"
        item["domain"] = DOMAIN_MAP.get(item.get("domain", ""), "Agentic Architecture & Orchestration")
    return items

def tokenize(text):
    """Normalize text into word tokens for similarity comparison"""
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    tokens = [w for w in text.split() if len(w) > 2]
    return set(tokens)

def jaccard_similarity(set_a, set_b):
    if not set_a or not set_b:
        return 0.0
    intersection = len(set_a.intersection(set_b))
    union = len(set_a.union(set_b))
    return intersection / union

def evaluate_and_merge():
    print("==================================================")
    print("EVALUATING AND MERGING FREE CCA-F QUESTION SOURCES")
    print("==================================================")

    neeraj = load_neeraj()
    utkarsh = load_utkarsh()
    dojo = load_dojo()

    print(f"Loaded Raw Source Counts:")
    print(f"  1. Neerajkr7 Practice App: {len(neeraj)} questions")
    print(f"  2. Utkarsh 6 Mock Exams:   {len(utkarsh)} questions")
    print(f"  3. Dojo Task Drills:       {len(dojo)} questions")
    raw_total = len(neeraj) + len(utkarsh) + len(dojo)
    print(f"  => Total Raw Candidates:   {raw_total} questions\n")

    all_candidates = neeraj + utkarsh + dojo

    # Quality Filter:
    valid_candidates = []
    discarded_quality = 0
    for q in all_candidates:
        q_text = q.get("question", "")
        options = q.get("options", [])
        correct = q.get("correct", -1)
        explanation = q.get("explanation", "")

        # Criteria: stem length >= 20 chars, exactly 4 distinct options, valid index 0-3, explanation >= 15 chars
        if (len(q_text) >= 20 and
            len(options) == 4 and
            all(len(opt) > 0 for opt in options) and
            0 <= correct <= 3 and
            len(explanation) >= 15):
            valid_candidates.append(q)
        else:
            discarded_quality += 1

    print(f"Quality Check: {len(valid_candidates)} passed quality validation ({discarded_quality} discarded for invalid shape/length)")

    # Deduplication Filter:
    # We allow similar questions on same concept, but remove near-identical duplicates (similarity > 0.80)
    merged = []
    seen_token_sets = []
    duplicates_removed = 0
    duplicate_examples = []

    for q in valid_candidates:
        tokens = tokenize(q["question"])
        is_duplicate = False

        for existing_q, existing_tokens in seen_token_sets:
            sim = jaccard_similarity(tokens, existing_tokens)
            # Threshold 0.80 = almost identical question text
            if sim >= 0.80:
                is_duplicate = True
                duplicates_removed += 1
                if len(duplicate_examples) < 3:
                    duplicate_examples.append((q["question"][:70], existing_q["question"][:70], f"{sim:.2f}"))
                break

        if not is_duplicate:
            seen_token_sets.append((q, tokens))
            merged.append(q)

    print(f"\nDeduplication Result:")
    print(f"  - Near-identical duplicates removed: {duplicates_removed}")
    print(f"  - Final clean question pool:          {len(merged)} questions\n")

    if duplicate_examples:
        print("Sample Duplicate Deduplications (removed duplicate on the left):")
        for i, (dup, kept, sim) in enumerate(duplicate_examples, 1):
            print(f"  [{i}] Sim: {sim}")
            print(f"      Cand: \"{dup}...\"")
            print(f"      Kept: \"{kept}...\"")

    # Domain Breakdown Analysis
    domain_counts = defaultdict(int)
    for q in merged:
        domain_counts[q["domain"]] += 1

    print("\nFinal Clean Domain Distribution:")
    for domain, count in sorted(domain_counts.items(), key=lambda x: x[1], reverse=True):
        pct = (count / len(merged)) * 100
        print(f"  * {domain}: {count} questions ({pct:.1f}%)")

    # Save to data/full_question_bank.json
    out_json = os.path.join(DATA_DIR, "full_question_bank.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(merged, f, indent=2)
    print(f"\n✓ Saved clean master bank to: {out_json}")

    # Write to cca-f-prep/js/questions.js
    out_js = os.path.join(BASE_DIR, "js", "questions.js")
    with open(out_js, "w", encoding="utf-8") as f:
        f.write("/**\n")
        f.write(f" * Anthropic CCA-F Master Question Bank ({len(merged)} Questions)\n")
        f.write(" * Compiled & Deduplicated from:\n")
        f.write(" * - Neerajkr7 CCA Exam Practice (https://neerajkr7.github.io/cca-foundations-exam-practice/)\n")
        f.write(" * - Utkarsh1agarwal Claude Architect Exam Guide (6 Mock Exams)\n")
        f.write(" * - Dojo Exam Task Statements Drills\n")
        f.write(" *\n")
        f.write(" * Domain Distribution:\n")
        for domain, count in sorted(domain_counts.items(), key=lambda x: x[1], reverse=True):
            f.write(f" * - {domain}: {count} questions ({(count/len(merged))*100:.1f}%)\n")
        f.write(" */\n\n")
        f.write("const DEFAULT_QUESTIONS = ")
        json.dump(merged, f, indent=2)
        f.write(";\n\n")
        f.write('if (typeof window !== "undefined") {\n')
        f.write('  window.DEFAULT_EXAM_QUESTIONS = DEFAULT_QUESTIONS;\n')
        f.write('}\n')
    print(f"✓ Saved live client bank to:  {out_js}")

if __name__ == "__main__":
    evaluate_and_merge()
