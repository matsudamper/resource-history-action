#!/bin/bash

while [[ $# -gt 0 ]]; do
  case "$1" in
    --MEMORY_FILE=*)
      MEMORY_FILE="${1#*=}"
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

while true; do
  free | grep Mem | awk '{print $3/$2}' >> $MEMORY_FILE
  sleep $INTERVAL_SECONDS
done
