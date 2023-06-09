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

echo NANA >> $CPU_FILE

while true; do
  top -b -n1 | grep "Cpu(s)" | awk '{print $2 + $4}' >> $CPU_FILE
  sleep $INTERVAL_SECONDS
  exit 0
done
