#!/bin/bash
set -euo pipefail
bun index.ts "$1"
bun postprocess.ts
bun check