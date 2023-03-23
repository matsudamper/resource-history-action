#!/bin/bash

while true; do
  free | grep Mem | awk '{print $3/$2}' >> $MEMORY_FILE
  sleep 30
done
