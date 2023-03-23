#!/bin/bash

while [[ $# -gt 0 ]]; do
  case "$1" in
    --CPU_FILE=*)
      CPU_FILE="${1#*=}"
      ;;
    --INTERVAL_SECONDS=*)
      INTERVAL_SECONDS="${1#*=}"
      ;;
    *)
      echo "Unknown parameter: $1" >&2
      exit 1
      ;;
  esac
  shift
done

echo NANA >> /var/tmp/action-history-cpu.txt

while true; do
  top -b -n1 | grep "Cpu(s)" | awk '{print $2 + $4}' >> $CPU_FILE
#  sleep 30
done
