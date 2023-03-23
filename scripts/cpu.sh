#!/bin/bash

while true; do
  top -b -n1 | grep "Cpu(s)" | awk '{print $2 + $4}' >> $CPU_FILE
  sleep 30
done
