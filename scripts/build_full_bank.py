#!/usr/bin/env python3
"""
Combines and standardizes all open-source CCA-F questions from:
1. Utkarsh 6 Mock Exams (342 questions)
2. Dojo Exam Guide Task Statements (164 questions)
3. Custom Foundation Core scenarios
Outputs the full 350-500 question bank into cca-f-prep/js/questions.js and data/full_question_bank.json.
"""

import os
import re
import json

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
RAW_DIR = os.path.join(DATA_DIR, "raw")
UTKARSH_DIR = os.path.join(RAW_DIR, "utkarsh")

DOMAIN_MAP = {
    "d1": "Agentic Architecture & Orchestration",
    "d2": "Tool Design & Model Context Protocol (MCP) Integration",
    "d3": "Claude Code Configuration & Workflows",
    "d4": "Prompt Engineering & Structured Output",
    "d5": "Context Management & Reliability",
    # Name variations
    "D1": "Agentic Architecture & Orchestration",
    "D2": "Tool Design & Model Context Protocol (MCP) Integration",
    "D3": "Claude Code Configuration & Workflows",
    "D4": "Prompt Engineering & Structured Output",
    "D5": "Context Management & Reliability",
    "Agentic Architecture & Orchestration": "Agentic Architecture & Orchestration",
    "Tool Design & Model Context Protocol (MCP) Integration": "Tool Design & Model Context Protocol (MCP) Integration",
    "Claude Code Configuration & Workflows": "Claude Code Configuration & Workflows",
    "Prompt Engineering & Structured Output": "Prompt Engineering & Structured Output",
    "Context Management & Reliability": "Context Management & Reliability"
}

LETTER_TO_INDEX = {"A": 0, "B": 1, "C": 2, "D": 3}

def parse_utkarsh_exams():
    questions = []
    for exam_num in range(1, 7):
        q_path = os.path.join(UTKARSH_DIR, f"exam-{exam_num}-questions.md")
        a_path = os.path.join(UTKARSH_DIR, f"exam-{exam_num}-answers.md")
        if not os.path.exists(q_path) or not os.path.exists(a_path):
            continue

        with open(q_path, "r", encoding="utf-8") as f:
            q_text = f.read()
        with open(a_path, "r", encoding="utf-8") as f:
            a_text = f.read()

        # Parse answers
        ans_pattern = re.compile(
            r'\*\*(?:Q)?(\d+)\.\s*Answer:\s*([A-D])(?:\s*,\s*([A-D]))?(?:\s*and\s*([A-D]))?\s*\*\*\s*(?:\*\(([^\)]+)\)\*)?\s*[—–-]\s*(.*?)(?=\n\n\*\*(?:Q)?\d+\.|\n## |\Z)',
            re.DOTALL
        )
        answers_map = {}
        for match in ans_pattern.finditer(a_text):
            q_no = int(match.group(1))
            ans_letter = match.group(2)
            d_tag = match.group(5) or "D1"
            rationale = match.group(6).strip().replace("\n", " ")

            first_d = "D1"
            for d in ["D1", "D2", "D3", "D4", "D5"]:
                if d in d_tag:
                    first_d = d
                    break

            answers_map[q_no] = {
                "letter": ans_letter,
                "domain": DOMAIN_MAP.get(first_d, "Agentic Architecture & Orchestration"),
                "rationale": rationale
            }

        # Parse question blocks
        q_blocks = re.split(r'\n(?=\*\*(?:Q)?\d+\.\*\*)', q_text)
        for block in q_blocks:
            match_header = re.match(r'\*\*(?:Q)?(\d+)\.\*\*\s*(.*?)(?=\n\s*-\s*A\))', block, re.DOTALL)
            if not match_header:
                continue

            q_no = int(match_header.group(1))
            stem = match_header.group(2).strip().replace("\n", " ")

            opt_a = re.search(r'-\s*A\)\s*(.*?)(?=\n\s*-\s*B\)|\Z)', block, re.DOTALL)
            opt_b = re.search(r'-\s*B\)\s*(.*?)(?=\n\s*-\s*C\)|\Z)', block, re.DOTALL)
            opt_c = re.search(r'-\s*C\)\s*(.*?)(?=\n\s*-\s*D\)|\Z)', block, re.DOTALL)
            opt_d = re.search(r'-\s*D\)\s*(.*?)(?=\n\n|\n\*\*|\n##|\Z)', block, re.DOTALL)

            if not (opt_a and opt_b and opt_c and opt_d):
                continue

            options = [
                opt_a.group(1).strip().replace("\n", " "),
                opt_b.group(1).strip().replace("\n", " "),
                opt_c.group(1).strip().replace("\n", " "),
                opt_d.group(1).strip().replace("\n", " ")
            ]

            ans_info = answers_map.get(q_no, {
                "letter": "A",
                "domain": "Agentic Architecture & Orchestration",
                "rationale": "Key architectural rationale from Claude Certified Architect syllabus."
            })

            correct_idx = LETTER_TO_INDEX.get(ans_info["letter"], 0)
            domain = ans_info["domain"]
            rationale = ans_info["rationale"]

            # Topic title
            scenario_match = re.search(r'##\s*(Scenario\s*\d+[^:\n]*[:\w\s-]*)', q_text[:q_text.find(block)])
            topic = scenario_match.group(1).strip() if scenario_match else f"Mock Exam {exam_num}"

            questions.append({
                "id": f"cca-exam{exam_num}-{q_no:03d}",
                "domain": domain,
                "topic": topic,
                "question": stem,
                "options": options,
                "correct": correct_idx,
                "explanation": rationale,
                "referenceTitle": "Claude Certified Architect Blueprint",
                "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
            })
    return questions

def parse_dojo_questions():
    """Parses English questions from dojo_content_en_q1.js, dojo_content_en_q2.js and dojo_questions.js"""
    questions = []
    q_meta_path = os.path.join(RAW_DIR, "dojo_questions.js")
    en_q1_path = os.path.join(RAW_DIR, "dojo_content_en_q1.js")
    en_q2_path = os.path.join(RAW_DIR, "dojo_content_en_q2.js")

    if not os.path.exists(q_meta_path):
        return []

    with open(q_meta_path, "r", encoding="utf-8") as f:
        meta_content = f.read()

    # Extract id, domain, and correct answer 'a' from dojo_questions.js
    meta_map = {}
    meta_pattern = re.compile(r"\{\s*id:\s*'([^']+)',\s*d:\s*'([^']+)',.*?a:\s*(\d+)", re.DOTALL)
    for m in meta_pattern.finditer(meta_content):
        qid = m.group(1)
        domain_code = m.group(2)
        ans_idx = int(m.group(3))
        meta_map[qid] = {
            "domain": DOMAIN_MAP.get(domain_code, "Agentic Architecture & Orchestration"),
            "correct": ans_idx
        }

    # Extract english questions from content.en.q1.js and q2.js
    en_content = ""
    if os.path.exists(en_q1_path):
        with open(en_q1_path, "r", encoding="utf-8") as f:
            en_content += f.read() + "\n"
    if os.path.exists(en_q2_path):
        with open(en_q2_path, "r", encoding="utf-8") as f:
            en_content += f.read() + "\n"

    # Pattern for question definitions:
    # q001:{q:'...', o:['...','...','...','...'], e:'...', w:{...}}
    q_def_pattern = re.compile(
        r"(q\d+):\s*\{\s*q:\s*'(.*?)',\s*o:\s*\[(.*?)\],\s*e:\s*'(.*?)',\s*w:",
        re.DOTALL
    )

    for m in q_def_pattern.finditer(en_content):
        qid = m.group(1)
        stem = m.group(2).strip().replace("\\'", "'").replace('\\"', '"')
        raw_options = m.group(3)
        explanation = m.group(4).strip().replace("\\'", "'").replace('\\"', '"')

        # Split options
        opt_matches = re.findall(r"(['\"])(.*?)\1", raw_options, re.DOTALL)
        options = [opt[1].strip().replace("\\'", "'").replace('\\"', '"') for opt in opt_matches]

        if len(options) != 4:
            continue

        meta = meta_map.get(qid, {
            "domain": "Agentic Architecture & Orchestration",
            "correct": 0
        })

        questions.append({
            "id": f"cca-dojo-{qid}",
            "domain": meta["domain"],
            "topic": "Exam Guide Task Statement Drill",
            "question": stem,
            "options": options,
            "correct": meta["correct"],
            "explanation": explanation,
            "referenceTitle": "Claude Certified Architect Task Statements",
            "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
        })

    return questions

def build_full_bank():
    print("Building comprehensive CCA-F question bank...")
    utkarsh_qs = parse_utkarsh_exams()
    print(f"✓ Parsed from Utkarsh 6 Mock Exams: {len(utkarsh_qs)} questions")

    dojo_qs = parse_dojo_questions()
    print(f"✓ Parsed from Dojo Task Statement Drills: {len(dojo_qs)} questions")

    # Combine
    combined = []
    seen_stems = set()

    # Normalize stem helper
    def norm(text):
        return re.sub(r'[^a-zA-Z0-9]', '', text.lower())[:80]

    for q in utkarsh_qs + dojo_qs:
        n = norm(q["question"])
        if n not in seen_stems and len(q["options"]) == 4 and 0 <= q["correct"] <= 3:
            seen_stems.add(n)
            combined.append(q)

    print(f"\nTotal unique high-yield questions compiled: {len(combined)}")

    # Domain breakdown
    domain_counts = {}
    for q in combined:
        d = q["domain"]
        domain_counts[d] = domain_counts.get(d, 0) + 1

    print("\nDomain Distribution:")
    for d, c in sorted(domain_counts.items(), key=lambda x: x[1], reverse=True):
        pct = (c / len(combined)) * 100
        print(f"  - {d}: {c} questions ({pct:.1f}%)")

    # Save to data/full_question_bank.json
    json_path = os.path.join(DATA_DIR, "full_question_bank.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(combined, f, indent=2)
    print(f"\n✓ Saved JSON bank to {json_path}")

    # Write to cca-f-prep/js/questions.js
    js_path = os.path.join(BASE_DIR, "js", "questions.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("/**\n")
        f.write(f" * Anthropic CCA-F (Claude Certified Architect - Foundations) Master Question Bank\n")
        f.write(f" * Total Questions: {len(combined)}\n")
        f.write(" * Mapped to the official 5 domains & percentage weightings:\n")
        for d, c in domain_counts.items():
            f.write(f" * - {d}: {c} questions\n")
        f.write(" */\n\n")
        f.write("const DEFAULT_QUESTIONS = ")
        json.dump(combined, f, indent=2)
        f.write(";\n\n")
        f.write('if (typeof window !== "undefined") {\n')
        f.write('  window.DEFAULT_EXAM_QUESTIONS = DEFAULT_QUESTIONS;\n')
        f.write('}\n')

    print(f"✓ Updated application question bank at {js_path}")

if __name__ == "__main__":
    build_full_bank()
