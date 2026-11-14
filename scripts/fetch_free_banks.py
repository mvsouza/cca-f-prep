#!/usr/bin/env python3
"""
Downloads open-source CCA-F question banks and study materials from GitHub.
"""

import os
import urllib.request
import json
import re

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "raw")
os.makedirs(OUTPUT_DIR, exist_ok=True)

URLS = [
    # Neerajkr7/cca-foundations-exam-practice (200 questions)
    ("neerajkr7_app.jsx", "https://raw.githubusercontent.com/Neerajkr7/cca-foundations-exam-practice/main/src/App.jsx"),
    ("neerajkr7_app_master.jsx", "https://raw.githubusercontent.com/Neerajkr7/cca-foundations-exam-practice/master/src/App.jsx"),
    
    # kamiimeteor/cca-f-dojo (163 questions)
    ("dojo_questions.js", "https://raw.githubusercontent.com/kamiimeteor/cca-f-dojo/main/cca-f/assets/data/questions.js"),
    ("dojo_content_en_q1.js", "https://raw.githubusercontent.com/kamiimeteor/cca-f-dojo/main/cca-f/assets/data/content.en.q1.js"),
    ("dojo_content_en_q2.js", "https://raw.githubusercontent.com/kamiimeteor/cca-f-dojo/main/cca-f/assets/data/content.en.q2.js"),
    ("dojo_content_en.js", "https://raw.githubusercontent.com/kamiimeteor/cca-f-dojo/main/cca-f/assets/data/content.en.js"),

    # szymonpaluch/ccar-f-practice-exam
    ("szymon_questions.json", "https://raw.githubusercontent.com/szymonpaluch/ccar-f-practice-exam/main/questions.json"),
    ("szymon_questions_md.md", "https://raw.githubusercontent.com/szymonpaluch/ccar-f-practice-exam/main/README.md"),
]

def fetch_all():
    print(f"Fetching open-source question banks to {OUTPUT_DIR}...")
    headers = {'User-Agent': 'Mozilla/5.0'}
    for filename, url in URLS:
        target_path = os.path.join(OUTPUT_DIR, filename)
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as response:
                content = response.read().decode('utf-8', errors='ignore')
                with open(target_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✓ Successfully fetched {filename} ({len(content):,} chars)")
        except Exception as e:
            print(f"✗ Could not fetch {filename} ({url}): {e}")

if __name__ == "__main__":
    fetch_all()
