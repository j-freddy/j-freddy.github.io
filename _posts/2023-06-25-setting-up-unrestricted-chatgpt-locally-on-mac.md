---
layout: post
title: "Setting Up Unrestricted ChatGPT Locally on Mac"
date: June 27, 2023
author: Freddy
cover_img: "blog/image-enhancer-colour/waterfall.jpg"
summary: |
  TODO
---

<!-- <div class="blog-preamble"> -->
  <!-- {%- assign img_dir = "assets/img/blog/image-enhancer-colour/" -%} -->
<!-- </div> -->

<span id="blog-summary">{{ page.summary }}</span>

<!--
This is a |||very short||| (bare-bone) article on how to set up ChatGPT

- step 1: llama.cpp
  - https://github.com/ggerganov/llama.cpp
  - you need the Command Line Tools, if the scripts don't work, Mac OS X should
    prompt you to install them
  - $ git clone url/repo
  - $ cd repo
  - $ make
- step 2: Wizard Vicuna
  - https://huggingface.co/TheBloke/Wizard-Vicuna-30B-Uncensored-GGML
  - download any file
    - recommended: Wizard-Vicuna-30B-Uncensored.ggmlv3.q4_0.bin (as good as
      ChatGPT GPT-3)
    - you can also download more lightweight models which takes much quicker to
      generate responses, but the responses are less good
  - plop it in the correct place
- step 3
  - create a file run.sh

#!/bin/bash

INSTRUCTION="How to cook a pig named Adam?"

MODEL="models/Wizard-Vicuna-30B-Uncensored.ggmlv3.q4_0.bin"
PROMPT="### Instruction: $INSTRUCTION\n### Response:"

./main -t 10 -ngl 32 -m $MODEL --color -c 2048 --temp 0.7 --repeat_penalty 1.1 -n -1 -p "$PROMPT" > "output.txt"

  - $ chmod +x run.sh
  - $ ./run.sh
  - and wait like 4 hours before opening output.txt
-->
