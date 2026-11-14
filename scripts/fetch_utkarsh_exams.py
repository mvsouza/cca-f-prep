#!/usr/bin/env python3
"""
Downloads all 6 full mock exams (360 questions) from utkarsh1agarwal/claude-architect-exam-guide
"""

import os
import urllib.request

RAW_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "raw", "utkarsh")
os.makedirs(RAW_DIR, exist_ok=True)

BASE_URL = "https://raw.githubusercontent.com/utkarsh1agarwal/claude-architect-exam-guide/main/mock-exam/"

FILES = [
    "interactive/app.js",
    "exam-1-questions.md", "exam-1-answers.md",
    "exam-2-questions.md", "exam-2-answers.md",
    "exam-3-questions.md", "exam-3-answers.md",
    "exam-4-questions.md", "exam-4-answers.md",
    "exam-5-questions.md", "exam-5-answers.md",
    "exam-6-questions.md", "exam-6-answers.md",
]

def download():
    headers = {'User-Agent': 'Mozilla/5.0'}
    for fname in FILES:
        url = BASE_URL + fname
        local_name = fname.replace("/", "_")
        target = os.path.join(RAW_DIR, local_name)
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as resp:
                content = resp.read().decode('utf-8', errors='ignore')
                with open(target, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✓ Downloaded {local_name} ({len(content):,} chars)")
        except Exception as e:
            print(f"✗ Failed {fname}: {e}")

if __name__ == "__main__":
    download()
