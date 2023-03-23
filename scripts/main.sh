#!/bin/bash

./scripts/memory.sh &
memory_pid=$! >> $GITHUB_ENV
./scripts/cpu.sh &
cpu_pid=$! >> $GITHUB_ENV