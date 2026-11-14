#!/usr/bin/env python3
"""
Parses all 6 full mock exams from utkarsh raw markdown files into standardized CCA-F questions JSON.
"""

import os
import re
import json

RAW_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "raw", "utkarsh")
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "utkarsh_360_questions.json")

DOMAIN_MAP = {
    "D1": "Agentic Architecture & Orchestration",
    "D2": "Tool Design & Model Context Protocol (MCP) Integration",
    "D3": "Claude Code Configuration & Workflows",
    "D4": "Prompt Engineering & Structured Output",
    "D5": "Context Management & Reliability"
}

LETTER_TO_INDEX = {"A": 0, "B": 1, "C": 2, "D": 3}

def parse_all_exams():
    all_questions = []

    for exam_num in range(1, 7):
        q_path = os.path.join(RAW_DIR, f"exam-{exam_num}-questions.md")
        a_path = os.path.join(RAW_DIR, f"exam-{exam_num}-answers.md")

        if not os.path.exists(q_path) or not os.path.exists(a_path):
            print(f"Skipping Exam {exam_num} - files not found.")
            continue

        with open(q_path, "r", encoding="utf-8") as f:
            q_text = f.read()
        with open(a_path, "r", encoding="utf-8") as f:
            a_text = f.read()

        # Parse answers key
        # Pattern: **Q1. Answer: B** *(D1)* — Explanation text...
        # or **Q1. Answer: B** — Explanation text...
        answers_map = {}
        # Find all answer blocks
        ans_pattern = re.compile(r'\*\*(?:Q)?(\d+)\.\s*Answer:\s*([A-D])(?:\s*,\s*([A-D]))?(?:\s*and\s*([A-D]))?\s*\*\*\s*(?:\*\(([^\)]+)\)\*)?\s*[—–-]\s*(.*?)(?=\n\n\*\*(?:Q)?\d+\.|\n## |\Z)', re.DOTALL)
        
        for match in ans_pattern.finditer(a_text):
            q_no = int(match.group(1))
            ans_letter = match.group(2)
            d_tag = match.group(5) or "D1"
            rationale = match.group(6).strip().replace("\n", " ")
            
            # Extract first domain code if multiple (e.g. D2, D5)
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

        # Parse questions
        q_blocks = re.split(r'\n(?=\*\*(?:Q)?\d+\.\*\*)', q_text)

        parsed_exam_qs = 0
        for block in q_blocks:
            match_header = re.match(r'\*\*(?:Q)?(\d+)\.\*\*\s*(.*?)(?=\n\s*-\s*A\))', block, re.DOTALL)
            if not match_header:
                continue

            q_no = int(match_header.group(1))
            stem = match_header.group(2).strip().replace("\n", " ")

            # Parse options A, B, C, D
            opt_a = re.search(r'-\s*A\)\s*(.*?)(?=\n\s*-\s*B\)|\Z)', block, re.DOTALL)
            opt_b = re.search(r'-\s*B\)\s*(.*?)(?=\n\s*-\s*C\)|\Z)', block, re.DOTALL)
            opt_c = re.search(r'-\s*C\)\s*(.*?)(?=\n\s*-\s*D\)|\Z)', block, re.DOTALL)
            opt_d = re.search(r'-\s*D\)\s*(.*?)(?=\n\n|\n\*\*Q|\Z)', block, re.DOTALL)

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
                "rationale": "Comprehensive architectural analysis from Claude Certified Architect guide."
            })

            correct_idx = LETTER_TO_INDEX.get(ans_info["letter"], 0)
            domain = ans_info["domain"]
            rationale = ans_info["rationale"]

            q_obj = {
                "id": f"cca-exam{exam_num}-{q_no:03d}",
                "domain": domain,
                "topic": f"Exam {exam_num} Scenario",
                "question": stem,
                "options": options,
                "correct": correct_idx,
                "explanation": rationale,
                "referenceTitle": "Claude Certified Architect Guide",
                "referenceUrl": "https://docs.anthropic.com/en/docs/build-with-claude"
            }
            all_questions.append(q_obj)
            parsed_exam_qs += 1

        print(f"Exam {exam_num}: Parsed {parsed_exam_qs} questions (Answers found: {len(answers_map)})")

    print(f"\nTotal questions successfully parsed: {len(all_questions)}")
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(all_questions, f, indent=2)
    print(f"Saved to {OUTPUT_PATH}")

if __name__ == "__main__":
    parse_all_exams()
