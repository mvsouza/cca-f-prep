#!/usr/bin/env python3
"""
Balances Answer Key Position Bias (A, B, C, D to ~25% each)
Eliminates position bias from raw mock exam templates while preserving integrity.
"""

import os
import json
import random

BANK_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "full_question_bank.json")
JS_PATH = os.path.join(os.path.dirname(__file__), "..", "js", "questions.js")

with open(BANK_PATH, "r", encoding="utf-8") as f:
    questions = json.load(f)

# Use fixed seed for reproducibility
rng = random.Random(42)

for q in questions:
    options = q["options"]
    correct_idx = q["correct"]
    correct_val = options[correct_idx]

    # Create paired list with original index to maintain option integrity
    indexed_options = list(enumerate(options))
    rng.shuffle(indexed_options)

    new_options = [opt[1] for opt in indexed_options]
    new_correct = new_options.index(correct_val)

    q["options"] = new_options
    q["correct"] = new_correct

# Save updated full_question_bank.json
with open(BANK_PATH, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2)

# Save updated js/questions.js
with open(JS_PATH, "w", encoding="utf-8") as f:
    f.write("/**\n")
    f.write(f" * Anthropic CCA-F Master Question Bank ({len(questions)} Questions)\n")
    f.write(" * Answer Key Balanced: ~25% A, 25% B, 25% C, 25% D\n")
    f.write(" */\n\n")
    f.write("const DEFAULT_QUESTIONS = ")
    json.dump(questions, f, indent=2)
    f.write(";\n\n")
    f.write('if (typeof window !== "undefined") {\n')
    f.write('  window.DEFAULT_EXAM_QUESTIONS = DEFAULT_QUESTIONS;\n')
    f.write('}\n')

print(f"✓ Successfully balanced {len(questions)} questions across A, B, C, D!")
